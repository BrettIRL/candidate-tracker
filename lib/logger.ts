import { createLogger, format, transports } from 'winston';
const { combine, colorize, errors, timestamp, json, printf } = format;

const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), errors(), json()),
  defaultMeta: {
    instance: `${process.env.name} ${process.env.NODE_APP_INSTANCE}`,
  },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        consoleFormat,
      ),
    }),
  );
}
