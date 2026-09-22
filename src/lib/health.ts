export const getHealth = (sha?: string) => ({
  status: "ok" as const,
  sha: sha ?? process.env.GITHUB_SHA ?? "dev",
});
