export default async function getViteConfig(configFile) {
  const { resolveConfig } = await import("vite");
  return await resolveConfig({ configFile }, "build");
}
