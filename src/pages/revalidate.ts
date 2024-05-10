import type { APIContext } from 'astro'

export async function GET({ params, url, request, locals }: APIContext) {
  // TODO this only delete the cache in the current region, should implement more to delete in all regions
  await locals.runtime.caches.default.delete(new Response(url.searchParams.get('key')) as any)
  return Response.json({success: true});
}