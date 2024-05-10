import type { APIContext, MiddlewareNext } from 'astro'

// TODO fix type any
export async function onRequest(context: APIContext<{ title: string }>, next: MiddlewareNext) {
  const cache = context.locals.runtime.caches.default
  const inCache = await cache.match(context.request.clone() as any)
  if (inCache) {
    return new Response(inCache.body as any, inCache as any)
  }
  const res = await next()
  const shouldCache = res.headers.get('x-ssg') === 'true'
  if (shouldCache) {
    await cache.put(context.request as any, res.clone() as any)
  }
  return res
}