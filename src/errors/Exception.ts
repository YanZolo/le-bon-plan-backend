import statuses from 'statuses';
import { constantCase } from 'change-case';
export default class Exception extends Error {
  name: string;
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.message = message || (statuses(status) as string);
    this.name = constantCase(statuses(status) as string);
    this.status = status;
  }
}

// throw new Exception(400) => {name: 'BAD_REQUEST', message: 'bad request', status: 400}
// throw new Exception(400, "Id is not correct") => {name: 'BAD_REQUEST', message: 'Id is not correct', status: 400}
