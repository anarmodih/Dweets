import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { DatePicker } from 'antd';
import { TimePicker } from "antd";


class AddPromotions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AssignableButton: true,
            OpenForAllButton: false,
            CreateButton:true,
            CancelButton:false
        };
    }

    onChange(date, dateString) {
        console.log(date, dateString);
    }


    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }


    OpenForAllButton = () => {
        this.setState({ AssignableButton: true, OpenForAllButton: false });
    }


    AssignableButton = () => {
        this.setState({ AssignableButton: false, OpenForAllButton: true }, () => { console.log("true", this.state.AssignableButton) });
    }

    CancelButton = () => {
        this.setState({ CreateButton: true, CancelButton: false });
    }


    CreateButton = () => {
        this.setState({ CreateButton: false, CancelButton: true }, () => { console.log("true", this.state.CreateButton) });
    }




    render() {
        return (
            <div>
                <div className="d-flex mr-b-20">

                    <span className="Add-promotions-Page mr-auto">Create Promotion</span>
                    <span>
                        <span className="home-Add-Promotions-Page">Home </span>
                        <span className="chevron-right-1-Add-Promotions-Page">&gt;</span>
                        <span className="Priceandplan-Add-Promotions-Page">Promotions</span>
                        <span className="chevron-right-1-Add-Promotions-Page">&gt;</span>
                        <span className="create-plan-Add-Promotions-Page">Create New Promotion</span>
                    </span>

                </div>
                <div>
                    <div className="Border-div-Add-Promotions-Page">
                        <div className="main-div-class-plan-Add-Promotions-Page">
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                        <span className="Promotions-text">Promotion name*</span>
                                        <span className="Promotions-Input-Fields">
                                            <Input
                                                className="Promotions-Input-Fields"
                                                placeholder="Plan Name">
                                            </Input>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="Promotions-text">Start Date*</span>
                                        <div className=" d-flex mr-bottom-40">
                                            <span className="Date-picker-for-start">
                                                <DatePicker
                                                    onChange={this.onChange()} placeholder="Choose Date" />
                                            </span>
                                            <span className="time-date-picker">
                                                <TimePicker onChange={this.onChange()} placeholder="Choose Time" />
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="Promotions-text">Scope</span>
                                        <div className="mr-top-13">
                                            {this.state.OpenForAllButton === false ?
                                                <span className="Scope-button-open-all">
                                                    <Button>
                                                        <span className="Scope-button-open-all-text">Open For All</span>
                                                    </Button>
                                                </span> :
                                                <span className="Scope-second-button">
                                                    <Button onClick={this.OpenForAllButton}>
                                                        <span className="Scope-button-open-all-texted">Open For All</span>
                                                    </Button>
                                                </span>}

                                            {this.state.AssignableButton === false ?
                                                <span className="Scope-button-open-all">
                                                    <Button>
                                                        <span className="Scope-button-open-all-text">Assignable</span>
                                                    </Button>
                                                </span> :
                                                <span className="Scope-second-button">
                                                    <Button onClick={this.AssignableButton}>
                                                        <span className="Scope-button-open-all-texted">Assignable</span>
                                                    </Button>
                                                </span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div>
                                        <span className="Promotions-text">Description*</span>
                                        <span className="Promotions-Input-Fields">
                                            <Input
                                                className="Promotions-Input-Fields"
                                                placeholder="Description here">
                                            </Input>
                                        </span>

                                        <div>
                                            <span className="Promotions-text">End Date*</span>
                                            <div className=" d-flex">
                                                <span className="Date-picker-for-start">
                                                    <DatePicker
                                                        onChange={this.onChange()} placeholder="Choose Date" />
                                                </span>
                                                <span className="time-date-picker">
                                                    <TimePicker onChange={this.onChange()} placeholder="Choose Time" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="hr-styling"></hr>
                        <div className="d-flex">

                            {this.state.CancelButton === false ?
                                <span className="Cancel-Button-Class-Add-promotions Stylingformargin">
                                    <Button>
                                        <span className="Create-Cancel-button-Styless">Cancel</span>
                                    </Button>
                                </span> :
                                <span className="ButtonCreateCancelbuton">
                                    <Button onClick={this.CancelButton}>
                                        <span className="Create-Cancel-Button-text-style">Cancel</span>
                                    </Button>
                                </span>}

                            {this.state.CreateButton === false ?
                                <span className="Cancel-Button-Class-Add-promotions">
                                    <Button>
                                        <span className="Create-Cancel-button-Styless">Create</span>
                                    </Button>
                                </span> :
                                <span className="ButtonCreateCancelbuton">
                                    <Button onClick={this.CreateButton}>
                                        <span className="Create-Cancel-Button-text-style">Create</span>
                                    </Button>
                                </span>}



                            {/* <div className="Cancel-button">
                                <Button className="Button-Cancel">
                                    <span className="cancel-promotions">Cancel</span>
                                </Button>
                            </div>
                            <div>
                                <div className="Create-button">
                                    <Button className="Button-Created-button">
                                        <span className="Create">Create</span>
                                    </Button>
                                </div>
                            </div> */}
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

export default AddPromotions
