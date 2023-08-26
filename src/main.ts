const sleep = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

const createThrottledResponse = (
  body: ReadableStream<Uint8Array>,
  factor: number,
) => ({
  async *[Symbol.asyncIterator]() {
    for await (const chunk of body) {
      yield chunk;
      await sleep(factor * 1000);
    }
  },
});

const DEFAULT_FACTOR = 1;
const HOMEPAGE = 'https://github.com/esroyo/proxy-throttle';

async function handler(req: Request): Promise<Response> {
  const reqUrl = new URL(req.url);
  const upstreamUrl = reqUrl.searchParams.get('url');
  const factorRaw = reqUrl.searchParams.get('factor');
  const factorParsed = Number(factorRaw);
  const factor = factorRaw === null || Number.isNaN(factorParsed)
    ? DEFAULT_FACTOR
    : factorParsed;

  if (!upstreamUrl) {
    return Response.redirect(HOMEPAGE, 302);
  }

  const upstreamResponse = await fetch(upstreamUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  const body = upstreamResponse.body
    ? ReadableStream.from(
      createThrottledResponse(upstreamResponse.body, factor),
    )
    : '';

  return new Response(body, {
    headers: upstreamResponse.headers,
  });
}

Deno.serve(handler);
