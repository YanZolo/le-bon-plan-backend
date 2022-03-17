import statuses from 'statuses';
import { constantCase } from 'change-case';
export default class Exception extends Error {
  constructor(status, message) {
    super(message);
    this.message = message || statuses(status);
    this.name = constantCase(statuses(status));
    this.status = status;
  }

}
//# sourceMappingURL=Exception.js.map