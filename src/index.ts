import chalk from 'chalk';
import config from 'config';
import app from './app';
import connectDatabase from './setup';
import socketServer from './socket';

const PORT = config.get<number>('app.port') || 3000;

async function main() {
  await connectDatabase(false);

  const server = app.listen(PORT, () => {
    console.log(chalk.blue(`Server listening on port ${PORT}`));
  });

  socketServer.listen(server);
}

main();
