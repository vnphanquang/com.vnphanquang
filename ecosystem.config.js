const path = require('path');

// https://pm2.keymetrics.io/docs/usage/application-declaration/

/** @type { { apps: Array<import("pm2").StartOptions> }} */
module.exports = {
  apps : [
    {
      name: '@vnphanquang/api',
      script: 'npm',
      args: 'run start:prod',
      interpreter: '/bin/bash',
      cwd: path.resolve(__dirname, './apps/api'),
    },
  ],
};
