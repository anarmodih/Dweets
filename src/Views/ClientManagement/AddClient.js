import React, { Component } from 'react';
import S3FileUpload from 'react-s3';
import { Input, Select } from 'antd';
import { AWS_CONFIG } from '../../Api/ApiUtils';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Api from '../../Api/ApiUtils';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import Loader from "../../Views/Loader/Loader";
import SimpleReactValidator from 'simple-react-validator';


class AddClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hiddennew: true,
            newProfilePic: "",
            dialCode: '',
            phone: '',

            pNo: '',
            selectedCountry: '',
            selectedState: '',
            countries: [],
            states: [],
            Zipcode: "",
            loader: false
        };
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        var _this = this;
        _this.getallCountry();
    }


    setStateFromInputAdd(event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }


    handleChange(value) {
        console.log(`selected ${value}`);
    }

    toggleShowNew = () => {
        this.setState({ hiddennew: !this.state.hiddennew });
    }

    //to get all country
    getallCountry() {
        this.setState({ loader: true });
        let payload = {

        };
        Api.getcountry(payload)
            .then((response) => {
                if (response.status == 200) {

                    let data = response.data.data;
                    var itemArr2 = [];
                    for (var i = 0; i < data.length; i++) {
                        itemArr2.push({ ['value']: data[i].id, ['label']: data[i].country_name });
                    }
                    this.setState({
                        countries: Array.from(itemArr2),
                        loader: false
                    })
                } else {
                    this.setState({
                        countries: []
                    })
                    //reject();
                }
            })
            .catch(function (err) {
                if (err) {
                    toast.error(err.error);
                } else {
                    toast.error('Some error occured');
                }
            });
    }

    handleCountryChange = country => {
        // console.log("Setstst State", country)
        this.setState({ country });
        this.setState({ country: country });

        this.setState({ loader: true });
        let payload = {
            country_id: country
        };
        Api.getstatelist(payload)
            .then((response) => {
                //console.log("Response In Page Add Client country",response)
                if (response.status == 200) {

                    let data = response.data.data;
                    var itemArr3 = [];
                    for (var i = 0; i < data.length; i++) {
                        itemArr3.push({ ['value']: data[i].id, ['label']: data[i].state_name });
                    }

                    this.setState({
                        states: Array.from(itemArr3),
                        loader: false
                    })
                    //resolve();
                } else {
                    this.setState({
                        states: []
                    })
                    //reject();
                }
            })
            .catch(function (err) {
                if (err) {
                    toast.error(err.error);
                } else {
                    toast.error('Some error occured');
                }
            });
    };


    handleStateChange = selectedState => {
        this.setState({ selectedState });
        this.setState({ selectedState: selectedState });

    };


    onImageChange(event) {
        if (event.target.files[0]) {
            if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg") {
                let temp = URL.createObjectURL(event.target.files[0]);
                this.setState({ newProfilePic: temp, file: event.target.files[0] });
            }
            else {
                toast.error("Only JPG,JPEG and PNG files can be uploaded!");
            }
        }
        else {
            this.setState({ newProfilePic: "", file: "" })
        }
    }

    uploadImage(id) {
        return new Promise((resolve, reject) => {
            if (this.state.newProfilePic !== "" && this.state.file !== "") {
                let config = Object.assign({}, AWS_CONFIG, { dirName: AWS_CONFIG.dirName + "/admin-user/" + id });
                //console.log("Config", config)
                S3FileUpload
                    .uploadFile(this.state.file, config)
                    .then(data => {
                        resolve(data.location);
                        console.log("datalocation", data.location)
                        this.setState({ S3location: data.location },
                            () => { console.log("Loll", this.state.S3location) })
                    })
                    .catch(err => {
                        resolve("");
                    });
            }
            else {
                resolve("")
            }
        })
    }


    addAdmin = () => {
        this.setState({ loader: true });
        var lengthCode = this.state.dialCode.length
        var phone1 = this.state.pNo.slice(lengthCode, this.state.pNo.length)

        // console.log("Phone Number", phone1)
        // console.log("Country Code", this.state.dialCode)
    
        if (this.validator.allValid()) {
            let payload = {
                company_name: this.state.name,
                email: this.state.emailid,
                mobile_number: phone1 == "" ? null : phone1,
                country_code: this.state.dialCode == "" ? null : this.state.dialCode,
                password: this.state.password,
                reg_no: this.state.companyReg,
                pin_zip_code: this.state.Zipcode,
                country_id: this.state.country,
                state_id: this.state.selectedState,
                address: this.state.location,
            };
            console.log("Payload For Details", payload)
            Api.addcompany(payload).then(res => {
                if (res && res.data && res.data.data && res.status === 200) {
                    let newid = res.data.data.id
                    this.uploadImage(newid).then(newProfilePicURL => {
                        let updatePayload = {
                            id: newid,
                            profile_picture: this.state.S3location ? this.state.S3location : ""
                        }
                        console.log("PAYLOAD FOR PORFILE PICTURE DETAILS",updatePayload)
                        Api.updateProfile(updatePayload).then(res => {
                            if (res && res.data && res.data.data && res.status === 200) {
                                console.log("Updated SuccessFully")
                                toast.success("Client Added successfully!");
                                this.props.history.push("/ClientManagement");
                                this.setState({
                                    loader: false, newProfilePic: "", name: "", emailid: "", password: "", companyReg: "",
                                    Zipcode: "", country: "", states: ""
                                })
                            }
                        })
                            .catch(err => {
                                toast.error("Some error occurred!");
                                this.setState({ loader: false })

                            });
                    });
                }
                else if (res.status === 400) {
                    toast.error(res.data.message);
                    this.setState({ loader: false })

                }
                else {
                    toast.error("Some error occurred!");
                    this.setState({ loader: false })
                }
            })
                .catch(err => {
                    toast.error("Some error occurred!");
                    this.setState({ loader: false })

                })
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }
    }

    CancelButton = () => {
        this.validator.hideMessages();
        //window.location.reload();
        this.setState({
            loader: false, newProfilePic: "", name: "", emailid: "", password: "", companyReg: "",
            Zipcode: "", country: "",
            selectedState: "", location: "", dialCode: "", phone: "", address: ""
        })
    }



    handlePhoneNo = (no, country, event, formmatedValue) => {
       //console.log("Formated value",formmatedValue)
        this.setState({
            phone: no, dialCode: "+" + country.dialCode,
            pNo: formmatedValue, countryName: country.name,
            countryCode: country.countryCode

        }, () => {
            //console.log("main number", this.state.phone)
           console.log("Separated", this.state.pNo)
            console.log("COuntry Code", this.state.dialCode)
        });
    }

    // handlePhoneNo = (no, country, event, formmatedValue) => {
    //     this.setState({
    //         phone: '+' + country.dialCode,
    //         dialCode: country.dialCode, pNo: event.target && event.target.value, countryName: country.name,
    //         countryCode: country.countryCode
    //     }, () => {
    //         console.log("pNo", this.state.phone)
    //         console.log("DIAL CODE",this.state.dialCode)
    //     });
    // }

    // handlePhoneNo = (no, country, e, formmatedValue) => {
    //     this.setState({
    //         dialCode: "+" + country.dialCode,
    //         code: country.countryCode,
    //         countryName: country.name,
    //         phone: e.target && e.target.value,
    //     });
    // };




    render() {
        const txtformat =
        {
            textTransform: 'uppercase'
        }
        const { Option } = Select;
        return (
            <div>
                <div className="d-flex mr-b-20">
                    <span className="Client-Add-Plan-pages mr-auto">Create New Client</span>
                    <span className="Day-week-buttons-Price">
                        <Link to="/dashboard">
                            <span className="Home-Add-Plan-Client">Home </span>
                        </Link>
                        <span className="chevron-right-1-Plan-Client">&gt;</span>
                        <Link to="/ClientManagement">
                            <span className="Price-Plan-Date-Client">Client</span>
                        </Link>
                        <span className="chevron-right-1-Plan-Client">&gt;</span>
                        <span className="Add-Plan-Client-Add-Create">Create New Client</span>
                    </span>

                </div>
                <div>
                    {this.state.loader ? <Loader /> : null}
                    <span style={this.state.loader ? { opacity: '0.4' } : null}>
                        <div className="Client-Add-Plan">
                            <div className="Client-Add-plan-Tag">
                                <span className="Client-plan-tags">Company Name*</span>
                                <span className="Client-input-fileds-plans-pages">
                                    <Input
                                        className="Client-input-fileds-plans-pages"
                                        placeholder="Name"
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.setStateFromInputAdd.bind(this)}
                                    >
                                    </Input>
                                    <div className="err-message-email">
                                        {this.validator.message('Company Name', this.state.name, 'required')}
                                    </div>
                                </span>
                                <span className="Client-plan-tags">Email Id*</span>
                                <span className="Client-input-fileds-plans-pages">
                                    <Input
                                        className="Client-input-fileds-plans-pages"
                                        placeholder="Email Id"
                                        name='emailid'
                                        value={this.state.emailid}
                                        onChange={this.setStateFromInputAdd.bind(this)}
                                    >
                                    </Input>
                                    <div className="err-message-email">
                                        {this.validator.message('Email Id', this.state.emailid, 'required|email')}
                                    </div>
                                </span>



                                <span className="Client-plan-tags mr-bottom-12">Password*</span>
                                <span className="pass-input-fileds">
                                    <Input
                                        placeholder="Enter Password"
                                        className="pass-input-fileds"
                                        prefix={<i className="icon-pass" aria-hidden="true" />}
                                        type={this.state.hiddennew ? "password" : "text"}
                                        name="password" suffix={this.state.hiddennew ?
                                            <EyeOutlined onClick={this.toggleShowNew} /> : <EyeInvisibleOutlined onClick={this.toggleShowNew} />}
                                        value={this.state.password}
                                        onChange={this.setStateFromInputAdd.bind(this)} >
                                    </Input>
                                    <div className="err-message-email mt-9">
                                        {this.validator.message('Password', this.state.password, 'required|min:8')}
                                    </div>
                                </span>

                                <span className="Client-plan-tags">Company Reg.No*</span>
                                <span className="Client-input-fileds-plans-pages">
                                    <Input
                                        style={txtformat}
                                        className="Client-input-fileds-plans-pages"
                                        placeholder="AMHTH000JKI"
                                        name='companyReg'
                                        value={this.state.companyReg}
                                        onChange={this.setStateFromInputAdd.bind(this)}>
                                    </Input>
                                    <div className="err-message-email">
                                        {this.validator.message('Company Register No', this.state.companyReg, 'required|alpha_num|max:20')}
                                    </div>
                                </span>
                                <span className="Client-plan-tags">PIN/ZIP Code*</span>
                                <span className="Client-input-fileds-plans-pages">
                                    {/* {console.log("Code ni lenght", this.state.code)} */}
                                    <Input
                                        className="Client-input-fileds-plans-pages"
                                        placeholder="Enter pin/zip code"
                                        name='Zipcode'
                                        type="number"
                                        value={this.state.Zipcode}
                                        onChange={this.setStateFromInputAdd.bind(this)}>
                                    </Input>
                                    <div className="err-message-email">
                                        {this.state.Zipcode.length > 0 ?
                                            this.state.Zipcode.length >= 6 && this.state.Zipcode.length <= 9 ?
                                                "" : "Code Number should be of mininmun length 6 and maximum length must be 9" : ""}
                                        {this.validator.message('Pin Code', this.state.Zipcode, 'required')}
                                    </div>
                                </span>


                                <span className="Client-plan-tags seletecdcountryvalue">Country*</span>
                                <div className="mr-top-12 selectFroCoutnry">
                                    <Select
                                        showSearch
                                        value={this.state.country}
                                        name='country'
                                        onChange={this.handleCountryChange}
                                        style={{ width: '100%' }}
                                        placeholder="Country"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.countries && this.state.countries.length > 0
                                            ? this.state.countries.map((dynamicData, i) => (
                                                <Option value={dynamicData.value} key={i}>

                                                    {dynamicData.label}
                                                </Option>
                                            ))
                                            : null}
                                    </Select>
                                </div>

                                <div className="err-message-email mt-9">
                                    {this.validator.message('country', this.state.country, 'required')}
                                </div>

                                <span className="Client-plan-tags seletecdcountryvalue">State*</span>
                                <div className="mr-top-12 selectFroCoutnry">
                                    <Select
                                        showSearch
                                        value={this.state.selectedState || undefined}
                                        name='selectedState'
                                        onChange={this.handleStateChange}
                                        style={{ width: '100%' }}
                                        placeholder="State"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.states && this.state.states.length > 0
                                            ? this.state.states.map((dynamicData, i) => (
                                                <Option value={dynamicData.value} key={i}>
                                                    {dynamicData.label}
                                                </Option>
                                            ))
                                            : null}
                                    </Select>
                                </div>
                                <div className="err-message-email mt-9">
                                    {this.validator.message('state', this.state.selectedState, 'required')}
                                </div>
                                <span className="Client-plan-tags">Address*</span>
                                <span className="Client-input-fileds-plans-pages">
                                    <Input
                                        className="Client-input-fileds-plans-pages"
                                        placeholder="Enter Address"
                                        name='location'
                                        value={this.state.location}
                                        onChange={this.setStateFromInputAdd.bind(this)}>
                                    </Input>
                                    <div className="err-message-email">
                                        {this.validator.message('Address', this.state.location, 'required')}
                                    </div>
                                </span>

                                <span className="Client-plan-tags Profile-pictyue mb-20">Contact Number*</span>
                                <div className="phoneinputfield">
                                    <PhoneInput
                                        className="form-control py-2 w-100"
                                        country={'us'}
                                        value={this.state.phone}
                                        onChange={this.handlePhoneNo}
                                        autoFormat={true}
                                        style={{ width: '100%' }}
                                    // enableSearch={false}
                                    // disableSearchIcon={true}
                                    // countryCodeEditable={false}
                                    //placeholder="+1 8990-9898"
                                    />
                                    {console.log("html content",this.state.pNo)}
                                    <div className="err-message-email mt-9">
                                        {this.validator.message('Contact Number', this.state.pNo, 'required')}
                                    </div>
{/* 
                                    country_code
                                    mobile_number */}
                                </div>

                                <span className="Super-Price-First">Profile Picture</span>
                                <div className="d-flex mr-top-12 SuperMethod">
                                    {
                                        this.state.newProfilePic !== "" ?
                                            <img src={this.state.newProfilePic} width={150} height={150} alt="Profile" />
                                            : <div style={{ width: "180px", height: "178px", border: "1px solid #c8ced3", objectfit: 'cover' }}></div>
                                    }

                                    <span className="ml-4 Super-Create-button mr-top-5">
                                        <span className="Button-Super-Create" onClick={() => { this.refs["fileUploaderBanner"].click() }} >
                                            <span className="Super-Create">Select</span>
                                        </span>
                                        <input className="d-none" type="file" ref="fileUploaderBanner" accept=".png,.jpg,.jpeg" onChange={this.onImageChange.bind(this)} />
                                    </span>

                                </div>
                                {/* <div className="err-message-email mt-9">
                                    {this.validator.message('Profile Picture', this.state.file, 'required')}
                                </div> */}

                            </div>



                            <hr className="hr-styling"></hr>
                            <div className="d-flex">
                                <div className="Client-Cancel-button mr-bottom-17" onClick={() => { this.CancelButton() }}>
                                    <div className="Button-Client-Cancel">
                                        <span className="Client-Cancel">Cancel</span>
                                    </div>
                                </div>

                                <div className="Client-Add-Create-button" onClick={() => { this.addAdmin() }}>
                                    <div className="Button-Client-Add-Create">
                                        <span className="Client-Add-Create">Create</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
                <div>
                    <div className="footer-styling">© 2022, Sameteam all right reserved</div>
                </div>
            </div>
        )
    }
}

export default AddClient
