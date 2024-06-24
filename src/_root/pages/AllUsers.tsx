import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

export default function AllUsers() {
  const { data: users, isPending: isLoadingUsers } = useGetUsers(100);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All users</h2>
        {isLoadingUsers ? (
          <Loader />
        ) : (
          <>
            <div className="user-grid">
              {users?.documents.map((user) => (
                <UserCard user={user} key={user.$id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
