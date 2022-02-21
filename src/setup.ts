import config from 'config';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnection,
  LoggerOptions,
} from 'typeorm';
import logger from './utils/log';
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

  let connection: Connection;
  try {
    connection = await getConnection(connectionOptions.name);
  } catch {
    connection = await createConnection(connectionOptions);
  }

  if (connection?.isConnected) {
    logger.info(
      `Connected to database '${connection.options.database}' on '${connectionOptions.host}:${connectionOptions.port}'`
    );
  }
  return connection;
}
