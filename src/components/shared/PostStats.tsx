import {
  useDeleteSavedPost,
  useGetCurrentUserAccount,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

type postStatsProps = {
  post?: Models.Document;
  userId: string;
};

export default function PostStats({ post, userId }: postStatsProps) {
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();

  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { data: currentUser } = useGetCurrentUserAccount();

  const savedRecord = currentUser?.save.find(
    (record: Models.Document) => record.post?.$id === post?.$id
  );
  useEffect(() => {
    setIsSaved(savedRecord ? true : false);
  }, [savedRecord]);

  function handleLikePost(e: React.MouseEvent) {
    e.stopPropagation();
    let newLikesArray;
    const isLiked = likes.includes(userId);
    if (isLiked) newLikesArray = likes.filter((id: string) => id !== userId);
    else newLikesArray = [...likes, userId];

    setLikes(newLikesArray);
    likePost({ postId: post?.$id || "", likesArray: newLikesArray });
  }
  function handleSavePost() {
    if (isSaved) {
      setIsSaved(false);
      deleteSavedPost({ savedId: savedRecord.$id });
    } else {
      setIsSaved(true);
      savePost({ postId: post?.$id || "", userId: userId });
    }
  }
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2">
        <img
          src={
            likes.includes(userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isDeletingSavedPost || isSavingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
