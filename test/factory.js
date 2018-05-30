const { expect }  = require('chai');
const factory = require('../dwp/factory');

describe('Unit Tests factory.js', () => {
  describe('expose packet', () => {
    it('should throw with no begin tag', () => {
      const errReason = 'begin tag was not found';
      expect(() => factory.expose('test1/END/')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.expose('test2/END/')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.expose('test3/END/')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.expose('test4/END/')).to.throw()
        .with.property('reason', errReason);
    });

    it('should throw with no end tag', () => {
      const errReason = 'end tag was not found';
      expect(() => factory.expose('/BEGIN/test1')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.expose('/BEGIN/test2')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.expose('/BEGIN/test3')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.expose('/BEGIN/test4')).to.throw()
        .with.property('reason', errReason);
    });

    it('should return with no limit tags', () => {
      expect(factory.expose('xx/BEGIN/test1/END/')).to.equal('test1');
      expect(factory.expose('/BEGIN/test2/END/xx')).to.equal('test2');
      expect(factory.expose('xxx/BEGIN/test3/END/xxx')).to.equal('test3');
      expect(factory.expose('/BEGIN/test4/END/')).to.equal('test4');
    });
  });

  describe('remove packet', () => {
    it('should throw with no begin tag', () => {
      const errReason = 'begin tag was not found';
      expect(() => factory.remove('test1/END/')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.remove('test2/END/')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.remove('test3/END/')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.remove('test4/END/')).to.throw()
        .with.property('reason', errReason);
    });

    it('should throw with no end tag', () => {
      const errReason = 'end tag was not found';
      expect(() => factory.remove('/BEGIN/test1')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.remove('/BEGIN/test2')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.remove('/BEGIN/test3')).to.throw()
        .with.property('reason', errReason);

      expect(() => factory.remove('/BEGIN/test4')).to.throw()
        .with.property('reason', errReason);
    });

    it('should return with no limit tags', () => {
      expect(factory.remove('xx/BEGIN/test1/END/')).to.equal('xx');
      expect(factory.remove('/BEGIN/test2/END/xx')).to.equal('xx');
      expect(factory.remove('xxx/BEGIN/test3/END/xxx')).to.equal('xxxxxx');
      expect(factory.remove('/BEGIN/test4/END/')).to.equal('');
    });
  });
});
