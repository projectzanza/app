import Model from '../model';

describe('Model', () => {
  it('should set defaults', () => {
    class ExtendedModel extends Model {}
    ExtendedModel.defaults = {
      title: title => title || '',
      text: text => text || '',
      thing: text => text || '',
    };

    const em = new ExtendedModel({ title: 'a title', text: undefined, thing: null });

    expect(em.title).toEqual('a title');
    expect(em.text).toEqual('');
    expect(em.thing).toEqual('');
  });

  describe('convertHashToBool', () => {
    it('should convert only supplied keys to boolean values', () => {
      const stringHash = { a: true, b: 'true', c: 'false', d: false, e: 'true', f: '', g: ''};
      const boolHash = Model.convertHashToBool(stringHash, ['a', 'b', 'c', 'd', 'f']);
      expect(boolHash).toEqual({ a: true, b: true, c: false, d: false, e: 'true', f: false, g: ''});
    })
  });
});
