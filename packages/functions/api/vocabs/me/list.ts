import { VercelRequest, VercelResponse } from "@vercel/node";
import knex from "databases/src/instnace";
import { protectedRouteMiddleware } from "../../../core/middlewares/protected-route";
import { getJWTContextFromRequest } from "../../../core/request/common";
import { requestDescriptorize } from "../../../core/request/request-descriptor";

async function GET(req: VercelRequest, res: VercelResponse) {
  try {
    const users_vocabs = await knex("users_vocabs")
      .select(
        "id",
        "word",
        "quiz_correctness_count",
        "created_at",
        "updated_at"
      )
      .where({ user_id: getJWTContextFromRequest(req).id });
    return res.json({ data: users_vocabs });
  } catch (err) {
    return res.json({ message: "internal error" }).status(500);
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  requestDescriptorize(
    { req, res },
    { GET: { handler: GET, middlewares: [protectedRouteMiddleware] } }
  );
};
