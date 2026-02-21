import { fetchGraphQL } from "@/lib/graphql";

export default async function Home() {
  const data = await fetchGraphQL(`
    query GetHome {
      page(id: "home", idType: URI) {
        title
        content
      }
    }
  `);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        {data.page.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: data.page.content,
        }}
      />
    </main>
  );
}
