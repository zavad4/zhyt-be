'use strict';
class Exception extends Error {
  constructor(data) {
    super();
    const requiredFields = ['code', 'fields', 'message'];
    requiredFields.forEach(key => {
      if (!data[key]) throw new Error(`${key.toUpperCase()} REQUIRED`);
      this[key] = data[key];
    });

  }

  toSend() {
    return {
      code: this.code,
      message: this.message,
      fields: this.fields,
    };
  }
}

module.exports = Exception;
