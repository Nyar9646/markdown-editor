import { marked } from 'marked'
import * as sanitize from 'sanitize-html'

const worker: Worker = self as any

worker.addEventListener('message', e => {
  const text = e.data

  const html = sanitize(marked(text), {
    allowedTags: [...sanitize.defaults.allowedTags, 'h1', 'h2']
  })

  worker.postMessage({ html })
})
