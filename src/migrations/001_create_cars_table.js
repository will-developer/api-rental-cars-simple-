exports.up = (knex) => {
  return knex.schema.createTable('cars', function (t) {
    t.increments('id').primary();
    t.string('brand').notNullable();
    t.string('model').notNullable();
    t.string('plate').notNullable().unique();
    t.integer('year').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('cars');
};
