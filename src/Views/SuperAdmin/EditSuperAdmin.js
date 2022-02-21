import React, { Component } from 'react';
import { Input } from 'antd';
import Api from "../../Api/ApiUtils";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';


class EditSuperAdmin extends Component {

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
                id: this.props.match.params.id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
            }
            Api.editsuperadmin(payload)
                .then(res => {
                    if (res && res.data && res.data.data && res.status === 200) {
                        toast.success("Admin edited successfully");
                        this.props.history.push("/superadmin");
                        this.setState({ loader: false, first_name: "", last_name: "" })
                    }
                    else if (res.status === 400) {
                        //toast.error("User With this email already exists");
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

    componentWillMount() {
        var _this = this;
        _this.getData();
    }


    getData() {
        let payload = {
            id: this.props.match.params.id,
        }
        Api.getCompanybyid(payload)
            .then((res) => {
                if (res && res.data.data) {
                    console.log("Fetch data of first Responder", res.data.data)
                    this.setState({
                        first_name: res.data.data.first_name,
                        last_name:res.data.data.last_name,
                        
                    }, () => {
                        console.log("first_name and last_name",this.state.is_active)
                    });
                }
            })
            .catch(function (err) {
                if (err) {
                    // toast.success(res.err)
                }
                else {
                    toast.success("Error Occured")
                }
                //this.setState({ loader: false });
            });
    }

    setStateFromInputAdd(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    CancelButton = () => {
        this.setState({ first_name: "", last_name: "", })
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
                        <span className="Add-Plan-create-Super">Edit Admin</span>
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
                                    name='first_name'
                                    value={this.state.first_name}
                                    onChange={this.setStateFromInputAdd.bind(this)}
                                >
                                </Input>
                                <div className="err-message-email">
                                    {this.LoginValidator.message('First Name', this.state.first_name, 'required')}
                                </div>
                            </span>

                            <span className="Super-Price-First">Last Name*</span>
                            <span className="Super-Price-Inout-Filed">
                                <Input
                                    className="Super-Price-Inout-Filed"
                                    placeholder="Enter Last Name"
                                    name='last_name'
                                    value={this.state.last_name}
                                    onChange={this.setStateFromInputAdd.bind(this)}>
                                </Input>
                                <div className="err-message-email">
                                    {this.LoginValidator.message('Last Name', this.state.last_name, 'required')}
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
                                <div className="edit-Buttons">
                                    <span className="Super-Create">Edit</span>
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

export default EditSuperAdmin
