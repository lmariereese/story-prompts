'use strict';
const {
  settingData,
  adjectiveData,
  detailData,
  mainCharacterData,
  risingActionData,
  climaxData
} = require('./data');
const chalk = require('chalk');
const db = require('../server/db');
const { User, StoryElement } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log(chalk.yellow('db synced!'));

  const settings = await Promise.all(
    settingData.map(string => {
      return StoryElement.create({ text: string, element: 'setting' });
    })
  );

  const adjectives = await Promise.all(
    adjectiveData.map(adj => {
      return StoryElement.create({ text: adj, element: 'adjective' });
    })
  );

  const mainCharacters = await Promise.all(
    mainCharacterData.map(char => {
      return StoryElement.create({ text: char, element: 'character' });
    })
  );

  const details = await Promise.all(
    detailData.map(detail => {
      return StoryElement.create({ text: detail, element: 'detail' });
    })
  );

  const risingActions = await Promise.all(
    risingActionData.map(action => {
      return StoryElement.create({ text: action, element: 'action' });
    })
  );

  const climaxes = await Promise.all(
    climaxData.map(plot => {
      return StoryElement.create({ text: plot, element: 'climax' });
    })
  );

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ]);

  console.log(chalk.green(`seeded ${settings.length} settings`));
  console.log(chalk.green(`seeded ${adjectives.length} adjectives`));
  console.log(chalk.green(`seeded ${mainCharacters.length} main characters`));
  console.log(chalk.green(`seeded ${details.length} character details`));
  console.log(chalk.green(`seeded ${risingActions.length} rising actions`));
  console.log(chalk.green(`seeded ${climaxes.length} plot climaxes`));
  console.log(chalk.green(`seeded ${users.length} users`));
  console.log(chalk.green(`seeded successfully`));
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log(chalk.yellow('seeding...'));
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
