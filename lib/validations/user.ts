import * as z from "zod";

export const UserValidation = z.object({
  bio: z.string().min(3).max(1000),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  profile_photo: z.string().url().nonempty(),
});
