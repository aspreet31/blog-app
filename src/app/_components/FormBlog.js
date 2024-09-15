"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "../../../schema";
import { useEffect } from "react";
import { handleSubmit } from "@/lib/actions";
export default  function FormBlog({post,type}) {
  const router = useRouter();
  //Define form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title:  "",
      content: "",
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title || "",
        content: post.content || "",
      });
    }
  }, [post, form]);

  //submit handler.
  async function onSubmit(values) {
    const postId = post?.id;
    console.log(postId)
    await handleSubmit(values,postId);
    router.push('/');

  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto p-4 sm:p-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold text-lg sm:text-xl text-black">
              Title
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Write the title of your blog post"
                {...field}
                className="bg-blue-100 border border-gray-600 text-black placeholder-gray-400 rounded-md p-2 w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold text-lg sm:text-xl text-black">
              Content
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Start writing your blog content here"
                {...field}
                className="bg-blue-100 border border-gray-600 text-black placeholder-gray-400 rounded-md p-2 w-full h-32 sm:h-48"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        className="bg-primary text-white px-4 py-2 w-full sm:w-auto rounded-md hover:bg-blue-500 transition"
      >
        {type === 'update' ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  </Form>
  
  );
}
