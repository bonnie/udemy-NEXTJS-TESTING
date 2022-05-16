import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { validateToken } from "@/lib/auth/utils";

import { processApiError } from "./utils";

// base handler for centralized error and method handling
export const createHandler = ({
  authRequired,
}: { authRequired?: boolean } = {}) => {
  const handler = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
      const { status, message } = processApiError(error);
      res.status(status).json({ message });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    },
  });
  if (authRequired) {
    handler.use(async (req, res, next) => {
      const tokenIsValid = await validateToken(req);
      if (!tokenIsValid) return res.status(401).end();
      return next();
    });
  }
  return handler;
};
