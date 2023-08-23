import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch communities
  const result = await fetchCommunities({
    pageSize: 25,
    pageNumber: 1,
    searchString: "",
  });
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}

      <div className="mt-14 flex flex-col gap-9">
        {result.communities.length === 0 ? (
          <p className="no-result">No communities</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                id={community.id}
                key={community.id}
                bio={community.bio}
                name={community.name}
                imgUrl={community.image}
                members={community.members}
                username={community.username}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
export default Page;
