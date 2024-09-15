"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormBlog from "../_components/FormBlog";
export default function Page() {

  return (
    <div className="p-4 sm:p-6 text-white min-h-screen bg-gray-50">
  <div className="max-w-3xl mx-auto">
    <Button className="mb-4">
      <Link href="/">&larr; &nbsp;Back to Posts</Link>
    </Button>
    <h1 className="font-bold text-2xl sm:text-4xl mt-3 sm:mt-6 text-black text-center">
      Write a New Blog Post
    </h1>
    <div className="mt-6 bg-blue-100 p-4 sm:p-6 rounded-lg shadow-lg">
      <FormBlog type="create" />
    </div>
  </div>
</div>
  );
}
