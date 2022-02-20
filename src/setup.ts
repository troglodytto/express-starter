import config from 'config';
import {
  ConnectionOptions,
  createConnection,
  getConnection,
  LoggerOptions,
} from 'typeorm';
import entities from './models';

export default async function connectDatabase(logging: LoggerOptions = true) {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: config.get<string>('database.host'),
    port: config.get<number>('database.port'),
    username: config.get<string>('database.username'),
    password: config.get<string>('database.password'),
    database: config.get<string>('database.database'),
    synchronize: true,
    entities,
    logging,
    name: 'default',
  };

  try {
    return getConnection(connectionOptions.name);
  } catch {
    return createConnection(connectionOptions);
  }
}
