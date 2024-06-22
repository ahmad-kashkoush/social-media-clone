import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isFetchingSearch: boolean;
  searchedPosts?: Models.DocumentList<Models.Document> | undefined;
};
export default function SearchResults({
  isFetchingSearch,
  searchedPosts,
}: SearchResultsProps) {
  if (isFetchingSearch) return <Loader />;
  if (searchedPosts?.documents.length && searchedPosts?.documents.length > 0) {
    return <GridPostList posts={searchedPosts?.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No Results found</p>
  );
}
