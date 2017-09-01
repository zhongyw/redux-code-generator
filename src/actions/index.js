var fs = require('fs');
var writeFile = require('./writeFile');

function actionsController(settings) {
  console.log('Writing Actions'.green);
  writeFile.writeRawText('import {\n', settings.output['action_file']);
  settings.actions.forEach(action => {
      try {
          switch (action.type) {
              case 'loadList':
              case 'loadItem':
                  writeFile.createAPIActionImportFile(action, settings.output['action_file']);
                  return;
              case 'transaction':
              case 'crud':
                  writeFile.createCRUDActionImportFile(action, settings.output['action_file']);
                  return;
              case 'default':
              case 'single':
              default:
                  writeFile.createSingleActionImportFile(action, settings.output['action_file']);
                  return;
          }
      } catch (e) {
          console.log(e.toString().red);
      }
  });
  writeFile.writeRawText("\n} from './constants'\n\n", settings.output['action_file']);
  settings.actions.forEach(action => {
    try {
      switch (action.type) {
          case 'loadList':
          case 'loadItem':
            writeFile.createAPIActionFile(action, settings.output['action_file']);
            return;
          case 'transaction':
          case 'crud':
            writeFile.createCRUDActionFile(action, settings.output['action_file']);
            return;
          case 'default':
          case 'single':
          default:
            writeFile.createSingleActionFile(action, settings.output['action_file']);
            return;
          }
    } catch (e) {
      console.log(e.toString().red);
    }
  });
}

module.exports = actionsController;
