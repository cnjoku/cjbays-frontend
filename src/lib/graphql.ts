export async function fetchGraphQL(query: string, variables = {}) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // ISR (optional)
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch GraphQL");
  }

  const json = await res.json();
  return json.data;
}
