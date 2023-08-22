import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          key={thread._id}
          content={thread.text}
          author={thread.author}
          parentId={thread.parentId}
          comments={thread.children}
          community={thread.community}
          createdAt={thread.createdAt}
          currentUserId={user?.id || ""}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            isComment={true}
            id={childItem._id}
            key={childItem._id}
            content={childItem.text}
            author={childItem.author}
            parentId={childItem.parentId}
            comments={childItem.children}
            community={childItem.community}
            createdAt={childItem.createdAt}
            currentUserId={childItem.id || ""}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
