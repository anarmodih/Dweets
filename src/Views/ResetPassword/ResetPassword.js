import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from "../../assets/images/logo.png"
import resetpassword from "../../assets/images/Reset-Password.png";
import { Input, Button } from 'antd';
import Api from "../../Api/ApiUtils";
import Loader from '../Loader/Loader';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            email: "",
        };
        this.ResetValidator = new SimpleReactValidator();
    }



    setStateFromInputAdd(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    }

    ResetButton = () => {
        if (this.ResetValidator.allValid()) {
            this.setState({ loader: true })
            const payload = {
                email: this.state.email,
            };
            Api.fortgotpassword(payload)
                .then((response) => {
                    console.log("Response", response.data.message)
                    if (response.data) {
                        toast.success(response.data.message);
                        // LocalStorage.setItem("Super_Admin", JSON.stringify(response.data.data)).then(fulfilled => {
                        //   LocalStorage.setItem("Super_Admin_token", JSON.stringify(response.data.data.token)).then(success => {
                        //     toast.success("Login successfull!!");
                        //     this.props.history.push("/dashboard");
                        //   });
                        // })
                        this.setState({ loader: false, email: "" })
                    }
                    else {
                        // console.log("first if")
                        // toast.error("Login unsuccessfull. Please try again!");
                    }
                })
                .catch(err => {
                    console.log("inside catch", err.error.message)
                    toast.error(err.error.message);
                    this.setState({ loader: false })
                })
        }
        else {
            this.ResetValidator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }

    }

    onKeyPress(e) {
        if (e.which === 13) {
            this.ResetButton();
        }
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

                    <div className="brand-wrappered">
                        <img src={logo} alt="logo" className="logo" />
                        <h1>Reset password</h1>
                        <p>Enter the email associated with your account and we’ll send an email with instruction to reset your password.

                        </p>
                    </div>
                    {this.state.loader ? <Loader /> : null}
                    <span style={this.state.loader ? { opacity: '0.4' } : null}>
                        <div className="formed">
                            <span className="email-address">Email Address</span>
                            <Input
                                placeholder="name@company.com"
                                className="email-address-input-field-reset-password"
                                name='email'
                                value={this.state.email}
                                onChange={this.setStateFromInputAdd.bind(this)}
                                onKeyPress={this.onKeyPress.bind(this)}
                            />
                            <div className="err-message-email">
                                {this.ResetValidator.message('email', this.state.email, 'required|email')}
                            </div>

                            <div className="">
                                <Button className="sigin-button-resetpassword" onClick={this.ResetButton}>
                                    <span className="sign-resetpassword">Send Instructions
                                    </span></Button>
                            </div>

                        </div>
                    </span>
                </div>
            </div>
        );
    }
}
export default withRouter(ResetPassword);
