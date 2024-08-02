"use client";

import { useEffect , useState } from "react";
import { useRouter , useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams  = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect (()=>{
    const getPromptDetails = async ()=>{
        const response = await fetch(`/api/prompts/${promptId}`)
        const data = await response.json();
        setPost({
            prompt:data.prompt,
            tag:data.tag
        })
    }
    if(promptId) getPromptDetails();
  },[promptId])
  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId) return alert('Prompt id not found')

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await fetch('/api/prompts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);

    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;