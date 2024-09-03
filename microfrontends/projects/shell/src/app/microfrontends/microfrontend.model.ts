import { LoadRemoteModuleOptions } from '../utils/utils';

export type MicroFE = LoadRemoteModuleOptions & {
  displayName: string;
  routePath: string;
  ngModuleName: string;
};
