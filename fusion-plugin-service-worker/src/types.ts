import type {Token, Context} from 'fusion-core';

export type PluginServiceType = {
  from: (ctx?: Context) => {
    ctx?: Context;
    value: string;
  };
};

export type AssetInfo = {
  precachePaths: Array<RequestInfo>;
  cacheableResourcePaths: Array<RequestInfo>;
  cacheableRoutePatternStrings: Array<string>;
  cacheBustingPatternStrings: Array<string>;
  cacheDuration?: number;
};

type ConfigType = (a: AssetInfo) => string;
export type ConfigTokenType = Token<ConfigType>;

export type SWLoggerType = {
  readonly log: (...data: Array<string>) => void;
};
export type SWLoggerTokenType = Token<SWLoggerType>;
