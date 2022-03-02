import Exception from "./Exception.js";

export default class NotFound extends Exception {
  constructor(message) {
    super(404, message);
  }
}
