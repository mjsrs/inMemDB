// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const { defaults } = require('jest-config');

const config = {
  ...defaults,
  verbose: true,
  collectCoverage: true,
};

module.exports = config;
