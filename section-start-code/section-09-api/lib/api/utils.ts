import type { NextApiRequest } from "next";

export const processApiError = (error: unknown) => {
  let status: number;
  let message: string | undefined;

  if (error instanceof Error) {
    message = error.message;

    if (error.name === "RecordNotFound") {
      status = 404;
    } else {
      status = 500;
    }
  } else {
    message = String(error);
    status = 500;
  }
  return { status, message };
};

export const getIdNumFromReq = (req: NextApiRequest) => {
  const { id: idString } = req.query;
  return Number(idString);
};
