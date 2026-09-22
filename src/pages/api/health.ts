export const prerender = false;

import type { APIRoute } from "astro";
import { getHealth } from "../../lib/health";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(getHealth()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
