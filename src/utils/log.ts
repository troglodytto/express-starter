/* eslint-disable @typescript-eslint/no-explicit-any */
import { red as ERROR, green as DEBUG, blue as INFO } from 'chalk';
import { Console } from 'console';

class Logger extends Console {
  private options = { ERROR, DEBUG, INFO };

  private static serialize(input: any): string {
    if (input.toString) {
      return input.toString();
    }

    if (input instanceof Object) {
      return JSON.stringify(input, null, 2);
    }

    return input;
  }

  private base(
    type: 'ERROR' | 'DEBUG' | 'INFO',
    input?: any,
    enableBold = true,
    disableColor = false,
    ...optionalParams: any[]
  ): void {
    const serialized = Logger.serialize(input);
    const message = `[ ${type} ] ${serialized}`;
    let chalk = this.options[type];

    if (disableColor) chalk = chalk.reset;
    if (enableBold) chalk = chalk.bold;

    super.log(chalk(message), ...optionalParams);
  }

  error(input?: any, ...optionalParams: any[]): void {
    this.base('ERROR', input, ...optionalParams);
  }

  log(input?: any, ...optionalParams: any[]): void {
    this.base('DEBUG', input, ...optionalParams);
  }

  info(input?: any, ...optionalParams: any[]): void {
    this.base('INFO', input, ...optionalParams);
  }
}

const logger = new Logger(process.stdout, process.stderr);
export default logger;
