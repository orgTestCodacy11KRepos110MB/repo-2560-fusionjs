/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {FusionPlugin} from 'fusion-core';
import type {Logger} from 'fusion-tokens';
import {UniversalEventsToken} from 'fusion-plugin-universal-events';

import {UniversalLoggerConfigToken} from './tokens';

type DepsType = {
  emitter: typeof UniversalEventsToken;
  config?: typeof UniversalLoggerConfigToken.optional;
};

export type UniversalLoggerPluginType = FusionPlugin<DepsType, Logger>;
