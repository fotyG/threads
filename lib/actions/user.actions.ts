"use server";

import { revalidatePath } from "next/cache";

import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

type updateUserType = {
  bio: string;
  name: string;
  path: string;
  image: string;
  userId: string;
  username: string;
};

export async function updateUser({
  bio,
  path,
  name,
  image,
  userId,
  username,
}: updateUserType): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        bio,
        name,
        image,
        oboarded: true,
        username: username.toLowerCase(),
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
