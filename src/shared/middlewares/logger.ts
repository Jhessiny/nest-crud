import { Logger } from '@nestjs/common';

import { ServerResponse } from 'http';
import { performance } from 'perf_hooks';

export const createLog = (
  req: any,
  statusCode: number,
  responseTime: number,
) => ({
  time: new Date().toISOString(),
  ip: req.headers['x-forwarded-for'],
  agent: req.headers['user-agent'],
  method: req.method,
  url: req.url,
  responseStatus: statusCode,
  responseTime,
});

export const logger = (req: any, res: ServerResponse, next: () => void) => {
  const start = performance.now();
  res.on('close', () => {
    const { statusCode } = res;
    if (statusCode !== 500) {
      Logger.log(
        JSON.stringify(createLog(req, statusCode, performance.now() - start)),
      );
    }
  });
  next();
};
