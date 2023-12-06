import { createLogger, format, transports } from 'winston';
const { combine, colorize, errors, timestamp, json, printf, simple } = format;

const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), errors(), json()),
  defaultMeta: {
    instance: `${process.env.name} ${process.env.NODE_APP_INSTANCE}`,
  },
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
  logger.add(
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  );
  logger.add(new transports.File({ filename: 'logs/combined.log' }));
} else {
  logger.add(new transports.Console({ format: simple() }));
}
