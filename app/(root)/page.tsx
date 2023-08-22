import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";

export default async function Home() {
  const user = await currentUser();
  const result = await fetchPosts(1, 30);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result?.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result?.posts.map((post) => (
              <ThreadCard
                id={post._id}
                key={post._id}
                content={post.text}
                author={post.author}
                parentId={post.parentId}
                comments={post.children}
                currentUserId={user?.id || ""}
                community={post.community}
                createdAt={post.createdAt}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
