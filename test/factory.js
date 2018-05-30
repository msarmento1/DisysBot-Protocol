const { expect } = require('chai');
const factory = require('../dwp/factory');

describe('Unit Tests factory.js', () => {
  describe('protocol ids', () => {
    it('all protocols have different ids', () => {
      const ids = {};
      Object.entries(factory.Id).forEach(([key, value]) => {
        expect(ids[value]).to.be.undefined;
        ids[value] = key;
      });
    });
  });

  describe('encapsulate packet', () => {
    it('it works', () => {
      const mockPacket = { data: 'ok' };
      const id = 3;
      const encapsulated = factory.encapsulate(JSON.stringify(mockPacket), id);

      const beginIndex = encapsulated.search('/BEGIN/');
      expect(beginIndex).to.not.equal(-1);

      const endIndex = encapsulated.search('/END/', beginIndex);
      expect(endIndex).to.not.equal(-1);

      const rawPacket = encapsulated.substring(beginIndex + 7, endIndex);
      const packet = JSON.parse(rawPacket);

      expect(packet.data).to.equal('ok');
      expect(packet.header.id).to.equal(3);
    });
  });

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
