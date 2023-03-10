/**
 * Application routes with its version
 */

// Root
const articleRoot = 'article';

// Api Versions
function v1(route) {
    return `/v1/${route}`;
}
export const routesV1 = {
  article: {
    root: v1(articleRoot),
    commands: {
        create: ''
    },
    queries: {
      getById: '',
      getAll: ''
    },
  },
};
