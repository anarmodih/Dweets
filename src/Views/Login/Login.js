import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from "../../assets/images/Twitter.png";
import { Input, Button } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import LocalStorage from "../../Api/LocalStorage";
import Api from "../../Api/ApiUtils";
import SimpleReactValidator from 'simple-react-validator';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      email: "",
      password: "",
      hidden: true,
    };
    this.LoginValidator = new SimpleReactValidator();
  }
  componentDidMount()
  {
    console.log("Hhhhh login oaggegge")
  }
  setStateFromInputAdd(event) {
    
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  loginin = () => {
    if (this.LoginValidator.allValid()) {
      this.setState({ loader: true })
      const payload = {
        email: this.state.email,
        password: this.state.password,
      };
      Api.login(payload)
        .then((response) => {
          console.log("Login Response", response)
          if (response.data) {
            LocalStorage.setItem("Super_Admin", JSON.stringify(response.data.data)).then(fulfilled => {
              LocalStorage.setItem("Super_Admin_token", JSON.stringify(response.data.data.token)).then(success => {
                toast.success("Login successfully");
                this.props.history.push("/dashboard");
              });
            })
            this.setState({ loader: false, email: "", password: "" })
          }
          else {
            // console.log("first if")
            // toast.error("Login unsuccessfull. Please try again!");
          }
        })
        .catch(err => {
          toast.error(err.error.message);
          this.setState({ loader: false })
        })
    }
    else {
      this.LoginValidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }
  }

  onKeyPress(e) {
    if (e.which === 13) {
      this.loginin();
    }
  }

  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  }


  render() {
    return (
      <div className="row mr-0">
        <div className="container" style={{ marginTop: '133px' }}>
          <div className="col-6" style={{ margin: 'auto' }}>
            <div className="card login-card">
              <div className="row w-100">
                <div className="w-100">
                  <div className="w-100">
                    <img src={logo} alt="logo" className="logo-loginpage" style={{ display: 'block', margin: 'auto' }} />
                  </div>
                </div>
                {this.state.loader ? <Loader /> : null}
                <span style={this.state.loader ? { opacity: '0.4' } : null}>
                  <div className="form-page-login">
                    <span className="email-address-login">Email Address</span>
                    <Input
                      name='email'
                      value={this.state.email}
                      onChange={this.setStateFromInputAdd.bind(this)}
                      onKeyPress={this.onKeyPress.bind(this)}
                      className="email-address-input-field-loginpage"
                    />
                    <div className="err-message-email">
                      {this.LoginValidator.message('email', this.state.email, 'required|email')}
                    </div>

                    <span className="password-loginpage">Password</span>
                    <Input
                      className="password-input-field-loginpaged"
                      prefix={<i
                        aria-hidden="true" className="icon-pass" />}
                      type={this.state.hidden ? "password" : "text"}
                      name="password" suffix={this.state.hidden ?
                        <EyeOutlined onClick={this.toggleShow} /> : <EyeInvisibleOutlined onClick={this.toggleShow} />}
                      value={this.state.password}
                      onChange={this.setStateFromInputAdd.bind(this)} onKeyPress={this.onKeyPress.bind(this)}
                    />
                    <div className="err-message-email-password">
                      {this.LoginValidator.message('Password', this.state.password, 'required|min:8')}
                    </div>

                    <div>
                      <div className="float-right dont-have-account">
                        Don't Have Account? <Link to="/signup-page">SignUp</Link>
                      </div>
                    </div>

                    <div className="">
                      <Button className="sigin-button-loginpage" onClick={this.loginin}>
                        <span class="sign-loginpage">Sign In
                        </span></Button>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
