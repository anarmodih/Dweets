import React, { Component } from 'react';
import { Input, Button } from 'antd';
import eye from "../../assets/images/eye-plan.png";
import serach from "../../assets/images/searchicon.png";
import { Link } from "react-router-dom";
import { Switch } from 'antd';
import { Select } from 'antd';
import deleted from "../../assets/images/Delete.png";
import edit from "../../assets/images/edit.png";
import { Table } from 'antd';
import plus from "../../assets/images/plus.png";
import Group from "../../assets/images/Group.png";
const { Option } = Select;


class Promotions extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }


    columns = [

        {
            title: 'Promotion Name',
            dataIndex: 'PromotionName',
            key: 'PromotionName',
            sorter: {
                compare: (a, b) => a.PromotionName - b.PromotionName,
                multiple: 3,
            },
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',

        },
        {
            title: 'Start date',
            dataIndex: 'Startdate',
            key: 'Startdate',
        },
        {
            title: 'End date',
            dataIndex: 'Enddate',
            key: 'Enddate',
        },
        {
            title: 'Scope',
            dataIndex: 'Scope',
            key: 'Scope',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
    ];


    dataSource = [
        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <Switch  defaultChecked />,
            Action: <span className="d-flex justify-content-around">
                <Link to="/View-deatils-promotions">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },

        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <Switch defaultChecked />,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },

        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <Switch defaultChecked />,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },
      
        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <Switch defaultChecked />,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },
        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <Switch defaultChecked />,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },

        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <Switch defaultChecked />,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },
        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <Switch defaultChecked />,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },
        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <span className="Completed-text-form-Promtions">
                <span className="Class-Completed-text">Completed</span>

            </span>,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },
        {
            key: '1',
            PromotionName: 'Happy New Year 01',
            Description: "Promotion description here…",
            Startdate: '01-03-2022 00:00 PM',
            Enddate: '01-03-2022 11:59 PM',
            Scope: 'Open for all',
            Status: <span className="Completed-text-form-Promtions">
                <span className="Class-Completed-text">Completed</span>

            </span>,
            Action: <span className="d-flex justify-content-around">
                <Link to="/view-details-plan">
                    <img className="Promitons-Delete-Incons" src={eye} />
                </Link>
                <img className="Promitons-Delete-Incons" src={edit} />
                <img className="Promitons-Delete-Incons" src={deleted} />
                <img className="Promitons-Delete-Incons" src={Group} />
            </span>
        },

    ];

    render() {
        return (
            <div>
                <div className="d-flex mr-b-23">

                    <span className="Promtions-Page mr-auto">Promotions</span>
                    <span className="Promotions-Based-Modules">
                        <Input
                            className="Promitons-Serach-Placeholder"
                            prefix={<img src={serach} alt="logo" className="" />}
                            placeholder="Serach"
                        />
                        <Select defaultValue="All Path" style={{ width: 138 }} onChange={this.handleChange()}>
                            <Option value="All Path">Choose Status</Option>
                        </Select>
                        <Link to="/add-promotions" className="Promitons-Day-Week-Price-buttons">
                            <Button>
                                <img className="Promtions-PLan-Images" src={plus} />
                                <span className="Promtions-Add-Plan-Promo">ADD PROMO</span>
                            </Button>
                        </Link>
                    </span>

                </div>
                <div>
                    <Table className="Promtions-table-management" dataSource={this.dataSource} columns={this.columns} onChange={this.onChange()} />
                </div>
                <div>
                    <span className="footer-styling">© 2022, Sameteam all right reserved</span>
                </div>
            </div>
        )
    }
}

export default Promotions
