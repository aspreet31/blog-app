import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getBlog } from '@/lib/actions';

export default async function Page({ params }) {
const post = await getBlog(params.id);
  if (!post) return <p>Loading...</p>;
  return (
    <div className='mt-5 p-4'>
      <Button><Link href="/">&larr; &nbsp;Back to Posts</Link></Button>
      <h1 className="text-xl font-semibold text-gray-800 text-center mt-2"  >{post.title}</h1>
      <p className='mt-5 text-center'>{post.content}</p>
    </div>
  );
}
