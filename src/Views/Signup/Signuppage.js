import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import LocalStorage from "../../Api/LocalStorage";

import logo from "../../assets/images/Twitter.png";
import Api from "../../Api/ApiUtils";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      username: "",
      hidden: true,
      dialCode: '',
      phone: '',
      dialCode: '',
      pNo: '',
      email: '',
      password: '',
      confirm_password: '',

      hidden: true,
      hidden1: true,
      passnotmatch: false,

    };
    this.LoginValidator = new SimpleReactValidator();
  }
  componentDidMount() {
    console.log("Sgnuppp page")
  }

  setStateFromInputAdd(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  loginin = () => {
    if (this.LoginValidator.allValid() && this.state.passnotmatch === false) {
      this.setState({ loader: true })
      const payload = {
        email: this.state.email,
        password: this.state.password,
        name:this.state.name,
        userName:this.state.username
      };
      Api.login(payload)
        .then((response) => {
          console.log("Login Response", response)
          if (response.data) {
            LocalStorage.setItem("Dweets", JSON.stringify(response.data.data)).then(fulfilled => {
              LocalStorage.setItem("Dweets_token", JSON.stringify(response.data.data.token)).then(success => {
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

  toggleShow1 = () => {
    this.setState({ hidden1: !this.state.hidden1 });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  matchpassword = (event) => {
    if (event.target.name === 'confirm_password') {
      if (event.target.value !== this.state.password) {
        this.setState({ confirm_password: event.target.value, passnotmatch: true });
      } else {
        this.setState({ confirm_password: event.target.value, passnotmatch: false });
      }
    }
    if (event.target.name === 'password' && this.state.confirm_password !== '') {
      if (event.target.value !== this.state.confirm_password) {
        this.setState({ password: event.target.value, passnotmatch: true });
      } else {
        this.setState({ password: event.target.value, passnotmatch: false });
      }
    }
  };


  render() {
    return (
      <div className="row mr-0">
        <div className="container" style={{ marginTop: '133px' }}>
          <div className="col-10" style={{ margin: 'auto' }}>
            <div className="card login-card">
              <div >
                <div className="w-100">
                  <div className="w-100">
                    <img src={logo} alt="logo" className="logo-loginpage" style={{ display: 'block', margin: 'auto' }} />
                  </div>
                </div>
                {this.state.loader ? <Loader /> : null}
                <span style={this.state.loader ? { opacity: '0.4' } : null}>
                  <div className="row w-100">
                    <div className="form-page-signup d-flex">
                      <div className="col-6">
                        <span className="email-address-login">Username</span>
                        <Input
                          name='username'
                          value={this.state.username}
                          onChange={this.setStateFromInputAdd.bind(this)}
                          className="email-address-input-field-loginpage"
                        />
                        <div className="err-message-email">
                          {this.LoginValidator.message('username', this.state.username, 'required')}
                        </div>

                        <span className="email-address-login">Full Name</span>
                        <Input
                          name='username'
                          value={this.state.name}
                          onChange={this.setStateFromInputAdd.bind(this)}
                          className="email-address-input-field-loginpage"
                        />
                        <div className="err-message-email">
                          {this.LoginValidator.message('name', this.state.name, 'required')}
                        </div>


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
                      </div>
                      <div className="col-6">

                        <span className="password-loginpage">Password</span>
                        <div>
                          <Input
                            prefix={<i
                              aria-hidden="true" className="icon-pass" />}
                            type={this.state.hidden ? 'password' : 'text'}
                            suffix={this.state.hidden ? <EyeOutlined onClick={this.toggleShow} /> : <EyeInvisibleOutlined onClick={this.toggleShow} />}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            className="email-address-input-field-loginpage"
                            onChange={(e) => {
                              this.handleChange(e);
                              this.matchpassword(e);
                            }}
                          />
                          <div className="err-message-email-password">
                            {this.LoginValidator.message('Password', this.state.password, 'required|min:8')}
                          </div>
                        </div>

                        <span className="password-loginpage" style={{ marginTop: '26px' }}>Confirm Password</span>
                        <div>
                          <Input
                            placeholder="Confirm Password"
                            name="confirm_password"
                            className="email-address-input-field-loginpage"
                            onChange={this.matchpassword}
                            type={this.state.hidden1 ? 'password' : 'text'}
                            suffix={this.state.hidden1 ? <EyeOutlined onClick={this.toggleShow1} /> : <EyeInvisibleOutlined onClick={this.toggleShow1} />}
                          />
                          <div className="err-msg">{this.LoginValidator.message('Confirm Password', this.state.confirm_password, 'required|NoBlanckSpaceCheck')}</div>
                          <div className={`err-msg ${this.state.passnotmatch ? '' : 'hide'}`}>
                            <span className="err-msg">Confirm password and Password must match</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div class="container-button">
                    <Button className="sigin-button-loginpage" style={{ width: '18%' }} onClick={this.loginin}>
                      <span class="sign-loginpage">Sign Up
                      </span></Button>
                  </div>
                  <div>
                    <Link to="/">
                      <div className="text-center">
                        Back
                      </div>
                    </Link>
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
export default withRouter(SignupPage);
