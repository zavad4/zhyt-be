'use strict';
class ServiceBase {
  constructor(args) {
    if (!args.context) throw new Error('CONTEXT_REQUIRED');
    this.context = args.context;
  }

  run(params) {
    // TODO: validation
    // const validatedData = this.validate(params);
    // return this.execute(validatedData);
    return this.execute(params);
  }
}
module.exports = ServiceBase;
