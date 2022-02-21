import React, { Component } from 'react';
import { Input } from 'antd';
import Api from "../../Api/ApiUtils";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


class AddSuperAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MonthButton: true,
            YearButton: false,
            hiddennew: true,
            newProfilePic: "",
        };
        this.LoginValidator = new SimpleReactValidator();
    }

    toggleShowNew = () => {
        this.setState({ hiddennew: !this.state.hiddennew });
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


    loginin = () => {
        this.setState({ loader: true });
        if (this.LoginValidator.allValid()) {
            let payload = {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.emailid,
                password: this.state.password,
            }
            Api.addsuperadmin(payload)
                .then(res => {
                    if (res && res.data && res.data.data && res.status === 200) {
                        toast.success("Admin added successfully");
                        this.props.history.push("/superadmin");
                        this.setState({ loader: false, firstname: "", lastname: "", emailid: "", password: "" })
                    }
                    else if (res.status === 400) {
                        toast.error("User With this email already exists");
                    }
                    else {
                        toast.error("Some Error Occurred");
                    }
                })
                .catch(function (err) {
                    if (err) {
                        toast.error("Some Error Occurred");
                    }
                    this.setState({ loader: false });
                });
        }

        else {
            this.LoginValidator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false })
        }
    }




    setStateFromInputAdd(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    CancelButton = () => {
        this.setState({ firstname: "", lastname: "", emailid: "", password: "" })
    }




    render() {
        return (
            <div>
                <div className="d-flex mr-b-20">
                    <span className="Super-Admin-plan-pages mr-auto">Admin</span>
                    <span>
                        <Link to="/dashboard">
                            <span className="Home-Add-Plan-Super">Home </span>
                        </Link>
                        <span className="chevron-right-1-Plan-Super">&gt;</span>
                        <Link to="/superadmin">
                            <span className="Price-Plan-Date-Super">Admin</span>
                        </Link>
                        <span className="chevron-right-1-Plan-Super">&gt;</span>
                        <span className="Add-Plan-create-Super">Create New Admin</span>
                    </span>

                </div>
                <div>
                    <div className="Border-Div-Add-plan-Super">
                        <div className="Plan-Add-Main-Super">

                            <span className="Super-Price-First">First Name*</span>
                            <span className="Super-Price-Inout-Filed">
                                <Input
                                    className="Super-Price-Inout-Filed"
                                    placeholder="Enter First Name"
                                    name='firstname'
                                    value={this.state.firstname}
                                    onChange={this.setStateFromInputAdd.bind(this)}
                                >
                                </Input>
                                <div className="err-message-email">
                                    {this.LoginValidator.message('First Name', this.state.firstname, 'required')}
                                </div>
                            </span>

                            <span className="Super-Price-First">Last Name*</span>
                            <span className="Super-Price-Inout-Filed">
                                <Input
                                    className="Super-Price-Inout-Filed"
                                    placeholder="Enter Last Name"
                                    name='lastname'
                                    value={this.state.lastname}
                                    onChange={this.setStateFromInputAdd.bind(this)}>
                                </Input>
                                <div className="err-message-email">
                                    {this.LoginValidator.message('Last Name', this.state.lastname, 'required')}
                                </div>
                            </span>


                            <span className="Super-Price-First">Email Id*</span>
                            <span className="Super-Price-Inout-Filed">
                                <Input
                                    className="Super-Price-Inout-Filed"
                                    placeholder="Enter Email Id"
                                    name='emailid'
                                    value={this.state.emailid}
                                    onChange={this.setStateFromInputAdd.bind(this)}>
                                </Input>
                                <div className="err-message-email">
                                    {this.LoginValidator.message('Email Id', this.state.emailid, 'required|email')}
                                </div>
                            </span>

                            <span className="Super-Price-First passwordteststyle ">Password*</span>
                            <span className="Password-text-plan">
                                <Input
                                    placeholder="Enter Password"
                                    className="Password-text-plan"
                                    prefix={<i  aria-hidden="true" className="icon-pass" />}
                                    type={this.state.hiddennew ? "password" : "text"}
                                    name="password" suffix={this.state.hiddennew ?
                                        <EyeOutlined onClick={this.toggleShowNew} /> : <EyeInvisibleOutlined onClick={this.toggleShowNew} />}
                                    value={this.state.password}
                                    onChange={this.setStateFromInputAdd.bind(this)}
                                >
                                </Input>
                                <div className="err-message-email">
                                    {this.LoginValidator.message('Password', this.state.password, 'required|min:8')}
                                </div>
                            </span>


                        </div>
                        <hr className="hr-styling"></hr>
                        <div className="d-flex">
                            <div className="Super-Cancel-button mr-18" onClick={() => { this.CancelButton() }}>
                                <div className="Button-Super-Cancel">
                                    <span className="Super-Cancel">Cancel</span>
                                </div>
                            </div>

                            <div className="Super-Create-button" onClick={() => { this.loginin() }}>
                                <div className="Admin-Super-Button">
                                    <span className="Super-Create">Create</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="footer-styling">© 2022, Sameteam all right reserved</div>
                </div>
            </div>
        )
    }
}

export default AddSuperAdmin
