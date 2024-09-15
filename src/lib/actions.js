"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
    try {
        const response = await axios.get('http://localhost:4000/posts'); 
        return response.data.posts ;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
}

export async function  getBlog(id) {
    try {
        const response = await axios.get(`http://localhost:4000/posts/${id}`);
        return response.data.post;
      } catch (error) {
        console.error('Error fetching post:', error);
      }
}

export async function  deletePost(id) {
    try {
      // Send a DELETE request to the backend API
      await axios.delete(`http://localhost:4000/posts/${id}`);
      revalidatePath('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
export async function handleSubmit(values,postId) {
  try {
    const { title, content } = values;
    const newPost = { title, content };
    if(postId){
    await axios.put(`http://localhost:4000/posts/${postId}`, newPost);
    } else{
      await axios.post("http://localhost:4000/posts", newPost);
    }
    revalidatePath('/');
} catch (error) {
  console.error("Error creating post:", error);
}
}

