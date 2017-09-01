var fs = require('fs');
var writeFile = require('./writeFile');

function createSagaFile(settings, outputFile) {
  console.log('SAGAS GENERATED'.green);

  writeFile.writeRawText(`import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';\n`, settings.output['sagas_file']);
  writeFile.writeRawText(`import { fromJS, Map } from 'immutable';\n`, settings.output['sagas_file']);
  writeFile.writeRawText('import {\n', settings.output['sagas_file']);
  settings.actions.forEach(action => {
      try {
          switch (action.type) {
              case 'loadList' || 'loadItem':
                  writeFile.createAPISagaImportConstantsFile(action, settings.output['sagas_file']);
                  return;
              case 'transsaga':
              case 'crud':
                  writeFile.createCRUDSagaImportConstantsFile(action, settings.output['sagas_file']);
                  return;
              case 'default':
              case 'single':
              default:
                  writeFile.createSingleSagaConstantsImportConstantsFile(action, settings.output['sagas_file']);
                  return;
          }
      } catch (e) {
          console.log(e.toString().red);
      }
  });
  writeFile.writeRawText("\n} from './constants'\n\n", settings.output['sagas_file']);

    writeFile.writeRawText('import {\n', settings.output['sagas_file']);
    settings.actions.forEach(action => {
        try {
            switch (action.type) {
                case 'loadList' || 'loadItem':
                    writeFile.createAPISagaImportActionsFile(action, settings.output['sagas_file']);
                    return;
                case 'transsaga':
                case 'crud':
                    writeFile.createCRUDSagaImportActionsFile(action, settings.output['sagas_file']);
                    return;
                case 'default':
                case 'single':
                default:
                    writeFile.createSingleSagaConstantsImportActionsFile(action, settings.output['sagas_file']);
                return;
    }
} catch (e) {
        console.log(e.toString().red);
    }
});
    writeFile.writeRawText("\n} from './actions'\n\n", settings.output['sagas_file']);
  writeFile.writeRawText("\nimport { API } from 'config/api';", settings.output['sagas_file']);
  writeFile.writeRawText("\nimport request from 'utils/request';", settings.output['sagas_file']);


  settings.actions.forEach(action => {
    try {
      switch (action.type) {
      case 'loadList':
      case 'loadItem':
        writeFile.createAPISagaFile(action, settings.output['sagas_file']);
        return;
      case 'transaction':
      case 'crud':
        writeFile.createCRUDSagaFile(action, settings.output['sagas_file']);
        console.log('\n');
        return;
      case 'default':
      case 'single':
      default:
        writeFile.createSingleSagaFile(action, settings.output['sagas_file']);
        console.log('\n');
        return;
      }
    } catch (e) {
      console.log(e.toString().red);
    }
  });
writeFile.writeRawText(`\nexport default [`, settings.output['sagas_file']);
    settings.actions.forEach(action => {
        const methodBase = createMiddleMethodBase(action['method_base']);
        try {
            switch (action.type) {
            case 'loadList':
            case 'loadItem':
                writeFile.writeRawText(`\n  watchLoad${methodBase},`, settings.output['sagas_file']);
                return;
            case 'transaction':
            case 'crud':
                writeFile.writeRawText(`\n  watchAdd${methodBase},`, settings.output['sagas_file']);
                writeFile.writeRawText(`\n  watchUpdate${methodBase},`, settings.output['sagas_file']);
                writeFile.writeRawText(`\n  watchDelete${methodBase},`, settings.output['sagas_file']);
                return;
            case 'default':
            case 'single':
            default:
                writeFile.writeRawText(`\n  watch${methodBase},`, settings.output['sagas_file']);
                console.log('\n');
                return;
            }
            } catch (e) {
                console.log(e.toString().red);
            }
            });
    writeFile.writeRawText(`\n]`, settings.output['sagas_file']);

}
function createMiddleMethodBase(base) {
    return base.slice(0, 1).toUpperCase() + base.slice(1);
}
module.exports = createSagaFile;