import { Knex, knex } from "knex";

import _config from "../knexfile";

const config: Knex.Config = {
  ..._config[process.env.ENVIRONMENT_MODE as string],
};

export default knex(config);
