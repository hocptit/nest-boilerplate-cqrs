/**
 * Application routes with its version
 */

// Root
const articleRoot = 'article';
const learningRoot = 'learning';

// Api Versions
function v1(route) {
  return `/v1/${route}`;
}
export const routesV1 = {
  article: {
    root: v1(articleRoot),
    commands: {
      createArticle: {
        route: '',
        summary: 'Create Article',
      },
    },
    queries: {
      getArticleById: {
        route: ':id',
        summary: 'Get Article By Id',
      },
      getAll: {
        route: '',
        summary: 'Get All Articles',
      },
    },
  },

  learning: {
    root: v1(learningRoot),
    getLearning: {
      route: '',
      summary: 'Get Learning ',
    },
  },
};
