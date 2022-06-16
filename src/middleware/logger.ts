import chalk from 'chalk';
import morgan, { FormatFn } from 'morgan';

const loggerOptions: FormatFn = (tokens, req, res) => {
  const statusColor =
    res.statusCode >= 400 ? chalk.bold.red : chalk.bold.greenBright;

  const url = req.url?.replace(/\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g, '/:id');

  const options = [
    chalk.bold.blueBright(`[ ${tokens.method(req, res)} ]`),
    chalk.bold.yellowBright(url),
    statusColor(tokens.status(req, res)),
    chalk.bold.cyanBright(`${tokens['response-time'](req, res)}ms`),
    chalk.bold.gray(tokens.res(req, res, 'content-length') ?? '0'),
  ];

  return options.join(' ');
};

const logger = morgan(loggerOptions);

export default logger;
