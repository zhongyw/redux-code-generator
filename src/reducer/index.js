var fs = require('fs');
var writeFile = require('./writeFile');

function createReducerFile(settings, outputFile) {
  console.log('REDUCERS GENERATED'.green);
  writeFile.writeRawText(`import { fromJS, Map } from 'immutable';\n`, settings.output['reducer_file']);
  writeFile.writeRawText('import {\n', settings.output['reducer_file']);
  settings.actions.forEach(action => {
      try {
          switch (action.type) {
              case 'loadList':
              case 'loadItem':
                  writeFile.createAPIReducerImportFile(action, settings.output['reducer_file']);
                  return;
              case 'transreducer':
              case 'crud':
                  writeFile.createCRUDReducerImportFile(action, settings.output['reducer_file']);
                  return;
              case 'default':
              case 'single':
              default:
                  writeFile.createSingleReducerImportFile(action, settings.output['reducer_file']);
                  return;
          }
      } catch (e) {
          console.log(e.toString().red);
      }
  });
  writeFile.writeRawText("\n} from './constants'\n\n", settings.output['reducer_file']);
  writeFile.writeRawText(`
const initialState = Map({
  data: [],
  error: '',
  requesting: false,
  requested: false
});\n
  `, settings.output['reducer_file'])
  writeFile.writeRawText(`
export function reducer(state = initialState, action) {
  switch (action.type) {
  `, settings.output['reducer_file'])


  settings.actions.forEach(action => {
    try {
      switch (action.type) {
      case 'loadList':
      case 'loadItem':
        writeFile.createAPIReducerFile(action, settings.output['reducer_file']);
        return;
      case 'transaction':
      case 'crud':
        writeFile.createCRUDReducerFile(action, settings.output['reducer_file']);
        console.log('\n');
        return;
      case 'default':
      case 'single':
      default:
        writeFile.createSingleReducerFile(action, settings.output['reducer_file']);
        console.log('\n');
        return;
      }
    } catch (e) {
      console.log(e.toString().red);
    }
  });
  writeFile.writeRawText(`
  default:
    return state;
  }
}`, settings.output['reducer_file'])
}
module.exports = createReducerFile;