import React, { Component } from 'react';
import { Card } from 'antd';
import CKEditor from 'ckeditor4-react';
import { Collapse } from 'antd';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import Api from "../../Api/ApiUtils";
import Loader from "../../Views/Loader/Loader";
const { Panel } = Collapse;

class EmailTemplateManagement extends Component {
    constructor() {
        super();
        this.state = {
            loader: false,
            WelcomeTemplate: '',
            WelcomeTemplateForm: '',
            WelcomeTemplateCollpase: true,
            ForgotPassword: '',
            ForgotPasswordForm: '',
            ForgotPasswordCollapse: false,
            ChangePassword: '',
            ChangePasswordForm: '',
            ChangePasswordCollapse: false,
        };
        this.WelcomeTemplateFormValidator = new SimpleReactValidator();
    }

    componentDidMount() {
        this.setState({ loader: true });
        this.getData()
    }
    getData() {
        this.setState({ loader: true })
        let payload = {

        }
        Api.getAppContent(payload).then(res => {
            if (res && res.data.data) {
                let WelcomeTemplate, ForgotPassword, ChangePassword;
                for (let i = 3; i < res.data.data.length; i++) {
                    // console.log("datat",res.data.data[i].title)
                    if (res.data.data[i].title === "Welcome Template") {
                        // console.log("Welcome Template ni under",res.data.data[i].title)
                        WelcomeTemplate = res.data.data[i]
                    }
                    else if (res.data.data[i].title === "Forgot Password") {
                        //console.log("Forgotpassword in under",res.data.data[i].title)
                        ForgotPassword = res.data.data[i]
                    }
                    else if (res.data.data[i].title === "Change Password") {
                        //console.log("CHange password ni undrs",res.data.data[i].title)
                        ChangePassword = res.data.data[i]
                    }
                }
                this.setState({ loader: false, WelcomeTemplate: WelcomeTemplate, WelcomeTemplateForm: WelcomeTemplate, ForgotPassword: ForgotPassword, ForgotPasswordForm: ForgotPassword, ChangePassword: ChangePassword, ChangePasswordForm: ChangePassword })
            }
            else {
                this.setState({ WelcomeTemplate: { content: "" }, WelcomeTemplateForm: { content: "" }, ForgotPassword: { content: "" }, ForgotPasswordForm: { content: "" }, ChangePassword: { content: "" }, ChangePasswordForm: { content: "" }, loader: false })
            }
        })
            .catch(err => {
                toast.error("Some error occurred!");
                this.setState({ loader: false });
            })
    }


    onEditorChange(editType, event) {
        console.log("EditorChange")
        if (editType === "WelcomeTemplate") {
            let obj = JSON.parse(JSON.stringify(this.state.WelcomeTemplateForm));
            obj["content"] = event.editor.getData()
            this.setState({ WelcomeTemplateForm: Object.assign({}, this.state.WelcomeTemplateForm, obj) })
        }
        else if (editType === "ForgotPassword") {
            let obj = JSON.parse(JSON.stringify(this.state.ForgotPasswordForm));
            obj["content"] = event.editor.getData()
            this.setState({ ForgotPasswordForm: Object.assign({}, this.state.ForgotPasswordForm, obj) })
        }
        else if (editType === "ChangePassword") {
            let obj = JSON.parse(JSON.stringify(this.state.ChangePasswordForm));
            obj["content"] = event.editor.getData()
            this.setState({ ChangePasswordForm: Object.assign({}, this.state.ChangePasswordForm, obj) })
        }
    }

    resetValue(editType) {
        console.log("restvalue")
        this.setState({ loader: true });
        if (editType === "WelcomeTemplate") {
            let obj = JSON.parse(JSON.stringify(this.state.WelcomeTemplateForm));
            obj["content"] = this.state.WelcomeTemplate["content"];
            this.setState({ WelcomeTemplateForm: Object.assign({}, this.state.WelcomeTemplateForm, obj), loader: false })
        }
        else if (editType === "ForgotPassword") {
            let obj = JSON.parse(JSON.stringify(this.state.ForgotPasswordForm));
            obj["content"] = this.state.ForgotPassword["content"];
            this.setState({ ForgotPasswordForm: Object.assign({}, this.state.ForgotPasswordForm, obj), loader: false })
        }
        else if (editType === "ChangePassword") {
            let obj = JSON.parse(JSON.stringify(this.state.ChangePasswordForm));
            obj["content"] = this.state.ChangePassword["content"];
            this.setState({ ChangePasswordForm: Object.assign({}, this.state.ChangePasswordForm, obj), loader: false })
        }
    }

    setPageContent(editType, contentType) {
        console.log("SetPageContent")
        this.setState({ loader: true });
        let payload = {};
        if (editType === "WelcomeTemplate") {
            payload = {
                //title: "Welcome Template",
                id: "4",
                content: this.state.WelcomeTemplateForm.content
            };
        }
        else if (editType === "ForgotPassword") {
            payload = {
               // title: "Forgot Password",
                id: "5",
                content: this.state.ForgotPasswordForm.content
            };
        }
        if (editType === "ChangePassword") {
            payload = {
               // title: "Change Password",
                id: "6",
                content: this.state.ChangePasswordForm.content
            };
        }
        Api.setAppContent(payload)
            .then((res) => {
              //  console.log("resp for email templte data", res.data.data)
                if (res && res.data.data) {
                    if (editType === "WelcomeTemplate") {
                        this.setState({ WelcomeTemplate: res.data.data, WelcomeTemplateForm: res.data.data, loader: false })
                    }
                    else if (editType === "ForgotPassword") {
                        this.setState({ ForgotPassword: res.data.data, ForgotPasswordForm: res.data.data, loader: false })
                    }
                    else if (editType === "ChangePassword") {
                        this.setState({ ChangePassword: res.data.data, ChangePasswordForm: res.data.data, loader: false })
                    }
                    toast.success("Content updated successfully");
                }
                else {
                   //toast.error("content required")
                    this.setState({ loader: false })
                }
            })
            .catch(function (err) {
                if (err.errors) {
                    toast.error(err.errors.msg);
                    this.setState({ loader: false })
                }
                else {
                    toast.error("Error Occurred");
                    this.setState({ loader: false })
                }
                this.setState({ loader: false });
            });
    }



    render() {
        const { WelcomeTemplate, ForgotPassword, ChangePassword } = this.state;
        return (
            <div>
                <div>
                    <div className="d-flex mr-bottom-23">
                        <span className="Reports-Page mr-auto">Email Management</span>
                    </div>
                    {this.state.loader ? <Loader /> : null}
                    <span style={this.state.loader ? { opacity: '0.4' } : null}>
                        <Card className="card-box-shadow">
                            <div className="radius-card remove-padding-card">
                                <div className="row">
                                    {/* ABOUT US SECTION */}
                                    <div className="col-12 mr-bottom-23">
                                        <div className="card w-100">
                                            {/* <div className="card-header" onClick={() => { this.setState({ WelcomeTemplateCollpase: !this.state.WelcomeTemplateCollpase, WelcomeTemplateForm: WelcomeTemplate }) }}> */}

                                            {/* </div> */}
                                            {WelcomeTemplate && this.state.WelcomeTemplateForm ?
                                                <div className="about-us-content-collpase" >
                                                    <Collapse onChange={this.state.WelcomeTemplateCollpase} >
                                                        <Panel header="Welcome email Template">
                                                            <div className="card-body">
                                                                {console.log("Welcome Tempalte infor", this.state.WelcomeTemplateForm.content)}
                                                                {this.state.WelcomeTemplateForm && (this.state.WelcomeTemplateForm.content || this.state.WelcomeTemplateForm.content === "") ?
                                                                    <CKEditor
                                                                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                                                        data={this.state.WelcomeTemplateForm.content}
                                                                        onChange={this.onEditorChange.bind(this, "WelcomeTemplate")}
                                                                    />
                                                                    :
                                                                    null
                                                                }
                                                                <div className="d-flex">
                                                                    <div className="Content-button" onClick={this.resetValue.bind(this, "WelcomeTemplate")}>
                                                                        <div className="Button-Cancel-Content">
                                                                            <span className="Cancel-Content">Cancel</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="Create-button-Content" onClick={this.setPageContent.bind(this, "WelcomeTemplate", 3)}>
                                                                        <div className="Button-Create-Content">
                                                                            <span className="Create-Content">Add</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Panel>
                                                    </Collapse>
                                                </div>
                                                : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="radius-card">
                                <div className="row">
                                    {/* ABOUT US SECTION */}
                                    <div className="col-12 mr-bottom-23">
                                        <div className="card w-100">
                                            {/* <div className="card-header" onClick={() => { this.setState({ WelcomeTemplateCollpase: !this.state.WelcomeTemplateCollpase, WelcomeTemplateForm: WelcomeTemplate }) }}>
                                        <strong>ForgotPassword Policy</strong>
                                    </div> */}
                                            {ForgotPassword && this.state.ForgotPasswordForm ?
                                                <div className="about-us-content-collpase">
                                                    <Collapse onChange={this.state.ForgotPasswordCollpase}>
                                                        <Panel header="Forgot Password">
                                                            <div className="card-body">
                                                                {this.state.ForgotPasswordForm && (this.state.ForgotPasswordForm.content || this.state.ForgotPasswordForm.content === "") ?
                                                                    <CKEditor
                                                                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                                                        data={this.state.ForgotPasswordForm.content}
                                                                        onChange={this.onEditorChange.bind(this, "ForgotPassword")}
                                                                    />
                                                                    :
                                                                    null
                                                                }
                                                                <div className="d-flex">
                                                                    <div className="Content-button" onClick={this.resetValue.bind(this, "ForgotPassword")}>
                                                                        <div className="Button-Cancel-Content">
                                                                            <span className="Cancel-Content">Cancel</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="Create-button-Content" onClick={this.setPageContent.bind(this, "ForgotPassword", 4)}>
                                                                        <div className="Button-Create-Content">
                                                                            <span className="Create-Content">Add</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Panel>
                                                    </Collapse>
                                                </div>
                                                : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="radius-card">
                                <div className="row">
                                    {/* ABOUT US SECTION */}
                                    <div className="col-12 mr-bottom-23">
                                        <div className="card w-100">
                                            {/* <div className="card-header" onClick={() => { this.setState({ WelcomeTemplateCollpase: !this.state.WelcomeTemplateCollpase, WelcomeTemplateForm: WelcomeTemplate }) }}>
                                        <strong>ChangePassword and Conditions</strong>
                                    </div> */}
                                            {ChangePassword && this.state.ChangePasswordForm ?
                                                <div className="about-us-content-collpase">
                                                    <Collapse onChange={this.state.ChangePasswordCollpase}>
                                                        <Panel header="Change Password">
                                                            <div className="card-body">
                                                                {this.state.ChangePasswordForm && (this.state.ChangePasswordForm.content || this.state.ChangePasswordForm.content === "") ?
                                                                    <CKEditor
                                                                        onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                                                        data={this.state.ChangePasswordForm.content}
                                                                        onChange={this.onEditorChange.bind(this, "ChangePassword")}
                                                                    />
                                                                    :
                                                                    null
                                                                }
                                                                <div className="d-flex">
                                                                    <div className="Content-button" onClick={this.resetValue.bind(this, "ChangePassword")}>
                                                                        <div className="Button-Cancel-Content">
                                                                            <span className="Cancel-Content">Cancel</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="Create-button-Content" onClick={this.setPageContent.bind(this, "ChangePassword", 5)}>
                                                                        <div className="Button-Create-Content">
                                                                            <span className="Create-Content">Add</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </Panel>
                                                    </Collapse>
                                                </div>
                                            : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </span>
                </div>

            </div>
        );
    }
}

export default EmailTemplateManagement;
