import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username", 255).unique().notNullable();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
