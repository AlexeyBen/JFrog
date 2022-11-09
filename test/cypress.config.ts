import { defineConfig } from 'cypress';
import * as webpackPreprocessor from '@cypress/webpack-preprocessor';
import * as findWebpack from 'find-webpack';

const webpackOptions = findWebpack.getWebpackOptions();
const options = {
  webpackOptions,
  watchOptions: {},
};

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // on('file:preprocessor', webpackPreprocessor(options));
    },
    baseUrl: 'http://localhost:3000',
  },
  video: false
});
