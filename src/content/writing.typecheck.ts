import type { WritingEntry } from './writing'

const externalEntry: WritingEntry = {
  kind: 'external',
  slug: 'external-entry',
  title: 'External entry',
  category: 'guide',
  summary: 'External summary',
  externalUrl: 'https://example.com/article'
}

const internalEntry: WritingEntry = {
  kind: 'internal',
  slug: 'internal-entry',
  title: 'Internal entry',
  category: 'note',
  summary: 'Internal summary',
  body: ['Paragraph']
}

void externalEntry
void internalEntry

// @ts-expect-error external entries cannot also define body
const invalidEntryWithBody: WritingEntry = {
  kind: 'external',
  slug: 'invalid-entry-with-body',
  title: 'Invalid body',
  category: 'guide',
  summary: 'Invalid',
  externalUrl: 'https://example.com/invalid',
  body: ['Paragraph']
}

// @ts-expect-error internal entries cannot also define externalUrl
const invalidEntryWithExternalUrl: WritingEntry = {
  kind: 'internal',
  slug: 'invalid-entry-with-external-url',
  title: 'Invalid url',
  category: 'note',
  summary: 'Invalid',
  body: ['Paragraph'],
  externalUrl: 'https://example.com/invalid'
}

// @ts-expect-error external entries must declare externalUrl
const invalidEntryWithoutDestination: WritingEntry = {
  kind: 'external',
  slug: 'invalid-entry-without-destination',
  title: 'Invalid missing destination',
  category: 'update',
  summary: 'Invalid'
}

void invalidEntryWithBody
void invalidEntryWithExternalUrl
void invalidEntryWithoutDestination
