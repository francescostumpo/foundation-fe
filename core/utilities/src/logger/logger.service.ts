import { LogLevel } from './interface/LogLevel';

export const loggerService = () => {
  /**
   * Format the whole date
   */
  const formatMessage = (logLevel: number, message: any): string =>
    `${
      LogLevel[logLevel]?.toUpperCase() || ''
    } - ${new Date().toISOString()} - ${message}\n`;

  /**
   * Adjust date section formatting
   * @param caller - context from where the log is called
   * @param logLevel - severity of the log
   * @param messages - messages to be printed
   */
  const logMessage = (logLevel: number, message: any): void => {
    if (logLevel === LogLevel.WARNING) {
      console.warn(formatMessage(logLevel, message));
    } else if (logLevel === LogLevel.ERROR) {
      console.error(formatMessage(logLevel, message));
    } else {
      console.log(formatMessage(logLevel, message));
    }
  };

  return {
    info: (message: any) => logMessage(LogLevel.INFO, message),
    warn: (message: any) => logMessage(LogLevel.WARNING, message),
    error: (message: any) => logMessage(LogLevel.ERROR, message),
  };
};
