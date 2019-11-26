exports.up = function(knex) {
  return knex.schema.createTable("parties", parties => {
    parties.increments();
    parties
      .integer("planner_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    parties.text("title", 120).notNullable();
    parties
      .integer("guestNumber")
      .notNullable()
      .unsigned();
    parties
      .integer("budget")
      .notNullable()
      .unsigned();
    parties.text("date", 20).notNullable();
    parties.text("entertainment", 120).notNullable();
    parties.text("shoppingList", 120).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("parties");
};
