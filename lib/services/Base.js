'use strict';

exports.__esModule = true;

const _livr = require('livr');

const _livr2 = _interopRequireDefault(_livr);

const _Exception = require('./Exception');

const _Exception2 = _interopRequireDefault(_Exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function() { const gen = fn.apply(this, arguments); return new Promise((resolve, reject) => { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(value => { step('next', value); }, err => { step('throw', err); }); } } return step('next'); }); }; }

class ServiceBase {
  constructor(args) {
    if (!args.context) throw new Error('CONTEXT_REQUIRED');
    this.context = args.context;
  }

  run(params) {
    const _this = this;

    return _asyncToGenerator(function* () {
      if (typeof _this.checkPermissions === 'function') {
        yield _this.checkPermissions();
      }

      const cleanParams = yield _this.validate(params);

      return _this.execute(cleanParams);
    })();
  }

  validate(data) {
    // Feel free to override this method if you need dynamic validation

    const validator = this.constructor.cachedValidator || new _livr2.default.Validator(this.constructor.validationRules).prepare();

    /* eslint-disable-next-line */
        this.constructor.cachedValidator = validator;

    return this._doValidationWithValidator(data, validator);
  }

  doValidation(data, rules) {
    // You can use this in overriden "validate" method
    const validator = new _livr2.default.Validator(rules).prepare();

    return this._doValidationWithValidator(data, validator);
  }

  _doValidationWithValidator(data, validator) {
    return _asyncToGenerator(function* () {
      const result = validator.validate(data);

      if (!result) {
        const exception = new _Exception2.default({
          code: 'FORMAT_ERROR',
          fields: validator.getErrors(),
        });

        throw exception;
      }

      return result;
    })();
  }
}
exports.default = ServiceBase;
