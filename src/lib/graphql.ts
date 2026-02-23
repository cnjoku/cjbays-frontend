export async function fetchGraphQL(
  query: string,
  variables = {},
  revalidate = 60
) {
  const res = await fetch(
    process.env.WORDPRESS_GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate },
    }
  );

  if (!res.ok) {
    throw new Error("GraphQL request failed");
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("GraphQL error");
  }

  return json.data;
}
