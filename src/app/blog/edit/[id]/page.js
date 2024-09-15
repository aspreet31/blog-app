import Link from "next/link"
import { getBlog } from "@/lib/actions"
import FormBlog from "@/app/_components/FormBlog"
import { Button } from "@/components/ui/button"

export default async function page({params}) {
 const post = await getBlog(params.id)
  return (
    <div className="p-4 sm:p-6 text-white min-h-screen bg-gray-50">
  <Button className="mb-4">
    <Link href="/">&larr; &nbsp;Back to Posts</Link>
  </Button>
  <h1 className="font-bold text-2xl sm:text-4xl mt-3 sm:mt-6 text-black text-center">
      Edit Blog Post
    </h1>
  <div className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto bg-blue-100 p-4 sm:p-6 rounded-lg shadow-lg">
    <FormBlog type="update" post={post} />
  </div>
</div>

  )
}
