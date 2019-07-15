import { expect } from 'chai';

export default (statusCode, data) => {
  expect(data.statusCode)
  .to.equal(statusCode);
};
