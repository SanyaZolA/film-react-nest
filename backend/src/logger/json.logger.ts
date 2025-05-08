import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class JsonLogger implements LoggerService {
  private readonly logDir = path.resolve(__dirname, '../../logs');
  private readonly logFile = path.join(this.logDir, 'json.log');

  constructor() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, optionalParams });
  }

  private writeToFile(level: string, message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      params: optionalParams.length > 0 ? optionalParams : undefined,
    };

    appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n');
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

  debug?(message: any, ...optionalParams: any[]) {
    this.writeToFile('debug', message, ...optionalParams);
  }
}
