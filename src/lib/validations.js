const validSettings = settings => !!settings;
const validSettingsType = settings => typeof settings === 'object';
const validSettingsKeys = settings => !!settings.actions && !!settings.output;
const validActionSettingsType = actions => Array.isArray(actions);
const validActionSettingsKeys = action => !!action.name && !!action.reducer;
const validActionSettingsProperTypes = action => {
  if (action.type) {
    return ['loadList', 'loadItem', 'transaction', 'crud', 'single', 'default'].includes(action.type)
  } else {
    return true;
  }
}

module.exports = {
  validSettings: validSettings,
  validSettingsType: validSettingsType,
  validSettingsKeys: validSettingsKeys,
  validActionSettingsType: validActionSettingsType,
  validActionSettingsKeys: validActionSettingsKeys,
  validActionSettingsProperTypes: validActionSettingsProperTypes
}
