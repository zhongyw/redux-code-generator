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
const apiReducerTypes = [
  'RequestReducer',
  'SuccessReducer',
  'FailureReducer',
  // 'DispatcherFunction',
  // 'FetchFunction'
];

const createAPIReducerFile = createFileFunctionTemplate(generators.createAPIReducer, apiReducerTypes);
const createAPIReducerImportFile = createFileFunctionTemplate(generators.createFullAPIReducerImportFile, apiReducerTypes);
/**
 * CRUD operations
 * @type {Array}
 */
const crudReducerTypes = [
  'AddReducer',
  'UpdateReducer',
  'DeleteReducer'
];
const createCRUDReducerFile = createFileFunctionTemplate(generators.createFullCRUDReducerFile, crudReducerTypes, { reverse: true });
const createCRUDReducerImportFile = createFileFunctionTemplate(generators.createFullCRUDReducerImportFile, crudReducerTypes, { reverse: true });

const createSingleReducerFile = createFileFunctionTemplate(generators.createSingleReducer);
const createSingleReducerImportFile = createFileFunctionTemplate(generators.createSingleReducerImport);


module.exports = {
  writeRawText: writeRawText,
  createAPIReducerFile: createAPIReducerFile,
  createAPIReducerImportFile: createAPIReducerImportFile,
  createCRUDReducerFile: createCRUDReducerFile,
  createCRUDReducerImportFile: createCRUDReducerImportFile,
  createSingleReducerFile: createSingleReducerFile,
  createSingleReducerImportFile: createSingleReducerImportFile
}
