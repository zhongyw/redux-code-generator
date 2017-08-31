
function createActionImport(settings){
  return `import {
    LOAD_${settings['constant_name']}, 
    LOAD_${settings['constant_name']}_SUCCESS,
    LOAD_${settings['constant_name']}_ERROR,
    ADD_${settings['constant_name']},
    UPDATE_${settings['constant_name']},
    DELETE_${settings['constant_name']}
 } from './constants' 
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
 * Create action dispatcher function for action set
 * @param  {object} settings Action settings
 * @return {string}          Dispatcher function generated
 */
function createActionDispatcherFunction(settings) {
  const methodName = settings['grouped_method'] ? settings['grouped_method'] : `get${settings['method_base']}`;
  const fetchMethodName = settings['fetch_api_method'] ? settings['fetch_api_method'] : `fetch${settings['method_base']}`;

  return `/**
 * Action dispatcher for ${settings.name} action
 * @param  {object} args  settings for API
 * @return {object}       Promise from API
 */
export function ${methodName}(args) {
  return (dispatch) => {
    dispatch(${settings['method_base']}RequestAction());

    return ${fetchMethodName}(args)
      .then((res) => dispatch(${settings['method_base']}SuccessAction(res)))
      .catch((err) => dispatch(${settings['method_base']}FailureAction(err)));
  };
}\n`;
}

/**
 * Create fetch function for Redux API methods
 * @param  {object} settings Action settings
 * @return {string}          Fetch function generated
 */
function createApiFetchFunction(settings) {
  const methodName = settings['fetch_api_method'] ? settings['fetch_api_method'] : `fetch${settings['method_base']}`;

  return `/**
 * Fetch API for ${settings.name} action
 * @param  {object} args  settings for API
 * @return {object}       Promise from API
 */
function ${methodName}(args) {
  return api.actions.${settings['api_method']}.request();
}\n`;
}

/**
 * Creates full API action file
 * @param  {object} settings Action settings
 * @return {string}          file text as string
 */
function createFullAPIActionFile(settings) {
  const result =
    createRequestFunction(settings) + '\n' +
    createSuccessFunction(settings) + '\n' +
    createFailureFunction(settings) + '\n' ;
    // createActionDispatcherFunction(settings) + '\n' +
    // createApiFetchFunction(settings) + '\n';
  return result;
}

function createMiddleMethodBase(base) {
  return base.slice(0, 1).toUpperCase() + base.slice(1);
}

/**
 * Creates add action function as a string
 * @param  {object} settings Action settings
 * @return {string}          Add function generated
 */
function createAddActionFunction(settings) {
  const methodBase = createMiddleMethodBase(settings['method_base']);

  return `/**
 * 添加 ${settings.name} action
 */
export function add${methodBase}(payload) {
  return {
    type: ADD_${settings['constant_name']},
    payload
  };
}\n`;
}

/**
 * Creates update action function as a string
 * @param  {object} settings Action settings
 * @return {string}          Update function generated
 */
function createUpdateActionFunction(settings) {
  const methodBase = createMiddleMethodBase(settings['method_base']);

  return `/**
 * 修改 ${settings.name} action
 */
export function update${methodBase}(payload) {
  return {
    type: UPDATE_${settings['constant_name']},
    payload
  };
}\n`;
}

/**
 * Creates delete action function as a string
 * @param  {object} settings Action settings
 * @return {string}          Delete function generated
 */
function createDeleteActionFunction(settings) {
  const methodBase = createMiddleMethodBase(settings['method_base']);

  return `/**
 * 删除 ${settings.name} action
 */
export function delete${methodBase}(payload) {
  return {
    type: DELETE_${settings['constant_name']},
    payload
  };
}\n`;
}

/**
 * Creates full CRUD action file
 * @param  {object} settings Action settings
 * @return {string}          file text as string
 */
function createFullCRUDActionFile(settings) {
  return createAddActionFunction(settings) + '\n' +
    createUpdateActionFunction(settings) + '\n' +
    createDeleteActionFunction(settings) + '\n';
}

/**
 * Creates single action function as a string
 * @param  {object} settings Action settings
 * @return {string}          Single function generated
 */
function createSingleAction(settings) {
  return `/**
 * Action creator for ${settings.name}
 * @param  {object} data    Data for ${settings.name} action
 * @return {object}         action for ${settings.name}
 */
export function ${settings.method}(data) {
  return {
    type: types.${settings.constant},
    data: data
  };
}\n`;
}

module.exports = {
  createActionImport: createActionImport,
  createRequestFunction: createRequestFunction,
  createSuccessFunction: createSuccessFunction,
  createFailureFunction: createFailureFunction,
  createActionDispatcherFunction: createActionDispatcherFunction,
  createApiFetchFunction: createApiFetchFunction,
  createFullAPIActionFile: createFullAPIActionFile,
  createAddActionFunction: createAddActionFunction,
  createUpdateActionFunction: createUpdateActionFunction,
  createDeleteActionFunction: createDeleteActionFunction,
  createFullCRUDActionFile: createFullCRUDActionFile,
  createSingleAction: createSingleAction
};
