import type { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

import { User } from "../features/users/types";

export const validateToken = async (req: NextApiRequest) => {
  const token = await getToken({ req });
  if (!token) return false;

  const userId = req.body?.userId ?? req.query?.userId;
  if (!userId) return false;

  const tokenUser = token.user as User;
  return token && tokenUser.id === Number(userId);
};
