// tests/security.rules.test.js

const fs = require('fs');
const path = require('path');
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} = require('@firebase/rules-unit-testing');

const PROJECT_ID = 'maxwell-test-project';
const RULES_PATH = path.resolve(__dirname, '../database.rules.json');

let testEnv;

beforeAll(async () => {
  // Initialize the emulator with your project's rules
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    database: {
      host: 'localhost',
      port: 9000,
      rules: fs.readFileSync(RULES_PATH, 'utf8')
    }
  });
});

afterAll(async () => {
  // Cleanup emulator
  await testEnv.cleanup();
});

describe('Realtime Database security rules', () => {
  it('rejects unauthenticated reads on /energy_data', async () => {
    const unauthDb = testEnv.unauthenticatedContext().database();
    const ref = unauthDb.ref('energy_data/12345');
    await assertFails(ref.get());
  });

  it('allows authenticated reads on /energy_data', async () => {
    const authDb = testEnv.authenticatedContext('user_abc').database();
    const ref = authDb.ref('energy_data/12345');
    // First seed valid data bypassing rules
    await testEnv.withSecurityRulesDisabled(async ctx => {
      await ctx.database().ref('energy_data/12345').set({
        timestamp: 1618033988,
        voltage:   230.0,
        current:   1.45,
        power:     333.5
      });
    });
    // Now reading should succeed
    await assertSucceeds(ref.get());
  });

  it('rejects writes with missing fields under /energy_data', async () => {
    const authDb = testEnv.authenticatedContext('user_xyz').database();
    const ref = authDb.ref('energy_data/99999');
    // Missing 'current' and 'power'
    const badData = { timestamp: 1618033988, voltage: 230.0 };
    await assertFails(ref.set(badData));
  });

  it('allows correct writes under /energy_data', async () => {
    const authDb = testEnv.authenticatedContext('user_xyz').database();
    const ref = authDb.ref('energy_data/88888');
    const goodData = {
      timestamp: 1618033988,
      voltage:   230.0,
      current:   1.45,
      power:     333.5
    };
    await assertSucceeds(ref.set(goodData));
  });

  it('rejects invalid state values under /alerts', async () => {
    const authDb = testEnv.authenticatedContext('user_alert').database();
    const ref = authDb.ref('alerts/alert1');
    // state must be 'triggered' or 'cleared'
    const badAlert = { timestamp: 1618034000, state: 'unknown' };
    await assertFails(ref.set(badAlert));
  });

  it('allows valid alerts under /alerts', async () => {
    const authDb = testEnv.authenticatedContext('user_alert').database();
    const ref = authDb.ref('alerts/alert2');
    const goodAlert = { timestamp: 1618034000, state: 'triggered' };
    await assertSucceeds(ref.set(goodAlert));
  });
});
