'use strict';
const uuid = require('uuid');

const getId = () => uuid.v1();
module.exports = ({
  knex = {},
  tableName,
  selectableProps = [],
  timeout = 100,
}) => {
  const create = data => {
    const id = getId();
    const entity = knex.insert({ id, ...data })
      .into(tableName)
      .then(row => {
        console.log({ row, id });
        return { row, id };
      });
    //.timeout(timeout);
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
