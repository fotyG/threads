import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

type Props = {
  accountId: string;
  accountType: string;
  currentUserId: string;
};

const ThreadsTab = async ({ accountType, accountId, currentUserId }: Props) => {
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          id={thread._id}
          key={thread._id}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  id: thread.author.id,
                  name: thread.author.name,
                  image: thread.author.image,
                }
          }
          parentId={thread.parentId}
          comments={thread.children}
          community={thread.community} // todo: update community
          createdAt={thread.createdAt}
          currentUserId={currentUserId}
        />
      ))}
    </section>
  );
};
export default ThreadsTab;
