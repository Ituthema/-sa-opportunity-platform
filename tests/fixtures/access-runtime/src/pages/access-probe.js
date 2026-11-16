export const prerender = false;

export async function GET({ locals }) {
  const context = locals.cfContext;
  const access = context?.access;
  const identity = access ? await access.getIdentity() : null;

  return new Response(
    JSON.stringify({
      accessAvailable: Boolean(access),
      identityEmail: identity?.email ?? null,
    }),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}
