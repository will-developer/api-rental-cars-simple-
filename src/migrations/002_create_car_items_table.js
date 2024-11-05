exports.up = (knex) => {
  return knex.schema.createTable('car_items', function (t) {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.integer('car_id').unsigned().notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('car_id').references('cars.id');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('car_items');
};
