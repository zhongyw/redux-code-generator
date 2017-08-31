/**
 * Generate API reducer function
 * @param  {object} settings reducer settings
 * @return {string}          generated api reducer
 */
function createAPIReducer(settings) {

  return `
import { LOAD_${settings['constant_name']}, ${settings['constant_name']}_SUCCESS, ${settings['constant_name']}_ERROR } from './contstants';
const initialState = {
    data: [],
    error: '',
    requesting: false,
    requested: false
};

export function ${settings.reducer}(state = initialState, action) {
  switch (action.type) {
  case ${settings['constant_name']}:
    return Object.assign({}, state, {
      requesting: true,
      requested: false
    });
  case ${settings['constant_name']}_SUCCESS:
    return Object.assign({}, state, {
      requesting: false,
      requested: true,
      data: state.data.concat(action.data)
    });
  case ${settings['constant_name']}_FAILURE:
    return Object.assign({}, state, {
      requesting: false,
      requested: true,
      error: action.error
    });
  default:
    return state;
  }
}`;
}

module.exports = {
  createAPIReducer: createAPIReducer
};
