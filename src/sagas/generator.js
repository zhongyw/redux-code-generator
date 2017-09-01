/**
 * Generate API saga function
 * @param  {object} settings saga settings
 * @return {string}          generated api saga
 */
function createAPISaga(settings) {
  const methodBase = createMiddleMethodBase(settings['method_base']);
  return `\n/**
 * ${settings.name} action
 */
export function load${methodBase}Data(action) {
  try {

    const result = yield call(request, API.get${methodBase}, {

      body: action.payload
    });
    if(result.success){
      yield put(load${methodBase}Success(result));
    }
  } catch (err){
    yield put(commonError(err));
  }
}
export function* watchLoad${methodBase}() {
  const watcher = yield takeLatest(LOAD_${settings['constant_name']}, load${methodBase}Data);
}
`;
}
/**
 * Create request function for an action
 * @param  {object} settings Action settings
 * @return {string}          Request function generated
 */
function createRequestFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);
    return `/**
 * ${settings.name} action
 */
export function load${methodBase}(payload) {
  return {
    type: LOAD_${settings['constant_name']},
    payload
  };
}\n`;
}

/**
 * Create success function for an action
 * @param  {object} settings Action settings
 * @return {string}          Success function generated
 */
function createSuccessFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);
    return `
export function load${methodBase}Success(payload) {
  return {
    type: LOAD_${settings['constant_name']}_SUCCESS,
    payload
  };
}\n`;
}

/**
 * Create failure function for an action
 * @param  {object} settings Action settings
 * @return {string}          Failure function generated
 */
function createFailureFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);
    return `
export function load${methodBase}Error(error) {
  return {
    type: LOAD_${settings['constant_name']}_ERROR,
    error
  };
}\n`;
}
/**
 * Creates full API saga file
 * @param  {object} settings Saga settings
 * @return {string}          file text as string
 */
function createFullAPISagaFile(settings) {
    const result =
        createRequestFunction(settings) + '\n' +
        createSuccessFunction(settings) + '\n' +
        createFailureFunction(settings) + '\n' ;
    // createSagaDispatcherFunction(settings) + '\n' +
    // createApiFetchFunction(settings) + '\n';
    return result;
}
function createMiddleMethodBase(base) {
    return base.slice(0, 1).toUpperCase() + base.slice(1);
}
function createFullAPISagaImportConstantsFile(settings) {
    const result =`
    /* ${settings['name']} */
    LOAD_${settings['constant_name']}, 
    `
    return result;
}

function createFullAPISagaImportActionsFile(settings) {
    const method_base = createMiddleMethodBase(settings['method_base']);
    const result =`
    /* 加载${settings['name']} action*/
    load${method_base},
    load${method_base}Success,
    load${method_base}Error,
    `
    return result;
}

function createMiddleMethodBase(base) {
    return base.slice(0, 1).toUpperCase() + base.slice(1);
}

/**
 * Creates add saga function as a string
 * @param  {object} settings Saga settings
 * @return {string}          Add function generated
 */
function createAddSagaFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);

    return `/**
* 添加${settings.name} saga
*/
export function add${methodBase}Data(action) {
  try {

    const result = yield call(request, API.add${methodBase}, {

      body: action.payload
    });
    if(result.success){
      yield put(add${methodBase}Success(result));
    }
  } catch (err){
    yield put(commonError(err));
  }
}
export function* watchAdd${methodBase}() {
  const watcher = yield takeLatest(ADD_${settings['constant_name']}, add${methodBase}Data);
}
`;
}

/**
 * Creates update saga function as a string
 * @param  {object} settings Saga settings
 * @return {string}          Update function generated
 */
function createUpdateSagaFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);

    return `/**
* 修改${settings.name} saga
*/
export function update${methodBase}Data(action) {
  try {

    const result = yield call(request, API.update${methodBase}, {

      body: action.payload
    });
    if(result.success){
      yield put(update${methodBase}Success(result));
    }
  } catch (err){
    yield put(commonError(err));
  }
}
export function* watchUpdate${methodBase}() {
  const watcher = yield takeLatest(UPDATE_${settings['constant_name']}, update${methodBase}Data);
}`;
}

/**
 * Creates delete saga function as a string
 * @param  {object} settings Saga settings
 * @return {string}          Delete function generated
 */
function createDeleteSagaFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);

    return `/**
 * 删除${settings.name} saga
 */
export function delete${methodBase}Data(action) {
  try {

    const result = yield call(request, API.delete${methodBase}, {

      body: action.payload
    });
    if(result.success){
      yield put(delete${methodBase}Success(result));
    }
  } catch (err){
    yield put(commonError(err));
  }
}
export function* watchDelete${methodBase}() {
  const watcher = yield takeLatest(DELETE_${settings['constant_name']}, delete${methodBase}Data);
}`;
}

/**
 * Creates full CRUD saga file
 * @param  {object} settings Saga settings
 * @return {string}          file text as string
 */
function createFullCRUDSagaFile(settings) {
    return createAddSagaFunction(settings) + '\n' +
        createUpdateSagaFunction(settings) + '\n' +
        createDeleteSagaFunction(settings) + '\n';
}
function createFullCRUDSagaImportConstantsFile(settings) {
    return `
    /* 添加${settings['name']} */
    ADD_${settings['constant_name']},
    
    /* 修改${settings['name']} */
    UPDATE_${settings['constant_name']},
    
    /* 删除${settings['name']} */
    DELETE_${settings['constant_name']},
    `;
}

function createFullCRUDSagaImportActionsFile(settings) {
    const method_base = createMiddleMethodBase(settings['method_base']);
    return `
    /* 添加${settings['name']} action*/
    add${method_base},
    add${method_base}Success,
    add${method_base}Error,
    
    /* 修改${settings['name']} action*/
    update${method_base},
    update${method_base}Success,
    update${method_base}Error,
    
    /* 删除${settings['name']} action*/
    delete${method_base},
    delete${method_base}Success,
    delete${method_base}Error, 
    `;
}

/**
 * Creates single saga function as a string
 * @param  {object} settings Saga settings
 * @return {string} Single function generated
 */
function createSingleSaga(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);
    return `/**
 *  ${settings.name} saga
 */
export function ${methodBase}Data(action) {
  try {

    const result = yield call(request, API.${methodBase}, {

      body: action.payload
    });
    if(result.success){
      yield put(delete${methodBase}Success(result));
    }
  } catch (err){
    yield put(commonError(err));
  }
}
export function* watch${methodBase}() {
  const watcher = yield takeLatest(${settings['constant_name']}, ${methodBase}Data);
}`;
}

function createSingleSagaConstantsImport(settings) {
    return `
    /* ${settings['name']} */
    ${settings['constant_name']},
    `;
}

function createSingleSagaActionsImport(settings) {
    return `
    /* ${settings['name']} action*/
    ${settings['method_base']},
    `;
}

module.exports = {
  createAPISaga: createAPISaga,
  createFullAPISagaFile: createFullAPISagaFile,
  createFullAPISagaImportConstantsFile: createFullAPISagaImportConstantsFile,
  createFullAPISagaImportActionsFile: createFullAPISagaImportActionsFile,
  createAddSagaFunction: createAddSagaFunction,
  createUpdateSagaFunction: createUpdateSagaFunction,
  createDeleteSagaFunction: createDeleteSagaFunction,
  createFullCRUDSagaFile: createFullCRUDSagaFile,
  createFullCRUDSagaImportConstantsFile: createFullCRUDSagaImportConstantsFile,
  createFullCRUDSagaImportActionsFile: createFullCRUDSagaImportActionsFile,
  createSingleSaga: createSingleSaga,
  createSingleSagaConstantsImport: createSingleSagaConstantsImport,
  createSingleSagaActionsImport: createSingleSagaActionsImport
};
