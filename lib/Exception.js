'use strict';
class Exception extends Error {
  constructor(data) {
    super();
    const requiredFields = ['code', 'fields', 'message'];
    requiredFields.forEach(key => {
      console.log(data[key]);
      if (!data[key]) throw new Error(`${key.toUpperCase} REQUIRED`);
      console.log(this[key]);
      this[key] = data[key];
      console.log(this[key]);
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
