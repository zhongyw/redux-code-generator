var fs = require('fs');
var generators = require('./generator');

function writeRawText(text, outputFile){
    let writeStream = fs.createWriteStream(outputFile, { flags: 'a' });

    try {
        writeStream.write(text);
    } catch (e) {
        console.log('error', e);
    }

    writeStream.end();
}
function createFileFunctionTemplate(generator, actionTypes, options = {}) {
  return (settings, outputFile) => {
    // Create write stream that will create or append a file
    let writeStream = fs.createWriteStream(outputFile, { flags: 'a' });

    try {
      const generatedActionFile = generator(settings);
      writeStream.write(generatedActionFile);
    } catch (e) {
      console.log('error', e);
    }

    writeStream.end();
    writeStream.on('finish', () => {
      // On finish, write out list of actions created
      if (settings['method_base']) {
        console.log(' ' + settings['method_base']);
      } else if (settings.method) {
        console.log(' ' + settings.method);
      }

      if (actionTypes) {
        actionTypes.forEach(actionType => {
          if (options.reverse) {
            console.log('   ✓ '.green + `${actionType}${settings['method_base']}`.gray);
          } else {
            console.log('   ✓ '.green + `${settings['method_base']}${actionType}`.gray);
          }
        });
      } else {
        console.log('   ✓ '.green + `${settings['method']}`.gray);
      }

      console.log('\n');
    });

    writeStream.on('error', () => {
      if (settings['method_base']) {
        console.log(' ' + settings['method_base']);
      } else if (settings.method) {
        console.log(' ' + settings.method);
      }
      console.log('   Something went wrong trying to create these actions'.red);
    });
  }
}

/**
 * API operations
 * @type {Array}
 */
const apiActionTypes = [
  'RequestAction',
  'SuccessAction',
  'FailureAction',
  // 'DispatcherFunction',
  // 'FetchFunction'
];
const createActionImport = createFileFunctionTemplate(generators.createActionImport, apiActionTypes);
/**
 * Create or append an action file with API actions
 * @param  {[type]} settings   Action settings
 * @param  {[type]} outputFile File destination
 */
const createAPIActionFile = createFileFunctionTemplate(generators.createFullAPIActionFile, apiActionTypes);

const createAPIActionImportFile = createFileFunctionTemplate(generators.createFullAPIActionImportFile, apiActionTypes);

/**
 * CRUD operations
 * @type {Array}
 */
const crudActionTypes = [
  'AddAction',
  'UpdateAction',
  'DeleteAction'
];

/**
 * Create or append an action file with CRUD operation actions
 * @param  {[type]} settings   Action settings
 * @param  {[type]} outputFile File destination
 */
const createCRUDActionFile = createFileFunctionTemplate(generators.createFullCRUDActionFile, crudActionTypes, { reverse: true });
const createCRUDActionImportFile = createFileFunctionTemplate(generators.createFullCRUDActionImportFile, crudActionTypes, { reverse: true });

/**
 * Create or append an action file with a single action
 * @param  {[type]} settings   Action settings
 * @param  {[type]} outputFile File destination
 */
const createSingleActionFile = createFileFunctionTemplate(generators.createSingleAction);
const createSingleActionImportFile = createFileFunctionTemplate(generators.createSingleActionImport);

const createRawTextFile = createFileFunctionTemplate(generators.createRawText)

module.exports = {
  writeRawText: writeRawText,
  createRawTextFile: createRawTextFile,
  createActionImport: createActionImport,
  createAPIActionFile: createAPIActionFile,
  createAPIActionImportFile: createAPIActionImportFile,
  createCRUDActionFile: createCRUDActionFile,
  createCRUDActionImportFile: createCRUDActionImportFile,
  createSingleActionFile: createSingleActionFile,
  createSingleActionImportFile: createSingleActionImportFile
};
