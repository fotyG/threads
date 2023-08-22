import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // getNotifications
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section></section>
    </section>
  );
}
export default Page;
