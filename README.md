## Proxy Throttle

A naive proxy to throttle HTTP requests.

### Online service

There is a online version working on [deno deploy](https://deno.com/deploy):

https://proxy-throttle.deno.dev

Make requests to this service using parameters:
  * `url: string` The full URL of the desired resource
  * `factor?: number = 1` The amount of delay to impose on the response.
    A value of `1` will serve chunks on an interval of 1s from one another.
  * `cache?: 1` By default client caching is prevented. Send a value of `1`
    to allow client caching. 

### Example

Given this original image:

https://upload.wikimedia.org/wikipedia/commons/d/d1/WWW-LetShare.svg

Throttle its download forcing a 2s delay between chunks with:

https://proxy-throttle.deno.dev/?factor=2&url=https://upload.wikimedia.org/wikipedia/commons/d/d1/WWW-LetShare.svg
