import { IUserModel } from "common/src/shared/types/models/user";
import { VercelRequest, VercelResponse } from "@vercel/node";
import knex from "databases/src/instnace";
import { requestDescriptorize } from "../../core/request/request-descriptor";

import { $USER_REGISTER_SCHEMA$ } from "common/src/schemas/users/incoming";

import bcrypt from "bcrypt";

import Validator, { Schema } from "jsonschema";
const v = new Validator.Validator();

async function POST(req: VercelRequest, res: VercelResponse) {
  const validateResult: Validator.ValidatorResult = v.validate(
    req.body,
    $USER_REGISTER_SCHEMA$
  );

  if (!validateResult.valid)
    return res.status(400).json({ validation_error: validateResult.errors });

  const { first_name, last_name, username, password } = req.body;

  const exists = await knex("users").where({ username }).first();

  if (exists)
    return res
      .status(400)
      .json({ message: `This username has already been taken` });

  const hashedPassword: string = bcrypt.hashSync(req.body.password, 10);

  const insertedRows = await knex("users").insert({
    first_name,
    last_name,
    password: hashedPassword,
    username,
  } as IUserModel);

  return res.json({
    data: insertedRows,
  });
}

export default async (req: VercelRequest, res: VercelResponse) => {
  return requestDescriptorize({ req, res }, { POST: { handler: POST } });
};
