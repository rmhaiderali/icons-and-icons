import express from "express";

export default function useExpressInVite(entry) {
  return {
    name: "expressAppMiddleware",
    configureServer: async (server) => {
      async function expressAppMiddleware(req, res, next) {
        const app = await server.ssrLoadModule(entry);
        express().use(server.config.base, app["default"])(req, res, next);
      }

      server.middlewares.use(expressAppMiddleware);
    },
  };
}
