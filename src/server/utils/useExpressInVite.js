import express from "express";

export default function useExpressInVite(entry, isRouter = false) {
  return {
    name: "expressAppMiddleware",
    configureServer: async (server) => {
      async function expressAppMiddleware(req, res, next) {
        const app = await server.ssrLoadModule(entry);
        (isRouter ? express().use(app.default) : app.default)(req, res, next);
      }

      server.middlewares.use(expressAppMiddleware);
    },
  };
}
