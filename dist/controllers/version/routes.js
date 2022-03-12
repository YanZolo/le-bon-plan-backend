import { createRouter } from '../../utils/createRouter.js';
import { VersionController } from './versionController.js';
const versionController = new VersionController();
const routes = [{
  path: '/',
  method: 'GET',
  handler: versionController.get.bind(versionController)
}];
export default createRouter(routes);
//# sourceMappingURL=routes.js.map