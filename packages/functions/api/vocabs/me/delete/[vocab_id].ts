import { VercelRequest, VercelResponse } from "@vercel/node";
import knex from "databases/src/instnace";
import { protectedRouteMiddleware } from "../../../../core/middlewares/protected-route";
import { getJWTContextFromRequest } from "../../../../core/request/common";
import { requestDescriptorize } from "../../../../core/request/request-descriptor";

async function DELETE(req: VercelRequest, res: VercelResponse) {
  const { vocab_id } = req.query;
  try {
    const vocab = await knex("users_vocabs")
      .select(
        "id",
        "word",
        "quiz_correctness_count",
        "created_at",
        "updated_at"
      )
      .where({ user_id: getJWTContextFromRequest(req).id, id: vocab_id })
      .first();

    if (!vocab)
      return res
        .json({ message: `vocab with id:"${vocab_id}" does not exist` })
        .status(404);

    const removal = await knex("users_vocabs")
      .del()
      .where({ user_id: getJWTContextFromRequest(req).id, id: vocab_id });
    return res.json({ data: { affected_rows: removal } });
  } catch (err) {
    return res.json({ message: "internal error" }).status(500);
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  requestDescriptorize(
    { req, res },
    { DELETE: { handler: DELETE, middlewares: [protectedRouteMiddleware] } }
  );
};
