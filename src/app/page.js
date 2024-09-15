import { getBlogs } from "@/lib/actions";
import BlogCard from "./_components/BlogCard";

export default async function Page() {
  const posts = await getBlogs();
  return (
<div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]  box-border overflow-y-auto">
  <h1 className="font-bold text-2xl sm:text-4xl mt-3 sm:mt-6 text-center sm:text-left">
    Welcome to Simple Blog: Read, Create, and Manage Your Posts
  </h1>
  <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
  <div className="flex flex-col gap-4 items-center sm:flex-row sm:gap-8">
    {!posts ? (
      <p className="text-center">No posts available</p>
    ) : (
      <div className="w-full max-w-7xl h-[32rem]  p-6 sm:p-8 lg:p-10">
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {posts.map((post) => (
            <BlogCard 
            key={post.id}
              post={post} 
              className="h-64 sm:h-72 md:h-80 lg:h-96 w-full" 
            />
        ))}
      </ul>
    </div>
    
    
    )}
  </div>
</main>

</div>


  );

}
