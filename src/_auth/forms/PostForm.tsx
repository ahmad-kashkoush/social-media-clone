import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploader";
import { postValidation } from "@/lib/validation";
import { Models } from "appwrite";
import {
  useCreatePost,
  useDeletePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
type PostFormProps = {
  post?: Models.Document;
  action: "create" | "update";
};
export default function PostForm({ post, action="create" }: PostFormProps) {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      // complaining if you use default formSchema, you must create your own validation
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags : "",
    },
  });

  async function onSubmit(values: z.infer<typeof postValidation>) {
    // update
    if (post && action === "update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });
      if (!updatedPost) {
        toast({ title: "not updated, please try again" });
      }
      return navigate(`/posts/${post.$id}`);
    }
    // create new Post
    const newPost = await createPost({
      userId: user.id,
      ...values,
    });
    if (!newPost) {
      toast({
        title: "not created, please try again",
      });
    }
    console.log(newPost);
    navigate("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Tags Seperated by (,)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="JS, React, NextJS, ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button className="shad-button_dark_4" type="button">
            Cancel
          </Button>
          <Button
            className="shad-button_primary whitespace-nowrap"
            type="submit"
            disabled={isLoadingCreate||isUpdatingPost}
          >
            
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
