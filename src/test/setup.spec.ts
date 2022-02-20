import { before } from 'mocha';
import connectDatabase from '../setup';

before(async function setup() {
  this.timeout(10_000);
  await connectDatabase(false);
});
