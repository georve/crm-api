import {inject, lifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
//import * as config from './db.datasource.json';
const config ={
  name: "db",
  connector: "mysql",
  host: "DB_HOST",
  port: "DB_PORT",
  user: "DB_USER",
  password: "DB_PASSWORD",
  database: "DB_DATABASE",
  schema: "DB_SCHEMA",
  charset: "utf8mb4",
  collation: "utf8mb4_general_ci"
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {

    dsConfig = Object.assign({
      name: 'db',
      connector: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      dateStrings: false,
      charset: "utf8mb4",
      collation: "utf8mb4_general_ci"
    });
    super(dsConfig);
  }
}

