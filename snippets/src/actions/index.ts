'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });
  redirect('/');
}

export async function createSnippet(
  formstate: { message: string },
  formData: FormData,
) {
  // Check the user inputs and make sure they are valid
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  if (typeof title !== 'string' || title.length < 3) {
    return { message: 'Title must be longer' };
  }

  if (typeof code !== 'string' || title.length < 10) {
    return { message: 'Code must be longer' };
  }

  // Create a new record in the database
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  // Redirect the user back to the root route
  redirect('/');
}
