## Proxy Throttle

Make requests to this service using parameters:
  * `url: string`: the full URL of the desired resource
  * `factor?: number` (default: `1`): the amount of delay to impose on
    the response. A value of `1` will serve chunks on an interval of
    1s from one another.
