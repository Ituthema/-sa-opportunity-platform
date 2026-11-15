import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  try {
    await locals.runtime.env.DB.prepare("SELECT 1 AS ok").first();
    return new Response(JSON.stringify({ status: "ok", database: "reachable" }), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
  } catch (error) {
    // Keep the response generic; detailed errors may contain operational data.
    console.error("Health check database probe failed", error);
    return new Response(JSON.stringify({ status: "degraded" }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
  }
};
