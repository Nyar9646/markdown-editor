/**
 * Service Worker 最小限の処理で、シンプルな実装のため、js で記述
 * fetch にはアクセス可能
 */

const CacheName = 'Cache:v1'

self.addEventListener('install', e => {
  console.log('ServiceWorker install : ', e)
})

self.addEventListener('activate', e => {
   console.log('ServiceWorker activate : ', e)
})

/**
 * "Network falling back to cache" の考えを実装した関数
 * return
 *  true : response
 *  err : request に対応する cache の内容。なければ undefined
 */
const networkFallingBackToCache = async (request) => {
  const cache = await caches.open(CacheName)

  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    console.log('Fetch 成功')
    return response
  } catch (err) {
    console.log(err)
    return cache.match(request)
  }
}

self.addEventListener('fetch', e => {
  console.log('addEventListener fetch')
  // e.respondWith(fetch(e.request))
  e.respondWith(networkFallingBackToCache(e.request))
})
