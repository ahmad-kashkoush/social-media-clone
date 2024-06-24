import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUserAccount } from "@/lib/react-query/queriesAndMutations";

export default function LikedPosts() {
  const { data: currentUser } = useGetCurrentUserAccount();
  if (!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }
  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
}
