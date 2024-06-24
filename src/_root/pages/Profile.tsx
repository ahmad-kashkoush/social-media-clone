import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import LikedPosts from "./LikedPosts";

export default function Profile() {
  const [followers, following, postsNumber] = [20, 22, 2];
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { id } = useParams();
  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img
          className="rounded-full w-28 h-28 lg:w-36 lg:h-36"
          src={currentUser.imageUrl || "assets/icons/profile-placeholder.svg"}
          alt="creator"
        />
        <div className="flex flex-col flex-1 justify-between md:mt-2">
          <div className="flex flex-col w-full">
            <h1 className="w-full text-center xl:text-left h3-bold md:h1-bold ">
              {currentUser.name}
            </h1>
            <p className="text-center xl:text-left text-light-3 small-regular md:body-medium">
              @{currentUser.username}
            </p>
          </div>
          <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
            <StatsBlock value={followers} label="Followers" />
            <StatsBlock value={following} label="Following" />
            <StatsBlock value={postsNumber} label="Posts" />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="">
            {user.id === currentUser?.$id ? (
              <Link
                className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg "
                to={`/update-profile/${currentUser?.$id}`}
              >
                <img src="/assets/icons/edit.svg" alt="edit" className="" />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            ) : (
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>
      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
            to={`/profile/${id}`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
            to={`/profile/${id}/liked-posts`}
          >
             <img
              src={"/assets/icons/like.svg"}
              alt="liked"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}
      {/* Posts Component */}
      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser?.posts} showUser={false} />}
        />
        <Route path="/liked-posts" element={<LikedPosts />} />
      </Routes>
      <Outlet />
    </div>
  );
}

type StatsBlockProps = {
  value: number;
  label: string;
};
function StatsBlock({ value, label }: StatsBlockProps) {
  return (
    <p className="flex-center gap-2">
      <span className="small-semibold lg:body-bold text-primary-500">
        {value}
      </span>
      <span className="small-medium lg:body-medium text-light-2">{label}</span>
    </p>
  );
}
