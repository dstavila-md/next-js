import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <p className='mt-4 text-lg'>Welcome to my Next.js app.</p>
      <div>
        <Link href='/performance'>Performance</Link>
        <Link href='/reliability'>Reliability</Link>
        <Link href='/scale'>Scale</Link>
      </div>
    </div>
  );
}
