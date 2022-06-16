/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
import { Console } from 'console';

const { red: ERROR, green: DEBUG, blue: INFO } = chalk;

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
    let writer = this.options[type];

    if (disableColor) writer = writer.reset;
    if (enableBold) writer = writer.bold;

    super.log(writer(message), ...optionalParams);
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
