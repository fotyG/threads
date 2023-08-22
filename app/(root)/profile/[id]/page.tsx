import Image from "next/image";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      <ProfileHeader
        bio={userInfo.bio}
        name={userInfo.name}
        authUserId={user.id}
        imgUrl={userInfo.image}
        accountId={userInfo.id}
        username={userInfo.username}
      />

      <div className="mt-9">
        <Tabs
          className="w-full"
          defaultValue="threads"
        >
          <TabsList className="tab">
            {profileTabs.map((tab) => (
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
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              value={tab.value}
              key={`content-${tab.label}`}
              className="w-full text-light-1"
            >
              <ThreadsTab
                accountType="User"
                accountId={userInfo.id}
                currentUserId={user.id}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
