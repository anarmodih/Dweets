import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import LocalStorage from '../../Api/LocalStorage';
import routes from './Routes';
import axios from 'axios';
import Api from '../../Api/ApiUtils';
import logoSecon from "../../assets/images/logo.png";
import home from "../../assets/images/home.png";
import homew from "../../assets/images/home-w.png";

let axiosInterceptor = null;
const AuthRouter = ({ component: Component, ...rest }) => {
   if (!!axiosInterceptor || axiosInterceptor === 0) {
      axios.interceptors.response.eject(axiosInterceptor);
   }
   axiosInterceptor = axios.interceptors.response.use(function (response) {
      return response;
   }, function (error) {
      console.log("TOKEN NI ERRROR", error.response)
      if (error.response.status === 401) {
         let localData = JSON.parse(localStorage.getItem('Dweets'));
         let payload = {
            token: localData.refresh_token
         }
         Api.getRefreshToken(payload)
            .then((res) => {
               if (res.data.data) {
                  window.location.reload();
                  localStorage.setItem("Dweets_token", JSON.stringify(res.data.data.token))
               }
               else {

               }
            })
            .catch(function (err) {
               console.log("Errr", err)
               if (err) {

               }
               else {

               }

            }
            );
      }
      else {
         return error.response;
      }
   });


   return (
      <div>
         <Route {...rest} render={props => (
            (
               localStorage.getItem('Dweets_token') != null
            )
               ? <Component {...props} /> : (
                  <Redirect to={{
                     pathname: "/"
                  }} />
               )
         )} />
      </div>
   )
}

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {
         toggle: false
      }
   }

   componentDidMount() {
      LocalStorage.getItem("Dweets").then(user => {
         this.setState({ user: user, profile_picture: user.profile_picture, loader: false })
      });
   }

   isPathActive(path) {
      return this.props.location.pathname.startsWith(path);
   }

   togglechange = () => {
      //console.log("toggle button", this.state.toggle)
      var _this = this;
      _this.setState({ toggle: true }, () => console.log("Seysatytae", _this.state.toggle));
   }


   oncollpase = () => {
      //console.log("toggle button", this.state.toggle)
      var _this = this;
      _this.setState({ toggle: false }, () => console.log("Seysatytae", _this.state.toggle));
   }

   render() {

      const { user } = this.state;

      return (
         <div>
            <header className="header">
               <nav>
                  <div className="main-class">
                     <div className="d-flex mr-auto">
                        {this.state.toggle === false ? <div className="">
                           <img src={logoSecon} className="logo-of-same" alt=""></img>
                        </div> : <div className="">
                        </div>}
                       
                        {/* <div className="serach-input">
                           <Input
                              placeholder="Serach"
                              className="serach-input"
                           />
                        </div> */}
                     </div>
                     <div className="Sidebar-header-main">
                        <div className="image-clas">
                           {/* {console.log("Proife",profile_picture)}   */}
                           {/* <img src={notify} className="notification-header" alt=""></img>
                           <img src={user && user.profile_picture} className="profile-header" alt=""></img> */}
                        </div>

                        <div className="Dropdo-Respo">
                           <div className="settings-icon-container float-right">
                              <div className="bs-example dot-css1">
                                 <div className="dropdown">
                                    <span className="dropdown-toggle" data-toggle="dropdown">
                                       <span className="Geek">{user && user.first_name} {user && user.last_name}</span>
                                    </span>
                                    <div className="dropdown-menu dropdown-settingicon">
                                       <span className="For-margin">
                                          <Link to="/" className="dropdown-item">
                                             <span className="Logout"
                                                onClick={() => {
                                                   localStorage.removeItem('Dweets');
                                                   localStorage.removeItem('Dweets_token');
                                                }}>Logout</span></Link>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </nav>
            </header>


            <div class="main">
               <div class="d-flex">
                  {this.state.toggle === false ?
                     <div className="sidebar">
                        <div className={this.isPathActive('/dashboard') ? 'side-nav-item-active' : 'side-nav-item'}>
                           <Link to="/dashboard">
                              <img alt="" src={this.isPathActive('/dashboard') ? homew : home} class={this.isPathActive('/dashboard') ? "active-white-icon" : "img-briefcase"}></img>
                              <span>Dashboard</span>
                           </Link>
                        </div>
                     </div>
                     : <div>

                     </div>}
                  <div class="side-content">
                     <Switch>
                        {routes.map((route, idx) => {
                           return route.component ? (
                              <AuthRouter path={route.path} component={route.component} key={idx} name="{route.name}" exact={route.exact} />
                           ) : (null);
                        })}
                        <Redirect from="/" to="/dashboard" />
                     </Switch>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
export default withRouter(Header);
