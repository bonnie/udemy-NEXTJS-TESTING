import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  description: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ description: "actual response" });
}
