import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class TSKVLogger implements LoggerService {
  private readonly logDir = path.resolve(__dirname, '../../logs');
  private readonly logFile = path.join(this.logDir, 'tskv.log');

  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const logObject: { [key: string]: string } = {
      ['logger']: 'tskv',
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.extractContext(optionalParams) || '',
      params: optionalParams.length > 0 ? optionalParams.join(', ') : '',
    };
    return Object.entries(logObject)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
  }

  private extractContext(params: any[]): string | undefined {
    if (params.length && typeof params[params.length - 1] === 'string') {
      return params.pop();
    }
    return undefined;
  }

  constructor() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private writeToFile(level: string, message: any, ...optionalParams: any[]) {
    const logMessage = this.formatMessage(level, message, ...optionalParams);
    appendFileSync(this.logFile, logMessage + '\n');
  }

  log(message: any, ...optionalParams: any[]) {
    this.writeToFile('log', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.writeToFile('error', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeToFile('warn', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.writeToFile('debug', message, ...optionalParams);
  }
}
