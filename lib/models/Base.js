'use strict';

module.exports = ({
  knex = {},
  tableName,
  selectableProps = [],
  timeout = 100,
}) => {
  const create = data => {
    delete data.id; // not allowed to set `id`

    const entity = knex.insert(data)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
    console.log({ entity });
    return entity;
  };

  const findAll = () => knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout);

  const find = filters => knex.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout);

  const findOne = filters => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });

  const findById = id => knex.select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout);

  const update = (id, data) => {
    delete data.id;

    return knex.update(data)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = id => knex.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout);

  return {
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
  };
};
