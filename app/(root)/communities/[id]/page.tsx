import Image from "next/image";

import { communityTabs } from "@/constants";
import { currentUser } from "@clerk/nextjs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "@/components/cards/UserCard";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        type="Community"
        authUserId={user.id}
        bio={communityDetails.bio}
        name={communityDetails.name}
        imgUrl={communityDetails.image}
        accountId={communityDetails.id}
        username={communityDetails.username}
      />

      <div className="mt-9">
        <Tabs
          className="w-full"
          defaultValue="threads"
        >
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger
                className="tab"
                key={tab.label}
                value={tab.value}
              >
                <Image
                  width={24}
                  height={24}
                  src={tab.icon}
                  alt={tab.label}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {communityDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="threads"
            className="w-full text-light-1"
          >
            <ThreadsTab
              accountType="Community"
              accountId={communityDetails._id}
              currentUserId={user.id}
            />
          </TabsContent>
          <TabsContent
            value="members"
            className="w-full text-light-1"
          >
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails?.members.map((member: any) => (
                <UserCard
                  id={member.id}
                  key={member.id}
                  personType="User"
                  name={member.name}
                  imageUrl={member.image}
                  username={member.username}
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent
            value="requests"
            className="w-full text-light-1"
          >
            <ThreadsTab
              accountType="Community"
              accountId={communityDetails._id}
              currentUserId={user.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
