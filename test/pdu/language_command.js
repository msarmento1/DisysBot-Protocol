const { expect } = require('chai');

const factory = require('../../dwp/factory');

const languageCommand = require('../../dwp/pdu/language_command');
const getLanguageCommand = require('../../dwp/pdu/get_language_command');

describe('languageCommand and getLanguageCommand', () => {
  it('getLanguageCommand is correctly validated and encapsulated', () => {
    const data = {
      names: ['Python', 'Java', 'C++'],
    };
    const formattedData = JSON.parse(factory.expose(getLanguageCommand.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.GET_LANGUAGE_COMMAND
    });
  });

  it('getLanguageCommand correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(getLanguageCommand.format(data)));
    };
    const data = {};
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'names fields is undefined');
    data.names = 'Test';
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'names fields is not an array');
  });

  it('languageCommand is correctly validated and encapsulated', () => {
    const data = {
      languages: [{ name: 'Python' }, { name: 'Java' }, { name: 'C++' }],
    };
    const formattedData = JSON.parse(factory.expose(languageCommand.format(data)));
    expect(formattedData).to.deep.include(data);
    expect(formattedData.header).to.include({
      id: factory.Id.LANGUAGE_COMMAND
    });
  });

  it('languageCommand correctly throws with invalid objects', () => {
    const formattedData = (data) => {
      JSON.parse(factory.expose(languageCommand.format(data)));
    };
    const data = {
      languagexs: [{ test: 'Python' }, { name: 'Java' }, { name: 'C++' }],
    };
    expect(() => formattedData(undefined)).to.throw()
      .with.property('reason', 'no data was set');
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'languages fields is undefined');
    data.languages = 'Test';
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'languages fields is not an array');
    data.languages = data.languagexs;
    expect(() => formattedData(data)).to.throw()
      .with.property('reason', 'name field of a language is undefined');
  });
});
