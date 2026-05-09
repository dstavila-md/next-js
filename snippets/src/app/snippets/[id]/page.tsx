import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import * as actions from '@/actions';

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const { id } = await props.params;

  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className='flex m-4 justify-between items-center'>
        <h1 className='text-xl font-bold'>{snippet.title}</h1>
        <div className='flex gap-4'>
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className='p-2 border rounded'
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className='p-2 border rounded'>Delete</button>
          </form>
        </div>
      </div>
      <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// This function is used by Next.js to determine which dynamic routes to pre-render at build time.
// In this case, it fetches all snippets from the database and generates a list of paths based on their IDs.
// This allows Next.js to statically generate pages for each snippet, improving performance and SEO.
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return { id: snippet.id.toString() };
  });
}
