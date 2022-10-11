import { Schema } from "jsonschema";

export const $USER_REGISTER_SCHEMA$: Schema = {
  id: "/User",
  type: "object",
  required: true,
  properties: {
    username: {
      type: "string",
      required: true,
      title: "username",
      minLength: 5,
      maxLength: 20,
    },
    password: {
      type: "string",
      required: true,
      maxLength: 100,
      minLength: 8,
    },
    first_name: {
      type: "string",
      required: true,
      title: "FirstName",
      minLength: 3,
      maxLength: 25,
    },
    last_name: {
      type: "string",
      required: true,
      title: "LastName",
      minLength: 3,
      maxLength: 40,
    },
  },
};

export const $USER_LOGIN_SCHEMA$: Schema = {
  id: "/UserLogin",
  type: "object",
  required: true,
  properties: {
    username: {
      type: "string",
      required: true,
      title: "username",
    },
    password: {
      type: "string",
      required: true,
      title: "password",
    },
  },
};
