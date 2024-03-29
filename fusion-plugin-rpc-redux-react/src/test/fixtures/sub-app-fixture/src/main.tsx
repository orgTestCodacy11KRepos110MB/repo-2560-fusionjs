/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @ts-nocheck
 */

import React from 'react';
import App from 'fusion-react';
import RPCPlugin, {RPCToken} from '../../../..';
import Root from './components/root';
import ReduxPlugin, {
  ReducerToken,
  ReduxToken,
  GetInitialStateToken,
} from 'fusion-plugin-react-redux';
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events';
import {RPCHandlersToken} from 'fusion-plugin-rpc';
import {FetchToken} from 'fusion-tokens';
import rpcHandlers from './rpc/index';
import reducer from './redux';

export default () => {
  const app = new App(<Root />);

  if (__BROWSER__) {
    app.register(FetchToken, window.fetch);
  }

  if (__NODE__) {
    app.register(RPCHandlersToken, rpcHandlers);
    app.register(GetInitialStateToken, async (ctx) => ({}));
  }

  app.register(RPCToken, RPCPlugin);
  app.register(UniversalEventsToken, UniversalEvents);
  app.register(ReduxToken, ReduxPlugin);
  app.register(ReducerToken, reducer);

  return app;
};
