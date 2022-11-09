import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users_vocabs", function (table) {
    table.increments("id").primary();
    table.string("word", 255).notNullable();
    table.tinyint("quiz_correctness_count").notNullable().defaultTo(0);
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.unique(["word", "user_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users_vocabs");
}
