// import { AuthUser, createJWT, hashPassword, passwordIsValid } from "../auth";
// import { AuthRequest } from "../middlewares";
import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { getUsers } from "@/lib/features/users/queries";
import type { AuthUser } from "@/lib/features/users/types";
import {
  passwordIsValid,
  removePasswordandAddToken,
} from "@/lib/features/users/utils";

const handler = createHandler();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  // auth user
  const users = await getUsers();
  const validUser = users.reduce(
    (foundUser: AuthUser | null, user) =>
      user.email === email && passwordIsValid(password, user)
        ? user
        : foundUser,
    null
  );

  if (!validUser) return res.status(400).json({ message: "Invalid login" });

  // create jwt
  const user = removePasswordandAddToken(validUser);

  return res.status(200).json({ user });
});

export default handler;
