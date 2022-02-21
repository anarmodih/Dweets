import React, { Component } from 'react';
import { Input } from 'antd';
import { Modal } from 'antd';
import { Select, Table } from 'antd';
import deleted from "../../assets/images/PromotionsTrash.png";
import edit from "../../assets/images/PromotionEdit.png";
import reset from "../../assets/images/PromotionsDetails.png";
const { Option } = Select;

class ViewDetailsPromotions extends Component {
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




    showModalCancelSupport = () => {
        this.setState({
            cancelmodal: true,
        });
    };

    handleCancel = e => {
        this.setState({
            cancelmodal: false,
        });

    };



    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email Id',
            dataIndex: 'EmailId',
        },
        {
            title: 'Plan',
            dataIndex: 'Plan',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'ExpiryDate',
        },
    ];
    data = [
        {
            key: '1',
            name: 'John Brown',
            EmailId: 'hello@geekyants.com',
            Plan: 'Basic',
            ExpiryDate: '03-06-2022'
        },
        {
            key: '2',
            name: 'John Brown',
            EmailId: 'hello@geekyants.com',
            Plan: 'Basic',
            ExpiryDate: '03-06-2022'
        }, {
            key: '3',
            name: 'John Brown',
            EmailId: 'hello@geekyants.com',
            Plan: 'Basic',
            ExpiryDate: '03-06-2022'
        }, {
            key: '4',
            name: 'John Brown',
            EmailId: 'hello@geekyants.com',
            Plan: 'Basic',
            ExpiryDate: '03-06-2022'
        }, {
            key: '5',
            name: 'John Brown',
            EmailId: 'hello@geekyants.com',
            Plan: 'Basic',
            ExpiryDate: '03-06-2022'
        },

    ];

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   name: record.name,
        // }),
    };


    render() {
        return (
            <div>
                <div className="d-flex mr-b-20">

                    <span className="Information-Details-page-promotions mr-auto">Promotion Details</span>
                    <span>
                        <span className="home-detailsPromotionsVIew">Home </span>
                        <span className="chevron-right-1-detailsPromotionsVIew">&gt;</span>
                        <span className="Priceandplan-detailsPromotionsVIew">Promotions</span>
                        <span className="chevron-right-1-detailsPromotionsVIew">&gt;</span>
                        <span className="Create-plan-promtions">Details</span>
                    </span>

                </div>
                <div>
                    <div className="View-details-promotiom-page-border">
                        <div className="Background-color-image">

                        </div>
                        <div className="d-flex">
                            <span className="View-details-plna-name mr-auto">New Year Sale</span>
                            <span className="View-Detaiks-PromotiomsPage">
                                <span className="upper-clas-Promtions">
                                    <img src={edit} onClick={this.showModalCancelSupport} />
                                </span >

                                <span className="upper-clas-Promtions">
                                    <img src={reset} />
                                </span >



                                <span className="second-clas-Promtions">
                                    <img src={deleted} />
                                </span>


                            </span>

                        </div>
                        <div className="Text-displayong-Page">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className="d-flex">
                            <div className="main-price">
                                <div className="Price-text-View-details-Pages">
                                    Start Date
                                </div>
                                <div className="Price-for-Details-page">
                                    01-01-2022 00:00 AM
                                </div>

                            </div>
                            <div className="main-price">
                                <div className="View-Details-Promtions-Page">
                                    End Date
                                </div>
                                <div className="Price-for-Details-page">
                                    10-01-2022 11:59 MM
                                </div>
                            </div>

                        </div>

                        <div>
                            <div className="Features-Class-Promoitons-Page-name">
                                Scope
                            </div>
                            <div className="open-for-all">
                                Open for All
                            </div>
                        </div>

                        <div>
                            <div className="Conditions-text">
                                Conditions
                            </div>
                            <div className="Main-border-form">
                                <div className="row">
                                    <div className="col-4 styling-for-borders">
                                        <div className="target">
                                            <div className="text-target">
                                                Target
                                            </div>
                                        </div>
                                        <div className="text-type">
                                            Type
                                        </div>
                                        <div className="basic-type-text">
                                            Basic Plan
                                        </div>
                                    </div>


                                    <div className="col-4 Second-Border-styling">
                                        <div className="target">
                                            <div className="text-target">
                                                Criteria
                                            </div>
                                        </div>
                                        <div className="text-type">
                                            Type
                                        </div>
                                        <div className="basic-type-text">
                                            Expires - 05 Days
                                        </div>
                                    </div>

                                    <div className="col-4 third-for-borders">
                                        <div className="target">
                                            <div className="text-target">
                                                Action
                                            </div>
                                        </div>
                                        {/* <div className="text-type mr-auto">
                                        </div> */}
                                        <div className="">
                                            <span className="text-type-adjustment">
                                                Adjustmet type
                                            </span>
                                            <span className="value">
                                                Value
                                            </span>

                                        </div>

                                        <div className="">
                                            <div className="Discount-percentage">
                                                Discount Percentage
                                            </div>
                                            <span className="values">
                                                05%
                                            </span>

                                        </div>




                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="footer-styling">© 2022, Sameteam all right reserved</div>
                </div>

                <Modal visible={this.state.cancelmodal}
                    width={1015}
                    onCancel={this.handleCancel}
                    className="modal-assign" >
                    <div className="Assign-Customer">
                        Assign to Customer
                    </div>
                    <div className="d-flex">
                        <div>
                            <span className="Search-Customer">Search Customer</span>
                            <div className="Main-serach">
                                <Input className="serach-customer" placeholder="Seach by username & Email ID">

                                </Input>
                            </div>
                        </div>
                        <div>
                        <span className="Search-Customer">Search by plan</span>
                        <div className="select-button-for-assign">
                            <Select defaultValue="All Path" onChange={this.handleChange()}>
                                <Option value="All Path">All Path</Option>
                            </Select>
                        </div>
                        </div>
                       

                    </div>
                    <div className="Table-styling">
                        <Table
                            rowSelection={{
                                type: this.state.selectionType,
                                ...this.rowSelection,
                            }}
                            columns={this.columns}
                            dataSource={this.data}
                        />
                    </div>
                </Modal>


            </div>
        )
    }
}

export default ViewDetailsPromotions
