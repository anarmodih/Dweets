import React from 'react';
const Dashboard = React.lazy(() => import('../Dashboard/Dashboard'));
const ClientManagement = React.lazy(() => import('../ClientManagement/ClientManagement'));
const PricePlan = React.lazy(() => import('../PriceandPlan/Priceplan'));
const AddPlan = React.lazy(() => import('../PriceandPlan/AddPlan'));
const ViewDetails = React.lazy(() => import('../PriceandPlan/ViewDetails'));
const Reports = React.lazy(() => import('../Reports/Reports'));
const Page404 = React.lazy(() => import('../404Page/404Page'));
const Content = React.lazy(() => import('../Content/Content'));
const Email = React.lazy(() => import('../EmailManagement/EmailManagement'));
const SuperAdmin = React.lazy(() => import('../SuperAdmin/SuperAdmin'));
const AddSuperAdmin = React.lazy(() => import('../SuperAdmin/AddSuperAdmin'));
const AddClient = React.lazy(() => import('../ClientManagement/AddClient'));
const EditAdmin = React.lazy(() => import('../SuperAdmin/EditSuperAdmin'));
const FAQ = React.lazy(() => import('../Helpandfaq/Faq'));
const payment = React.lazy(() => import('../Paymenttranscation/paymenttranscation'));

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/faq', component: FAQ },
  { path: '/ClientManagement', component: ClientManagement },
  { path: '/view-details-plan/:id', component: ClientManagement },
  { path: '/edit-admin/:id', component: EditAdmin },
  { path: '/payment-transaction', component: payment },
  { path: '/priceplan', component: PricePlan },
  { path: '/add-plan', component: AddPlan },
  { path: '/view-details-plan', component: ViewDetails },
  { path: '/reports', component: Reports },
  { path: '/content', component: Content },
  { path: '/email', component: Email },
  { path: '/superadmin', component: SuperAdmin },
  { path: '/add-super-admin', component: AddSuperAdmin },
  { path: '/add-client', component: AddClient },
  { component: Page404 }
];


export default routes;