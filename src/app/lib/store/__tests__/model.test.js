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
});
