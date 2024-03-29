/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import App from 'fusion-core';
import express from 'express';
import {HttpHandlerToken, HttpHandlerConfigToken} from '../tokens';
import HttpHandlerPlugin from '../server';
import {startServer} from '../test-util';

test('http handler with express', async () => {
  const app = new App('test', () => 'test');
  app.middleware((ctx, next) => {
    if (ctx.url === '/send') {
      ctx.body = 'hello world';
    }
    return next();
  });
  app.register(HttpHandlerPlugin);
  let hitExpressMiddleware = false;
  const expressApp = express();
  expressApp.use((req, res, next) => {
    hitExpressMiddleware = true;
    return next();
  });
  expressApp.get('/lol', (req, res) => {
    res.status(200);
    res.end('OK');
  });

  app.register(HttpHandlerToken, expressApp);

  const {server, request} = await startServer(app.callback());
  // @ts-ignore
  expect(await request('/send')).toBe('hello world');
  expect(hitExpressMiddleware).toBe(false);
  // @ts-ignore
  expect(await request('/lol')).toBe('OK');
  expect(hitExpressMiddleware).toBe(true);
  server.close();
});

test('http handler with express and defer false', async () => {
  const app = new App('test', () => 'test');
  app.middleware((ctx, next) => {
    if (ctx.url === '/send') {
      ctx.body = 'hello world';
    }
    return next();
  });
  app.register(HttpHandlerPlugin);
  app.register(HttpHandlerConfigToken, {defer: false});
  let hitExpressMiddleware = false;
  const expressApp = express();
  expressApp.use((req, res, next) => {
    hitExpressMiddleware = true;
    return next();
  });
  expressApp.get('/lol', (req, res) => {
    res.status(200);
    res.end('OK');
  });

  app.register(HttpHandlerToken, expressApp);

  const {server, request} = await startServer(app.callback());
  // @ts-ignore
  expect(await request('/send')).toBe('hello world');
  expect(hitExpressMiddleware).toBe(false);
  // @ts-ignore
  expect(await request('/lol')).toBe('OK');
  expect(hitExpressMiddleware).toBe(true);
  server.close();
});
