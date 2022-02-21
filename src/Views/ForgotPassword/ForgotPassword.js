import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import resetpassword from "../../assets/images/Reset-Password.png";
import { Input, Button } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import eye from "../../assets/images/eye.png";
// import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
// import LocalStorage from "../../Api/LocalStorage";
import Api from "../../Api/ApiUtils";
import SimpleReactValidator from 'simple-react-validator';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      createpassword: "",
      newpassword: "",
      errorFlag: false,
      hidden: true,
      hiddennew: true
    };
    this.ForgotpasswordValidator = new SimpleReactValidator();
  }

  setStateFromInputAdd(event) {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  setStateFromPassword(event) {
    var obj = {};
    if (event.target.name === "newpassword") {
      if (event.target.value !== this.state.createpassword) {
        this.setState({ newpassword: event.target.value, errorFlag: true })
      }
      else {
        this.setState({ newpassword: event.target.value, errorFlag: false })
      }
    }
    else {
      this.setState(obj);
    }

  }



  ForgotPsswordButton = () => {
    if (this.ForgotpasswordValidator.allValid() && this.state.errorFlag === false) {
      this.setState({ loader: true })
      const payload = {
        password: this.state.createpassword,
        token: this.props.match.params.token,
      };
      Api.resetpassword(payload)
        .then((response) => {
          console.log("Response", response)
          toast.success("Your password has been successfully changed");
          // this.props.history.push("/");
          this.setState({ loader: false, createpassword: "", newpassword:""})
          this.ForgotpasswordValidator.hide();
         
        })
        .catch(err => {
          console.log("inside catch", err.error.message)
          toast.error(err.error.message);
          this.setState({ loader: false })
        })
    }
    else {
      this.ForgotpasswordValidator.showMessages();
      this.forceUpdate();
      this.setState({ loader: false });
    }

  }

  onKeyPress(e) {
    if (e.which === 13) {
      this.ForgotPsswordButton();
    }
  }

  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  toggleShowNew = () => {
    this.setState({ hiddennew: !this.state.hiddennew });
  }



  render() {
    return (
      <div className="row mr-0">
        <div className="col-md-6 pr-0">
          <div className="image-background-color">
            <img src={resetpassword} className="image-set" alt="" />
            <div className="header-here">
              Heading here
            </div>
            <div className="save-timed">
              Save time and increase productivity with all of your
            </div>
            <div className="save-timed">
              virtual and in-person events
            </div>

            <div className="taged">
              © 2022, Sameteam all right reserved
            </div>
          </div>


        </div>
        <div className="col-md-6 login-section-wrapper">
          <div className="brand-wrapper-forgotpassword">
            <img src={logo} alt="logo" className="logo" />
            <h1>Create new password</h1>
            <p>
              Your new password must be different from previous user password
            </p>
          </div>
          {this.state.loader ? <Loader /> : null}
          <span style={this.state.loader ? { opacity: '0.4' } : null}>
            <div className="form-page">
              <span className="email-address">Create New Password</span>
              <Input
                className="email-address-input-field"
                prefix={<i className="icon-pass" aria-hidden="true" />}
                type={this.state.hidden ? "password" : "text"}
                name="createpassword" suffix={this.state.hidden ?
                  <EyeOutlined onClick={this.toggleShow} /> : <EyeInvisibleOutlined onClick={this.toggleShow} />}
                value={this.state.createpassword}
                onChange={this.setStateFromInputAdd.bind(this)} onKeyPress={this.onKeyPress.bind(this)}
              />
              <div className="err-message-Forgotpassword">
                {this.ForgotpasswordValidator.message('password', this.state.createpassword, 'required|min:8')}
              </div>

              <span className="email-address mr-top-35">Confirm New Password</span>
              <Input
                className="password-input-field-forgot-password"
                prefix={<i aria-hidden="true" className="icon-pass" />}
                type={this.state.hiddennew ? "password" : "text"}
                name="newpassword" suffix={this.state.hiddennew ?
                  <EyeOutlined onClick={this.toggleShowNew} /> : <EyeInvisibleOutlined onClick={this.toggleShowNew} />}
                value={this.state.newpassword}
                onChange={this.setStateFromPassword.bind(this)} onKeyPress={this.onKeyPress.bind(this)}
              />
              <div className="err-message-Confirmpassword">
                {this.ForgotpasswordValidator.message('confirm password', this.state.newpassword, 'required|min:8')}
              </div>
              <div className={"err-message-Confirmpassword" + (this.state.errorFlag ? "" : "hide")}>
                <span className="errorMsg">Confirm password must match Password field.</span>
              </div>

              <div className="">
                <Button className="sigin-button-forgotpassword" onClick={this.ForgotPsswordButton}>
                  <span class="sign-forgotpassword">Reset Password
                  </span></Button>
              </div>

            </div>
          </span>
        </div>
      </div>
    );
  }
}
export default withRouter(ForgotPassword);
