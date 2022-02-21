import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { Card } from 'antd';
import { toast } from 'react-toastify';
import Loader from "../../Views/Loader/Loader";
import Api from "../../Api/ApiUtils";
import CKEditor from 'ckeditor4-react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

class Content extends Component {

    constructor() {
        super()
        this.state = {
            loader: false,
            aboutUs: "",
            aboutUsForm: "",
            aboutUsCollpase: true,
            privacy: "",
            privacyForm: "",
            privacyCollapse: false,
            terms: "",
            termsForm: "",
            termsCollapse: false,
        }
        this.aboutUsFormValidator = new SimpleReactValidator();
    }
    componentDidMount() {
        this.setState({ loader: true });
        this.getData()
    }
    getData() {
        this.setState({ loader: true })
        let payload =
        {

        }
        Api.getAppContent(payload).then(res => {
            //console.log("Dta for content",res.data.data)
            if (res && res.data.data) {
                let aboutUs, privacy, terms;
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].title === "AboutUs") {
                        aboutUs = res.data.data[i]
                    }
                    else if (res.data.data[i].title === "PrivacyPolicy") {
                        privacy = res.data.data[i]
                    }
                    else if (res.data.data[i].title === "Terms&Condition") {
                        terms = res.data.data[i]
                    }
                }
                this.setState({ loader: false, aboutUs: aboutUs, aboutUsForm: aboutUs, privacy: privacy, privacyForm: privacy, terms: terms, termsForm: terms }, () => {
                    //console.log("Aboutsus privacy terms",this.state.aboutUs,this.state.privacy,this.state.terms)
                })
            }
            else {
                this.setState({ aboutUs: { content: "" }, aboutUsForm: { content: "" }, privacy: { content: "" }, privacyForm: { content: "" }, terms: { content: "" }, termsForm: { content: "" }})
            }
        })
            .catch(err => {
                toast.error("Some error occurred!");
                this.setState({ loader: false });
            })
    }


    onEditorChange(editType, event) {
        console.log("EditorChange")
        if (editType === "aboutUs") {
            let obj = JSON.parse(JSON.stringify(this.state.aboutUsForm));
            obj["content"] = event.editor.getData()
            this.setState({ aboutUsForm: Object.assign({}, this.state.aboutUsForm, obj) })
        }
        else if (editType === "privacy") {
            let obj = JSON.parse(JSON.stringify(this.state.privacyForm));
            obj["content"] = event.editor.getData()
            this.setState({ privacyForm: Object.assign({}, this.state.privacyForm, obj) })
        }
        else if (editType === "terms") {
            let obj = JSON.parse(JSON.stringify(this.state.termsForm));
            obj["content"] = event.editor.getData()
            this.setState({ termsForm: Object.assign({}, this.state.termsForm, obj) })
        }
    }

    resetValue(editType) {
        console.log("restvalue")
        this.setState({ loader: true });
        if (editType === "aboutUs") {
            let obj = JSON.parse(JSON.stringify(this.state.aboutUsForm));
            obj["content"] = this.state.aboutUs["content"];
            this.setState({ aboutUsForm: Object.assign({}, this.state.aboutUsForm, obj), loader: false })
        }
        else if (editType === "privacy") {
            let obj = JSON.parse(JSON.stringify(this.state.privacyForm));
            obj["content"] = this.state.privacy["content"];
            this.setState({ privacyForm: Object.assign({}, this.state.privacyForm, obj), loader: false })
        }
        else if (editType === "terms") {
            let obj = JSON.parse(JSON.stringify(this.state.termsForm));
            obj["content"] = this.state.terms["content"];
            this.setState({ termsForm: Object.assign({}, this.state.termsForm, obj), loader: false })
        }
    }

    setPageContent(editType, contentType) {
        console.log("SetPageContent")
        this.setState({ loader: true });
        let payload = {};
        if (editType === "aboutUs") {
            payload = {
                //title: "AboutUs",
                id: "1",
                content: this.state.aboutUsForm.content
            };
        }
        else if (editType === "privacy") {
            payload = {
                //title: "PrivacyPolicy",
                id: "2",
                content: this.state.privacyForm.content
            };
        }
        if (editType === "terms") {
            payload = {
                //title: "Terms&Condition",
                id: "3",
                content: this.state.termsForm.content
            };
        }
        Api.setAppContent(payload)
            .then((res) => {
                //console.log("Res.data", res.data.data)
                if (res && res.data.data) {
                    if (editType === "aboutUs") {
                        this.setState({ aboutUs: res.data.data, aboutUsForm: res.data.data, loader: false })
                    }
                    else if (editType === "privacy") {
                        this.setState({ privacy: res.data.data, privacyForm: res.data.data, loader: false })
                    }
                    else if (editType === "terms") {
                        this.setState({ terms: res.data.data, termsForm: res.data.data, loader: false })
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
        // const { aboutUs, privacy, terms } = this.state;
        return (
            <div>
                <div className="d-flex mr-bottom-23">
                    <span className="Reports-Page mr-auto">Content</span>
                </div>

                {this.state.loader ? <Loader /> : null}
                <span style={this.state.loader ? { opacity: '0.4' } : null}>
                    <Card className="card-box-shadow">
                        <div className="radius-card remove-padding-card">
                            <div className="row">
                                {/* ABOUT US SECTION */}
                                <div className="col-12 mr-bottom-23">
                                    <div className="card w-100">
                                        {/* <div className="card-header" onClick={() => { this.setState({ aboutUsCollpase: !this.state.aboutUsCollpase, aboutUsForm: aboutUs }) }}> */}

                                        {/* </div> */}
                                        {this.state.aboutUs && this.state.aboutUsForm ?
                                            <div className="about-us-content-collpase" >
                                                <Collapse onChange={this.state.aboutUsCollpase} >
                                                    <Panel header="About Us">
                                                        <div className="card-body">
                                                            {console.log("Abouts nu content", this.state.aboutUsForm.content)}
                                                            {this.state.aboutUsForm && (this.state.aboutUsForm.content || this.state.aboutUsForm.content === "") ?
                                                                <CKEditor
                                                                    onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                                                    data={this.state.aboutUsForm.content}
                                                                    onChange={this.onEditorChange.bind(this, "aboutUs")}
                                                                />
                                                                :
                                                                null
                                                            }
                                                            <div className="d-flex">
                                                                <div className="Content-button" onClick={this.resetValue.bind(this, "aboutUs")}>
                                                                    <div className="Button-Cancel-Content">
                                                                        <span className="Cancel-Content">Cancel</span>
                                                                    </div>
                                                                </div>

                                                                <div className="Create-button-Content" onClick={this.setPageContent.bind(this, "aboutUs", 1)}>
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
                                {/* PRIVACY SECTION */}
                                <div className="col-12 mr-bottom-23">
                                    <div className="card w-100">
                                        {/* <div className="card-header" onClick={() => { this.setState({ aboutUsCollpase: !this.state.aboutUsCollpase, aboutUsForm: aboutUs }) }}>
                                        <strong>Privacy Policy</strong>
                                    </div> */}
                                        {this.state.privacy && this.state.privacyForm ?
                                            <div className="about-us-content-collpase">
                                                <Collapse onChange={this.state.privacyCollapse}>
                                                    <Panel header="Privacy Policy">
                                                        <div className="card-body">
                                                            {this.state.privacyForm && (this.state.privacyForm.content || this.state.privacyForm.content === "") ?
                                                                <CKEditor
                                                                    onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                                                    data={this.state.privacyForm.content}
                                                                    onChange={this.onEditorChange.bind(this, "privacy")}
                                                                />
                                                                :
                                                                null
                                                            }
                                                            <div className="d-flex">
                                                                <div className="Content-button" onClick={this.resetValue.bind(this, "privacy")}>
                                                                    <div className="Button-Cancel-Content">
                                                                        <span className="Cancel-Content">Cancel</span>
                                                                    </div>
                                                                </div>

                                                                <div className="Create-button-Content" onClick={this.setPageContent.bind(this, "privacy", 2)}>
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
                                {/* TERMS AND CONDITIONS SECTION */}
                                <div className="col-12 mr-bottom-23">
                                    <div className="card w-100">
                                        {/* <div className="card-header" onClick={() => { this.setState({ aboutUsCollpase: !this.state.aboutUsCollpase, aboutUsForm: aboutUs }) }}>
                                        <strong>Terms and Conditions</strong>
                                    </div> */}
                                        {this.state.terms && this.state.termsForm ?
                                            <div className="about-us-content-collpase">
                                                <Collapse onChange={this.state.termsCollapse}>
                                                    <Panel header="Terms and Conditions">
                                                        <div className="card-body">
                                                            {this.state.termsForm && (this.state.termsForm.content || this.state.termsForm.content === "") ?
                                                                <CKEditor
                                                                    onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
                                                                    data={this.state.termsForm.content}
                                                                    onChange={this.onEditorChange.bind(this, "terms")}
                                                                />
                                                                :
                                                                null
                                                            }
                                                            <div className="d-flex">
                                                                <div className="Content-button" onClick={this.resetValue.bind(this, "terms")}>
                                                                    <div className="Button-Cancel-Content">
                                                                        <span className="Cancel-Content">Cancel</span>
                                                                    </div>
                                                                </div>

                                                                <div className="Create-button-Content" onClick={this.setPageContent.bind(this, "terms", 3)}>
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
        )
    }
}

export default Content
