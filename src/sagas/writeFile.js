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
            console.log('Something went wrong trying to create these actions'.red);
        });
    }
}

/**
 * API operations
 * @type {Array}
 */
const apiSagaTypes = [
  'RequestSaga',
  'SuccessSaga',
  'FailureSaga',
  // 'DispatcherFunction',
  // 'FetchFunction'
];

const createAPISagaFile = createFileFunctionTemplate(generators.createAPISaga, apiSagaTypes);
const createAPISagaImportConstantsFile = createFileFunctionTemplate(generators.createFullAPISagaImportConstantsFile, apiSagaTypes);
const createAPISagaImportActionsFile = createFileFunctionTemplate(generators.createFullAPISagaImportActionsFile, apiSagaTypes);
/**
 * CRUD operations
 * @type {Array}
 */
const crudSagaTypes = [
  'AddSaga',
  'UpdateSaga',
  'DeleteSaga'
];
const createCRUDSagaFile = createFileFunctionTemplate(generators.createFullCRUDSagaFile, crudSagaTypes, { reverse: true });
const createCRUDSagaImportConstantsFile = createFileFunctionTemplate(generators.createFullCRUDSagaImportConstantsFile, crudSagaTypes, { reverse: true });
const createCRUDSagaImportActionsFile = createFileFunctionTemplate(generators.createFullCRUDSagaImportActionsFile, crudSagaTypes, { reverse: true });

const createSingleSagaFile = createFileFunctionTemplate(generators.createSingleSaga);
const createSingleSagaConstantsImportConstantsFile = createFileFunctionTemplate(generators.createSingleSagaConstantsImport);
const createSingleSagaActionsImport = createFileFunctionTemplate(generators.createSingleSagaActionsImport);


module.exports = {
  writeRawText: writeRawText,
  createAPISagaFile: createAPISagaFile,
  createAPISagaImportConstantsFile: createAPISagaImportConstantsFile,
  createAPISagaImportActionsFile: createAPISagaImportActionsFile,
  createCRUDSagaFile: createCRUDSagaFile,
  createCRUDSagaImportConstantsFile: createCRUDSagaImportConstantsFile,
  createCRUDSagaImportActionsFile: createCRUDSagaImportActionsFile,
  createSingleSagaFile: createSingleSagaFile,
  createSingleSagaConstantsImportConstantsFile: createSingleSagaConstantsImportConstantsFile,
  createSingleSagaConstantsImportActionsFile: createSingleSagaActionsImport
}
