'use strict';
const controllers = require('../controllers');

const userRoutes = [{
  method: 'POST',
  url: '/api/users',
  handler: controllers.users.create,
},
// {
//   method: 'GET',
//   url: '/api/blogs/:id',
//   handler: blogController.getBlog,
// },
// {
//   method: 'POST',
//   url: '/api/blogs',
//   handler: blogController.addBlog,
// },
// {
//   method: 'PUT',
//   url: '/api/blogs/:id',
//   handler: blogController.updateBlog,
// },
// {
//   method: 'DELETE',
//   url: '/api/blogs/:id',
//   handler: blogController.deleteBlog,
// },
];

module.exports = userRoutes;
