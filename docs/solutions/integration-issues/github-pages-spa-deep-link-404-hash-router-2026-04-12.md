---
title: GitHub Pages SPA 深链接在直达访问时返回 404，改用 Hash Router 修复
date: 2026-04-12
category: integration_issue
module: github-pages-deployment
problem_type: integration_issue
component: tooling
symptoms:
  - GitHub Pages 上直接访问 SPA 深链接（如 /projects/opc）先返回 HTTP 404
  - 页面最终可恢复显示，但浏览器控制台和网络面板持续出现 404
  - BrowserRouter 加 404.html 镜像回退方案未消除传输层 404
root_cause: config_error
resolution_type: code_fix
severity: medium
tags:
  - github-pages
  - hash-router
  - deep-links
  - spa-routing
  - static-hosting
---

# GitHub Pages SPA 深链接在直达访问时返回 404，改用 Hash Router 修复

## Problem

站点部署在 GitHub Pages 上，使用 React Router 的 `BrowserRouter`。当用户直接打开 `/projects/opc` 这类前端深链接时，静态主机先把它当成真实文件路径处理，所以最外层 HTTP 响应是 404。浏览器最终还能通过前端回退机制显示正确页面，但网络层和控制台依然会留下真实的 404 噪音。

## Symptoms

- 直接打开 `https://www.sineio.top/projects/opc` 时，文档请求返回 HTTP 404
- 页面最终通常能恢复到正确的 OPC 页面，但 DevTools Network/Console 里持续出现 404
- 自动化 QA、监控、爬虫会把页面判定为异常，即使肉眼看起来“能用”
- 排查过程中一度怀疑 Cloudflare Pages，但最终确认权威发布链路是 GitHub Pages workflow

## What Didn't Work

- 先走了 `404.html` fallback 路线，在 `scripts/copy-spa-fallback.mjs` 里保证 `dist/404.html` 与 `dist/index.html` 同步。这能让 GitHub Pages 未命中静态文件时仍返回前端应用壳，但**不能改变最初的 404 状态码**。
- 后来又加了 restore-script 路线：
  - `src/lib/githubPagesSpaFallback.ts`
  - `src/main.tsx`
  - `scripts/spa-fallback-utils.mjs`

  这套做法的目标是把 fallback 页面里的路径恢复回原始 URL。但它仍然只能让客户端在 404 之后“救回来”，不能消除 GitHub Pages 先返回的 transport-level 404。
- 相关 prior Codex session 也已经得出同样结论：`BrowserRouter + 404 fallback + path restore` 只是降噪，不是根治 `(session history)`。

## Solution

最终修复只有两条主线：

1. 把应用的生产路由切到 **hash-based routing**
2. 用一个工厂级回归测试锁死这个决策

这样可分享链接变成 `/#/projects/opc`，从而不再依赖静态主机对任意前端路径做重写。

`src/app/router.tsx`：

```tsx
import { createHashRouter, createMemoryRouter } from 'react-router-dom'

export function createAppRouter() {
  return createHashRouter(routes)
}
```

这样静态主机始终只处理 `/`，真实路由状态放在 hash 后半段，例如：

```text
/#/projects/opc
```

同时把之前失败的 fallback/restore 机制整体删掉，包括：

- 删除 `src/lib/githubPagesSpaFallback.ts`
- 删除 `scripts/spa-fallback-utils.mjs`
- `src/main.tsx` 回到普通挂载，不再做路径恢复
- `scripts/copy-spa-fallback.mjs` 回到简单的 `404.html` 镜像校验职责，这个脚本继续存在，但它不再承担“修复深链 404”的职责

最后补了一条回归测试，锁死 `createAppRouter()` 这条工厂路径必须继续使用 hash 路由：

`src/app/router.factory.test.tsx`：

```tsx
routerModule.createAppRouter()

expect(createHashRouter).toHaveBeenCalledTimes(1)
expect(createBrowserRouter).not.toHaveBeenCalled()
```

## Why This Works

`BrowserRouter` 的前提是服务器能对任意前端路径都返回应用入口文件。GitHub Pages 不是这种宿主。即使复制 `404.html` 并在客户端恢复路径，请求 `/projects/opc` 时最外层 HTTP 响应仍然先是 404，这一点前端脚本无法逆转。

切到 `HashRouter` 后，浏览器请求的永远是根文档 `/`，路由状态放在 `#` 后面。`#` 之后的内容不会参与服务器资源解析，所以：

- 首页请求是 200
- 深链请求本质上还是对 `/` 的请求
- GitHub Pages 不再需要 path rewrite
- QA、监控、控制台都不会再看到伪失败

最终 QA 复测里，健康分从 94 提升到 100，控制台错误归零。相关 prior session 也明确指出，真正该改的是 URL 形态，不是继续硬拗 `BrowserRouter` `(session history)`。

这条回归测试的保护范围要说清楚：它锁定的是 `createAppRouter()` 这条工厂实现，而不是“全仓库任何地方都绝不可能再引入 history 路由”。它足够覆盖当前应用入口，但不是全局静态分析。

## Prevention

- 在不支持 rewrite 的静态托管环境里，优先评估 `HashRouter`，不要默认使用 `BrowserRouter`
- QA 不能只看“页面最终能不能显示”，必须同时检查 Network/Console，确认 transport-level 行为也健康
- 对这类部署边界问题，优先写路由工厂级别的回归测试，锁住宿主相关决策
- 在 README 中写清楚真实部署模型和链接形态，避免后续把 hash 路由误改回 history 路由
- 先确认真正的权威部署链路。这个问题里，Cloudflare Pages 是红鲱鱼，GitHub Pages workflow 才是最终真相

## Related Issues

- PR #2 `feat: add OPC observation console`
- 提交 `1325c79`：第一次“降噪”尝试
- 提交 `65694b4`：最终切到 hash 路由
- 提交 `0864845`：回归测试锁定 hash router 策略
