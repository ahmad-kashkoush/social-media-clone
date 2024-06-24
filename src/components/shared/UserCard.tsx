import { IUser } from "@/types";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Models } from "appwrite";

type userCardProps = {
  user: Models.Document;
};
export default function UserCard({ user }: userCardProps) {
  return (
    <div className="user-card">
      <Link to={`/profile/${user.$id}`}>
        <img
          className="rounded-full w-14 h-14"
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
        />
      </Link>
      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>
      <Button className="shad-button_primary">Follow</Button>
    </div>
  );
}
