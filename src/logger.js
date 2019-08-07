import winston from 'winston';

const { format } = winston;


const customFormat = format.printf(({
  level,
  message,
  label,
  timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: 'tick3t-api' }),
    format.timestamp(),
    customFormat,
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});



export default logger;
