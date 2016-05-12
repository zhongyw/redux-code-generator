const expect = require('expect');
const generator = require('../src/action-generator');

describe('action generators', () => {
  const settings = {
    name: 'sample one',
    method_base: 'sampleOne',
    constant_name: 'SAMPLE_ONE',
    grouped_method: 'getSampleOneData',
    fetch_api_method: 'fetchSampleOneData',
    api_method: 'getSampleOne'
  };

  describe('createRequestFunction', () => {
    it('generates a proper request function', () => {
      var generatedString = `
/**
 * Action generator for sample one request action
 * @return {object}         request action
 */
export function sampleOneRequestAction() {
  return {
    type: SAMPLE_ONE_REQUEST
  }
}`;
      expect(generator.createRequestFunction(settings)).toEqual(generatedString);
    });

  });

  describe('createSuccessFunction', () => {
    it('generates a proper success function', () => {
      var generatedString = `
/**
 * Action generator for sample one success action
 * @param  {object} data    API response
 * @return {object}         success action
 */
export function sampleOneSuccessAction(data) {
  return {
    type: SAMPLE_ONE_SUCCESS,
    data: data
  }
}`;
      expect(generator.createSuccessFunction(settings)).toEqual(generatedString);
    });
  });

  describe('createFailureFunction', () => {
    it('generates a proper failure function', () => {
      var generatedString = `
/**
 * Action generator for sample one failure action
 * @param  {string|object} error    error from API
 * @return {object}                 failure action
 */
export function sampleOneFailureAction(error) {
  return {
    type: SAMPLE_ONE_FAILURE,
    error: error
  }
}`;
      expect(generator.createFailureFunction(settings)).toEqual(generatedString);
    });
  });
});
