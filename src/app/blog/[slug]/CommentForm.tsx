"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RotateCw } from "lucide-react";
import React, {  useState, useTransition } from "react";

type CommentFormProps = {
  postId: string;
};

const CommentForm = ({ postId }: CommentFormProps) => {

  const [isPending, startTransition] = useTransition()
  
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    content: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const postComment = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, postId }),
      }
    );

    if (!res.ok) return; //toast failed

    toast({
      description: "Comment posted",
    });
  };

  return (
    <div className="flex flex-col gap-y-3 p-4 bg-muted mt-10 rounded-md">
      <div>
        <p className="font-bold">Leave a Comment</p>
      </div>

      <label htmlFor="comment">Comment</label>
      <Textarea
        id="content"
        placeholder="Write comment"
        rows={4}
        name="content"
        value={inputs.content}
        onChange={handleChange}
      />
      <label htmlFor="name">Name</label>
      <Input
        id="name"
        name="name"
        value={inputs.name}
        onChange={handleChange}
      />
      <label htmlFor="name">Email</label>
      <Input
        id="email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
      />
      <div className="text-right" onClick={() => startTransition(postComment)}>
        <Button variant="default" size="lg" className="text-white">
          Submit{" "}
          {isPending && <RotateCw className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
