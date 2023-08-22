import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    pageSize: 25,
    pageNumber: 1,
    userId: user.id,
    searchString: "",
  });
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                id={person.id}
                key={person.id}
                personType="User"
                name={person.name}
                imageUrl={person.image}
                username={person.username}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
export default Page;
