const debug = require('debug')('platziverse:db:setup');
const inquirer = require('inquirer');
const chalk = require('chalk');
const db = require('.');

const prompt = inquirer.createPromptModule();

async function setup() {
  const answer = await prompt([{
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy your database, are you sure?',
  },
  ]);

  if (!answer.setup) return console.log('Nothing happened.');

  const config = {
    database: 'platziverse',
    username: 's3v',
    password: 'caradepene',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: (msg) => debug(msg),
    setup: true,
  };

  await db(config).catch(handleFatalError);
  console.log('DB-SERVER: OK');
};

setup();

function handleFatalError(err) {
  console.error(err);
}
