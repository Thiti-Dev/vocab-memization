import { IUserModel } from "common/src/shared/types/models/user";
import { VercelRequest, VercelResponse } from "@vercel/node";
import knex from "databases/src/instnace";
import { requestDescriptorize } from "../../core/request/request-descriptor";

import { $USER_LOGIN_SCHEMA$ } from "common/src/schemas/users/incoming";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import Validator, { Schema } from "jsonschema";
const v = new Validator.Validator();

async function POST(req: VercelRequest, res: VercelResponse) {
  const validateResult: Validator.ValidatorResult = v.validate(
    req.body,
    $USER_LOGIN_SCHEMA$
  );

  if (!validateResult.valid)
    return res.status(400).json({ validation_error: validateResult.errors });

  const { username, password } = req.body;

  const exists = await knex("users").where({ username }).first();

  if (!exists)
    return res
      .status(400)
      .json({ message: `This username doesn't exist on the system` });

  if (!bcrypt.compareSync(password, exists.password))
    return res.status(400).json({ message: `password is incorrect` });

  return res.json({
    success: true,
    token: jwt.sign({ username, id: exists.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    }),
  });
}

export default async (req: VercelRequest, res: VercelResponse) => {
  return requestDescriptorize({ req, res }, { POST: { handler: POST } });
};
