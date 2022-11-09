import { VercelRequest, VercelResponse } from "@vercel/node";
import knex from "databases/src/instnace";
import { protectedRouteMiddleware } from "../../../core/middlewares/protected-route";
import { getJWTContextFromRequest } from "../../../core/request/common";
import { requestDescriptorize } from "../../../core/request/request-descriptor";

async function POST(req: VercelRequest, res: VercelResponse) {
  const { word } = req.body;

  if (!word)
    return res
      .status(400)
      .json({ message: "word is required in the request body" });

  try {
    const insertion = await knex("users_vocabs").insert({
      word: word,
      user_id: getJWTContextFromRequest(req).id,
    });
    return res.json({ success: true, data: insertion });
  } catch (error: any) {
    if (!("errno" in error))
      return res.json({ message: "internal error" }).status(500);
    if (error.errno === 19)
      return res.json({ message: `word of ${word} already exist` }).status(400);
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  requestDescriptorize(
    { req, res },
    { POST: { handler: POST, middlewares: [protectedRouteMiddleware] } }
  );
};
