import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";

interface Props {
  id: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  currentUserId: string;
  parentId: string | null;
}

const ThreadCard = ({
  id,
  author,
  content,
  parentId,
  comments,
  community,
  isComment,
  createdAt,
  currentUserId,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl  ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4 ">
          <div className="flex flex-col items-center">
            <Link
              className="relative h-11 w-11"
              href={`/profile/${author.id}`}
            >
              <Image
                fill
                alt="profile"
                src={author.image}
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link
              className="w-fit"
              href={`/profile/${author.id}`}
            >
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  width={24}
                  height={24}
                  alt="heart"
                  src="/assets/heart-gray.svg"
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    width={24}
                    height={24}
                    alt="reply"
                    src="/assets/reply.svg"
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  width={24}
                  height={24}
                  alt="repost"
                  src="/assets/repost.svg"
                  className="cursor-pointer object-contain"
                />
                <Image
                  width={24}
                  height={24}
                  alt="share"
                  src="/assets/share.svg"
                  className="cursor-pointer object-contain"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* todo: delete thread */}
        {/* todo: show comment logos */}
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>

          <Image
            width={14}
            height={14}
            alt={community.name}
            src={community.image}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};
export default ThreadCard;
