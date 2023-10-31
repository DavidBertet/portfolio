export const prerender = false;

import type { APIRoute, APIContext } from "astro";

export const GET: APIRoute = async ({ redirect }: APIContext) => {
  return redirect(`mailto:${import.meta.env.EMAIL}`);
};
