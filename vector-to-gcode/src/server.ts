import express from 'express';
import cors from 'cors';

import vectorRoutes from './domains/vector/routes';

const server = express();

server.use(express.json({ limit: '50mb' }));
server.use(cors({ origin: '*' }));

server.use('/vector', vectorRoutes);

server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});

export default server;
