# sine-io.github.io

这是一个基于 Vite + React + React Router 的个人站点，当前承载性能测试、工具拆解和 OPC 相关内容，并保留外部教程入口。

## 本地开发

```bash
npm install
npm run dev
```

开发服务器默认由 Vite 提供。

## 测试

```bash
npm run test
```

测试使用 Vitest 和 Testing Library，覆盖路由、页面渲染和内容迁移结果。

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`，GitHub Pages 工作流也会发布这里的内容。

## 内容与资源位置

- `src/content/`：站点文案、项目内容、写作条目和站点元数据
- `src/pages/`：React 页面
- `src/components/`：布局与 UI 组件
- `src/assets/`：参与打包的视觉资源
- `public/`：直接拷贝到构建产物的静态资源，例如 `CNAME` 和照片素材
- `docs/superpowers/specs/`、`docs/superpowers/plans/`：迁移过程保留的设计和实施文档
