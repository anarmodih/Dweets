import React from 'react';
// const Dashboard = React.lazy(() => import('../Dashboard/Dashboard'));
const Page404 = React.lazy(() => import('../404Page/404Page'));

const routes = [
  // { path: '/dashboard', component: Dashboard },
  { component: Page404 }
];


export default routes;