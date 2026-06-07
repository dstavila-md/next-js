interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

export default async function Search(searchParams: SearchPageProps) {
  const { term } = await searchParams;

  return <div></div>;
}
