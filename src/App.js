import React from 'react';
import { Route, Switch } from 'react-router-dom';
const LoginPage = React.lazy(() => import('./Views/Login/Login'));
const SignupPage = React.lazy(() => import('./Views/Signup/Signuppage'));
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const DefaultLayout = React.lazy(() => import('./Views/DefaultLayout'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (

      <React.Suspense fallback={loading()} >
        <Switch>
          <Route exact path="/" name="Login Page" render={props => <LoginPage {...props} />} /> 
          <Route  path="/signup-page" name="Signup Page" render={props => <SignupPage {...props} />} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} /> 
        </Switch>
        </React.Suspense>
    

    );
  }
}

export default App;
