const { BeforeAll, AfterAll } = require('@cucumber/cucumber');
const Mocha = require('mocha');

const mocha = new Mocha({
  ui: 'bdd',
  reporter: 'spec',
});

BeforeAll(() => {
  console.log('Starting tests...');
});

AfterAll(() => {
  return new Promise((resolve) => {
    mocha.run(resolve);
  });
});
