import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { Checkbox } from 'antd';

class AddPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MonthButton: true,
            YearButton: false
        };
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }

    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }


    YearButton = () => {
        this.setState({ MonthButton: true, YearButton: false });
    }


    MonthButton = () => {
        this.setState({ MonthButton: false, YearButton: true }, () => { console.log("true", this.state.MonthButton) });
    }






    render() {
        return (
            <div>
                <div className="d-flex mr-b-20">

                    <span className="Plan-add-pages mr-auto">Create New Plan</span>
                    <span className="Day-week-buttons-Price">
                        <span className="Home-Add-Plan">Home </span>
                        <span className="chevron-right-1-Plan">&gt;</span>
                        <span className="Price-Plan-Date">Price & Plan  </span>
                        <span className="chevron-right-1-Plan">&gt;</span>
                        <span className="Add-Plan-create">Create New Plan</span>
                    </span>

                </div>
                <div>
                    <div className="Border-Div-Add-plan">
                        <div className="Plan-Add-Main">
                            <span className="Price-text-plan">Plan Name*</span>
                            <span className="price-input-filed">
                                <Input
                                    className="price-input-filed"
                                    placeholder="Event Name">
                                </Input>
                            </span>

                            <span className="Price-text-plan">Description*</span>
                            <span className="descritption-input-filed">
                                <Input
                                    className="descritption-input-filed"
                                    placeholder="Event Name">
                                </Input>
                            </span>

                            <div className="row">
                                <div className="col-md-6 Add-Paln-Colum">
                                    <span className="sectionsprices">Price</span>
                                    <span className="Enter-price">
                                        <Input
                                            placeholder="Enter price"
                                            suffix={
                                                <span>
                                                    {this.state.YearButton === false ?
                                                        <span className="mo-button">
                                                            <Button>
                                                                <span className="mo-button-text">Mo</span>
                                                            </Button>
                                                        </span> :
                                                        <span className="mo-buttonss">
                                                            <Button onClick={this.YearButton}>
                                                                <span className="mo-button-texted">Mo</span>
                                                            </Button>
                                                        </span>}

                                                    {this.state.MonthButton === false ?
                                                        <span className="mo-button">
                                                            <Button>
                                                                <span className="mo-button-text">Yr</span>
                                                            </Button>
                                                        </span> :
                                                        <span className="mo-buttonss">
                                                            <Button onClick={this.MonthButton}>
                                                                <span className="mo-button-texted">Yr</span>
                                                            </Button>
                                                        </span>}
                                                </span>
                                            }
                                        >
                                        </Input>
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="sectionsprices">Eligible users</span>
                                    <span className="Enter-priceed">
                                        <Input
                                            placeholder="Enter no."
                                        >
                                        </Input>
                                    </span>
                                </div>
                            </div>

                            <div className="features">Features</div>

                            <Checkbox.Group style={{ width: '100%' }}
                                className="Main-checkboxed-style"
                                onChange={this.onChange}>
                                <div className="main-schedule">
                                    <Checkbox value="A">
                                        <span className="schedule">
                                            Schedule unlimited on-site and/or virtual event tasks
                                        </span>
                                    </Checkbox>
                                </div>
                                <div className="main-schedule">

                                    <Checkbox value="B">
                                        <span className="schedule">Receive task notification reminders
                                        </span></Checkbox>
                                </div>
                                <div className="main-schedule">
                                    <Checkbox value="C">
                                        <span className="schedule">Assign tasks to other team members
                                        </span></Checkbox>
                                </div>
                                <div className="main-schedule">
                                    <Checkbox value="D">
                                        <span className="schedule">Add unlimited events
                                        </span></Checkbox>

                                </div>
                                <div className="main-schedule">
                                    <Checkbox value="E">
                                        <span className="schedule">Chat/video calls with your team
                                        </span></Checkbox>
                                </div>
                                <div className="main-schedule">
                                    <Checkbox value="F">
                                        <span className="schedule">Chat/video calls with volunteers and outside event staff from within app
                                        </span></Checkbox>
                                </div>

                                <div className="main-schedule">
                                    <Checkbox value="J">
                                        <span className="schedule">
                                            Schedule unlimited on-site and/or virtual event tasks
                                        </span></Checkbox>
                                </div>

                                <div className="main-schedule">
                                    <Checkbox value="H">
                                        <span className="schedule">
                                            Receive task notification reminders
                                        </span></Checkbox>
                                </div>
                                <div className="main-schedule">
                                    <Checkbox value="I">
                                        <span className="schedule">
                                            Assign tasks to other team members
                                        </span></Checkbox>
                                </div>

                            </Checkbox.Group>


                        </div>
                        <hr className="hr-styling"></hr>
                        <div className="d-flex">
                            <div className="Cancel-button">
                                <div className="Button-Cancel">
                                    <span className="Cancel">Cancel</span>
                                </div>
                            </div>

                            <div className="Create-button">
                                <div className="Button-Create">
                                    <span className="Create">Create</span>
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

export default AddPlan
