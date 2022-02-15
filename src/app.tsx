import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import connect from 'redux-connect-decorator';
import AppRoutes from 'app-routers';
import { IRootState } from './reducers';
import { getUserInfo } from './reducers/authentication';
import Loading from "components/Loading/Loading";

// @connect(
//   ({ authentication }: IRootState) => ({
//     loading: authentication.loading,
//     isAuthenticated: authentication.isAuthenticated,
//     user: authentication.user,
//     sessionHasBeenFetched: authentication.sessionHasBeenFetched,
//   }),
//   {
//     getUserInfo
//   }
// )
export class App extends React.Component<any, any> {
  // state = {
  //   fetchSession: false
  // }
  async componentDidMount() {
    // this.setState({ fetchSession: true });
  }

  render() {
    // const { fetchSession } = this.state;
    return (
      <>
        {/* { fetchSession ?  */}
          <>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          {/* </> :
          <>
            <Loading /> */}
          </>
        {/* } */}
      </>
    );
  }
}

// export default App;
export default App; 
