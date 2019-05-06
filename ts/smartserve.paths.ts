import * as plugins from './smartserve.plugins';

export const packageDir = plugins.path.join(__dirname, '../');

export const bundlePath = plugins.path.join(packageDir, './dist_web/bundle.js');