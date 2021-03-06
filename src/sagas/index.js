var fs = require('fs');
var writeFile = require('./writeFile');

function createSagaFile(settings, outputFile) {
  console.log('SAGAS GENERATED'.green);

  writeFile.writeRawText(`import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { fromJS, Map } from 'immutable';
import {
  commonError
} from 'containers/App/actions';
import { API } from 'config/api';
import request from 'utils/request';
`, settings.output['sagas_file']);
  writeFile.writeRawText('import {\n', settings.output['sagas_file']);
  settings.actions.forEach(action => {
      try {
          switch (action.type) {
              case 'api':
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
                case 'api':
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
  writeFile.writeRawText(`\n} from './actions';`, settings.output['sagas_file']);



  settings.actions.forEach(action => {
    try {
      switch (action.type) {
      case 'api':
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
writeFile.writeRawText(`\nexport default [\n`, settings.output['sagas_file']);
    let resultStr = '';
    settings.actions.forEach(action => {
        const methodBase = createMiddleMethodBase(action['method_base']);
        try {
            switch (action.type) {
            case 'api':
              resultStr += `  /* 监控 ${action.name} action */
  watchLoad${methodBase},\n`
              return;
            case 'transaction':
            case 'crud':
              resultStr += `  /* 监控 添加${action.name} action */
  watchAdd${methodBase},
  /* 监控 修改${action.name} action */
  watchUpdate${methodBase},
  /* 监控 删除${action.name} action */
  watchDelete${methodBase},\n`
              return;
            case 'default':
            case 'single':
            default:
              resultStr += `/* 监控 ${action.name} action */
  watch${methodBase},
              `;
              console.log('\n');
              return;
            }
        } catch (e) {
            console.log(e.toString().red);
        }
    });
    writeFile.writeRawText(`${resultStr}\n]`, settings.output['sagas_file']);

}
function createMiddleMethodBase(base) {
    return base.slice(0, 1).toUpperCase() + base.slice(1);
}
module.exports = createSagaFile;
