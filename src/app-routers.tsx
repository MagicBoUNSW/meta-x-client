import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import RtlLayout from 'layouts/RTL.js';
import AuthLayout from 'layouts/Auth.js';
import AdminLayout from 'layouts/Admin.js';
import UserLayout from 'layouts/User';
import SettingLayout from 'layouts/Setting';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route path="/rtl" component={RtlLayout} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Route path="/user" component={UserLayout} />
      <Route path="/setting" component={SettingLayout} />
      <Redirect from="/" to="/user/tables" />
    </Switch>
  </div>
);

export default Routes;
