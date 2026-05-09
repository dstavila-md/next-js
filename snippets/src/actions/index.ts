'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  // re-render the homepage
  revalidatePath('/');
  // Redirect the user back to the root route
  redirect('/');
}

export async function createSnippet(
  formstate: { message: string },
  formData: FormData,
) {
  try {
    // Check the user inputs and make sure they are valid
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    if (typeof title !== 'string' || title.length < 3) {
      return { message: 'Title must be longer' };
    }

    if (typeof code !== 'string' || code.length < 10) {
      return { message: 'Code must be longer' };
    }

    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: 'Something went wrong...' };
    }
  }
  // re-render the homepage
  revalidatePath('/');
  // Redirect the user back to the root route
  redirect('/');
}
