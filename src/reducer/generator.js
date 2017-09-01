/**
 * Generate API reducer function
 * @param  {object} settings reducer settings
 * @return {string}          generated api reducer
 */
function createAPIReducer(settings) {

  return `  /**
    * 加载${settings.name} reducer
    */
    case LOAD_${settings['constant_name']}:
      return state;
    case LOAD_${settings['constant_name']}_SUCCESS:
      return state.set('${settings['method_base']}', action.payload.data);
    case LOAD_${settings['constant_name']}_ERROR:
      return state;
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
 * Creates full API reducer file
 * @param  {object} settings Reducer settings
 * @return {string}          file text as string
 */
function createFullAPIReducerFile(settings) {
    const result =
        createRequestFunction(settings) + '\n' +
        createSuccessFunction(settings) + '\n' +
        createFailureFunction(settings) + '\n' ;
    // createReducerDispatcherFunction(settings) + '\n' +
    // createApiFetchFunction(settings) + '\n';
    return result;
}
function createFullAPIReducerImportFile(settings) {
    const result =`
    /* ${settings['name']} */
    LOAD_${settings['constant_name']}, 
    LOAD_${settings['constant_name']}_SUCCESS,
    LOAD_${settings['constant_name']}_ERROR,
    `
    return result;
}

function createMiddleMethodBase(base) {
    return base.slice(0, 1).toUpperCase() + base.slice(1);
}

/**
 * Creates add reducer function as a string
 * @param  {object} settings Reducer settings
 * @return {string}          Add function generated
 */
function createAddReducerFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);

    return `  /**
    * 添加${settings.name} reducer
    */
    case ADD_${settings['constant_name']}:
      return state;
    case ADD_${settings['constant_name']}_SUCCESS:
      return state;
    case ADD_${settings['constant_name']}_ERROR:
      return state;`;
}

/**
 * Creates update reducer function as a string
 * @param  {object} settings Reducer settings
 * @return {string}          Update function generated
 */
function createUpdateReducerFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);

    return `    /**
    * 修改${settings.name} reducer
    */
    case UPDATE_${settings['constant_name']}:
      return state;
    case UPDATE_${settings['constant_name']}_SUCCESS:
      return state;
    case UPDATE_${settings['constant_name']}_ERROR:
      return state;`;
}

/**
 * Creates delete reducer function as a string
 * @param  {object} settings Reducer settings
 * @return {string}          Delete function generated
 */
function createDeleteReducerFunction(settings) {
    const methodBase = createMiddleMethodBase(settings['method_base']);

    return `    /**
     * 删除${settings.name} reducer
     */
    case DELETE_${settings['constant_name']}:
        return state;
    case DELETE_${settings['constant_name']}_SUCCESS:
        return state;
    case DELETE_${settings['constant_name']}_ERROR:
        return state;`;
}

/**
 * Creates full CRUD reducer file
 * @param  {object} settings Reducer settings
 * @return {string}          file text as string
 */
function createFullCRUDReducerFile(settings) {
    return createAddReducerFunction(settings) + '\n' +
        createUpdateReducerFunction(settings) + '\n' +
        createDeleteReducerFunction(settings) + '\n';
}
function createFullCRUDReducerImportFile(settings) {
    return `
    /* 添加${settings['name']} */
    ADD_${settings['constant_name']},
    ADD_${settings['constant_name']}_SUCCESS,
    ADD_${settings['constant_name']}_ERROR,
    
    /* 修改${settings['name']} */
    UPDATE_${settings['constant_name']},
    UPDATE_${settings['constant_name']}_SUCCESS,
    UPDATE_${settings['constant_name']}_ERROR,
    
    /* 删除${settings['name']} */
    DELETE_${settings['constant_name']},
    DELETE_${settings['constant_name']}_SUCCESS,
    DELETE_${settings['constant_name']}_ERROR,
    `;
}

/**
 * Creates single reducer function as a string
 * @param  {object} settings Reducer settings
 * @return {string} Single function generated
 */
function createSingleReducer(settings) {
    return `    /**
     *  ${settings.name} reducer
     */
    case ${settings['constant_name']}:
        return state;
`;
}

function createSingleReducerImport(settings) {
    return `
    /* ${settings['name']} */
    ${settings['constant_name']},
    `;
}

module.exports = {
  createAPIReducer: createAPIReducer,
  createFullAPIReducerFile: createFullAPIReducerFile,
  createFullAPIReducerImportFile: createFullAPIReducerImportFile,
  createAddReducerFunction: createAddReducerFunction,
  createUpdateReducerFunction: createUpdateReducerFunction,
  createDeleteReducerFunction: createDeleteReducerFunction,
  createFullCRUDReducerFile: createFullCRUDReducerFile,
  createFullCRUDReducerImportFile: createFullCRUDReducerImportFile,
  createSingleReducer: createSingleReducer,
  createSingleReducerImport: createSingleReducerImport
};
