import React, { Component } from 'react';
import tickmarker from "../../assets/images/tickmark.png";
import deleted from "../../assets/images/trash-2.png";
import edit from "../../assets/images/edit-2.png";

class ViewDetails extends Component {

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

                    <span className="Plan-View-Details-Pages mr-auto">Plan Details</span>
                    <span className="Vieew-Details-Price-plan-Days">
                        <span className="View-detaiks-Price-Plans-home">Home </span>
                        <span className="chevron-right-1-View-details-plans">&gt;</span>
                        <span className="View-detaikls-price-plan">Price & Plan  </span>
                        <span className="chevron-right-1-View-details-plans">&gt;</span>
                        <span className="Creat-Plan-View-details">Plan Details</span>
                    </span>

                </div>
                <div>
                    <div className="View-Details-Plan-Border">
                        <div className="d-flex">
                            <span className="View-details-plan-view-basic mr-auto">Basic</span>
                            <span className="Vieew-Details-Price-plan-Days">
                                <span className="upper-class-name-view">
                                    <img className="Icon-Vieww-details" src={edit} alt="" />
                                </span >
                                <span className="VIew-details-SecondPlans">
                                    <img className="Icon-Vieww-details" src={deleted} alt="" />
                                </span>


                            </span>

                        </div>
                        <div className="Price-Loreum-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className="d-flex">
                            <div className="main-price">
                                <div className="View-details-Price-tex">
                                    Price
                                </div>
                                <div className="price">
                                    $11.95/Mo
                                </div>

                            </div>
                            <div className="main-price">
                                <div className="VIew-DetailsPricepLan-texted">
                                    Eligible users
                                </div>
                                <div className="price">
                                    25
                                </div>

                            </div>

                        </div>
                        <div className="Features-class">
                            Features
                        </div>

                        <div className="checkboxed-value">
                            <div className="main-checkboxed">
                                <img src={tickmarker} className="tickmarker" alt=""></img>
                                <span className="checkbox-text-value">
                                    Schedule unlimited on-site and/or virtual event tasks
                            </span>
                            </div>
                            <div className="main-checkboxed">
                                <img src={tickmarker} className="tickmarker" alt=""></img>
                                <span className="checkbox-text-value">
                                    Schedule unlimited on-site and/or virtual event tasks
                            </span>
                            </div>
                            <div className="main-checkboxed">
                                <img src={tickmarker} className="tickmarker" alt=""></img>
                                <span className="checkbox-text-value">
                                    Schedule unlimited on-site and/or virtual event tasks
                            </span>
                            </div> <div className="main-checkboxed">
                                <img src={tickmarker} className="tickmarker" alt=""></img>
                                <span className="checkbox-text-value">
                                    Schedule unlimited on-site and/or virtual event tasks
                            </span>
                            </div>
                            <div className="main-checkboxed">
                                <img src={tickmarker} className="tickmarker" alt=""></img>
                                <span className="checkbox-text-value">
                                    Schedule unlimited on-site and/or virtual event tasks
                            </span>
                            </div>
                            <div className="main-checkboxed">
                                <img src={tickmarker} className="tickmarker" alt=""></img>
                                <span className="checkbox-text-value">
                                    Schedule unlimited on-site and/or virtual event tasks
                            </span>
                            </div> <div className="main-checkboxed">
                                <img src={tickmarker} className="tickmarker" alt=""></img>
                                <span className="checkbox-text-value">
                                    Schedule unlimited on-site and/or virtual event tasks
                            </span>
                            </div>

                        </div>

                    </div>
                </div>
                <div>
                    <div className="footer-styling-View-Details-Page">© 2022, Sameteam all right reserved</div>
                </div>
            </div>
        )
    }
}

export default ViewDetails
