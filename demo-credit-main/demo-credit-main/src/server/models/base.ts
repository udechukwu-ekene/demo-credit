import { knexDb } from "../../config/database";
// import * as Knex from "knex";

class BaseModel {
  name: any;
  tableName: any;
  selectableProps: any;
  timeout: number;
  knexInstance: any;

  constructor(name, tableName, selectableProps, timeout = 1000) {
    this.name = name;
    this.tableName = tableName;
    this.selectableProps = selectableProps;
    this.timeout = timeout;
    this.knexInstance = knexDb(tableName);
  }

  create(props) {
    delete props.id; // not allowed to set `id`
    return this.knexInstance.insert(props).returning("*").timeout(this.timeout);
  }

  findAll() {
    return this.knexInstance.select(this.selectableProps)
    .from(this.tableName)
    .timeout(this.timeout);
  }

  find(filters) {
    return this.knexInstance.select(this.selectableProps)
    .from(this.tableName)
    .where(filters)
    .timeout(this.timeout);
  }

  findOne(filters) {
    return this.find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results;
      return results[0];
    });
  }

  findById(id) {
    console.log(id);
    return this.knexInstance.select(this.selectableProps)
    .from(this.tableName)
    .where({ id })
    .timeout(this.timeout);
  }

  update(id, props) {
    delete props.id; // not allowed to set `id`
    return this.knexInstance.update(props)
    .from(this.tableName)
    .where({ id })
    .returning(this.selectableProps)
    .timeout(this.timeout);
  }

  updateRange(options, props) {
    delete props.id; // not allowed to set `id`
    return this.knexInstance.update(props)
    .from(this.tableName)
    .where(options.col, options.symbol, options.val)
    .returning(this.selectableProps)
    .timeout(this.timeout);
  }

  destroy(id) {
    return this.knexInstance.del()
    .from(this.tableName)
    .where({ id })
    .timeout(this.timeout);
  }

}

export default BaseModel;
