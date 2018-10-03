const { expect } = require('chai');
const common = require('../dwp/common');

describe('Unit Tests common.js', () => {
  describe('flag ids', () => {
    it('all flags have ids with different bits set', () => {
      let current = 0;
      Object.entries(common.Flags).forEach(([key, value]) => { // eslint-disable-line
        expect(value & current).to.equal(0);
        current = current | value; // eslint-disable-line
      });
    });
  });

  describe('slave state', () => {
    it('executed and paused have different values', () => {
      const state = common.SlaveState;
      expect(state.EXECUTING).to.not.equal(state.PAUSED);
    });
  });

  describe('terminated task code', () => {
    it('terminated and denied have different values', () => {
      const tCode = common.TerminateTaskCode;
      expect(tCode.DENIED).to.not.equal(tCode.TERMINATED);
    });
  });
});
