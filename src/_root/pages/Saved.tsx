import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUserAccount } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

export default function Saved() {
  const { data: currentUser } = useGetCurrentUserAccount();
  const savedPosts = currentUser?.save.map((savedPost: Models.Document) => ({
    ...savedPost.post,
    creator: {
      imageUrl: currentUser?.imageUrl,
    },
  }));

  if (!savedPosts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="saved-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img src="/assets/icons/save.svg" width={36} height={36} alt="add" />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      <GridPostList posts={savedPosts} showStats={false} />
    </div>
  );
}
