'use strict';
module.exports = function hideData(data) {
  if (typeof data === 'object') {
    const sanitizedObject = {};

    for (const key of Object.keys(data)) {
      if (key.match(/password/gi)) sanitizedObject[key] = '**HIDDEN**';
      else if (key === 'data') sanitizedObject[key] = hideData(data[key]);
      else sanitizedObject[key] = data[key];
    }

    return sanitizedObject;
  }

  return data;
};
