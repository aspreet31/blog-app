"use client"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card"
import { deletePost } from "@/lib/actions"

export default function BlogCard({post}) {
  const router = useRouter(); 
   const handleDelete = async(id)=>{
  const confirmed = window.confirm('Are you sure you want to delete this post?');
   if(confirmed){
   await deletePost(id);
   }
   else{
    console.log("Delete cancel")
   }
   }

   const handleEdit = () => {
    router.push(`/blog/edit/${post.id}`);
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <Card
          key={post.id}
          className="w-full h-[250px] sm:h-[350px] lg:h-[250px] bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <CardContent className="p-4 sm:p-6 overflow-hidden">
            <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">
              {post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title}
            </CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-base md:text-lg text-gray-600 line-clamp-3">
              {post.content.length > 80 ? post.content.slice(0, 80) + '...' : post.content}
            </CardDescription>
             <div className="mt-4 flex flex-col lg:flex-row gap-2 sm:gap-4 w-full">
              <Button className="w-full sm:w-auto bg-blue-600 text-white rounded-md hover:bg-blue-500 transition text-xs sm:text-sm md:text-base">
                <Link href={`/blog/${post.id}`}>View</Link>
              </Button>
              <Button
                onClick={() => handleDelete(post.id)}
                className="w-full sm:w-auto bg-red-600 text-white rounded-md hover:bg-red-500 transition text-xs sm:text-sm md:text-base"
              >
                Delete
              </Button>
              <Button
                onClick={() => handleEdit(post.id)}
                className="w-full sm:w-auto bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition text-xs sm:text-sm md:text-base"
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
  </div>
  
  
  
  
  
    
  
  )
}
