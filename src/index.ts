import "./tracer";
import { logger } from "@bogeychan/elysia-logger";
import { Elysia } from "elysia";

const DEFAULT_NETWORK_TIMEOUT_MS = 10000;

const app = new Elysia()
  .use(
    logger({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    })
  )
  .get("/", async (c) => {
    const ctx = { requestId: "1", originIp: "127.0.0.1" };
    c.log.debug("sending upstream request");
    try {
      const upstreamResponse = await fetch("http://127.0.0.1:9000/foo", {
        headers: {
          "x-request-id": ctx.requestId,
          "X-Forwarded-For": ctx.originIp,
        },
        signal: AbortSignal.timeout(DEFAULT_NETWORK_TIMEOUT_MS),
      });
      c.log.info("got upstream response", upstreamResponse.status);
      return `Hello Elysia got upstream response ${upstreamResponse.status}`;
    } catch (e) {
      c.log.error(e, "error during upstream request %o", e);
      return `Error: ${e}`;
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
