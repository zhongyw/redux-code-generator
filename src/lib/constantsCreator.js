function readAction(action) {
  switch (action.type) {
    case 'api':
    return [`\n/* 加载${action.name} */`,
      `export const LOAD_${action.constant_name}='LOAD_${action.constant_name}';`,
      `export const LOAD_${action.constant_name}_SUCCESS='LOAD_${action.constant_name}_SUCCESS';`,
      `export const LOAD_${action.constant_name}_ERROR='LOAD_${action.constant_name}_ERROR';`
    ];
    case 'transaction':
    case 'crud':
      return [`\n/* 添加 ${action.name} */`,
        `export const ADD_${action.constant_name} = 'ADD_${action.constant_name}';`,
        `export const ADD_${action.constant_name}_SUCCESS = 'ADD_${action.constant_name}_SUCCESS';`,
        `export const ADD_${action.constant_name}_ERROR = 'ADD_${action.constant_name}_ERROR';`,
          `\n/* 修改 ${action.name} */`,
        `export const UPDATE_${action.constant_name} = 'UPDATE_${action.constant_name}';`,
        `export const UPDATE_${action.constant_name}_SUCCESS = 'UPDATE_${action.constant_name}_SUCCESS';`,
        `export const UPDATE_${action.constant_name}_ERROR = 'UPDATE_${action.constant_name}_ERROR';`,
          `\n/* 删除 ${action.name} */`,
        `export const DELETE_${action.constant_name} = 'DELETE_${action.constant_name}'`,
        `export const DELETE_${action.constant_name}_SUCCESS = 'DELETE_${action.constant_name}_SUCCESS';`,
        `export const DELETE_${action.constant_name}_ERROR = 'DELETE_${action.constant_name}_ERROR';`,
      ];
    case 'single':
    case 'default':
    default:
    return [`\n/* ${action.name} */`,`export const ${action.constant_name} = '${action.constant_name}';`];
  }
}

function createConstants(settings) {
  let constants = [];

  settings.actions.forEach(action => constants = constants.concat(readAction(action)));

  return constants;
}

module.exports = createConstants;
