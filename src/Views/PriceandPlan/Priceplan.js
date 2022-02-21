import React, { Component } from 'react';
import { Input, Button } from 'antd';
import eye from "../../assets/images/eye-plan.png";
import serach from "../../assets/images/searchicon.png";
import { Link } from "react-router-dom";

import { toast } from 'react-toastify';
import { Switch , Pagination } from 'antd';
import { Modal } from 'antd';
import Api from "../../Api/ApiUtils";
import LocalStorage from '../../Api/LocalStorage';
import { Select } from 'antd';
import deleted from "../../assets/images/Delete.png";
import edit from "../../assets/images/edit.png";
import { Table } from 'antd';
import plus from "../../assets/images/plus.png";
const { Option } = Select;

class Priceplan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cancelmodal: false,
            page: 0,
            limit: 10,
            sortOrder: '',
            allUserCount: 0,
            sorterCol: '',
            adminpage: []
        };
    }


    componentDidMount = () => {
        LocalStorage.getItem("Super_Admin").then(user => {
            this.setState({ user: user, userid: user.id, loader: false },
                () => {
                    //console.log("User id from localdtorage", this.state.userid)
                })
        });
        let payload = {
            size: this.state.limit,
            page: this.state.page,
            search: this.state.serach
        }
        this._getAllBeatMass(payload);
    };

    _getAllBeatMass = (payload) => {
        this.setState({ loader: true });
        Api.getallplans(payload)
            .then((res) => {

                this.setState({
                    loader: false,
                    adminpage: res.data.data,
                    allUserCount: res.data.total_records
                })
            })
            .catch(function (err) {
                toast.error("Some Error Occurred");
            });
    }




    _handleUserPagination = (page) => {
        console.log('pagee', page);
        this.setState({ pageChecking: page, loader: true }, () => {
            const payload = {
                size: this.state.limit,
                page: this.state.pageChecking - 1,
                search: this.state.serach
            };
            console.log('payload', payload);
            this._getAllBeatMass(payload);
        });
    };






    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }


    imageClick = () => {
        console.log("inside the funcntion")
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
            title: 'Plan Name',
            dataIndex: 'plan_name',
            key: 'plan_name',

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',

        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Eligible Users',
            dataIndex: 'Eligibleusers',
            key: 'Eligibleusers',
        },
        {
            title: 'No.Sold',
            dataIndex: 'NoSold',
            key: 'NoSold',
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


    columnsDataForAssign = [
        {
            title: 'Name',
            dataIndex: 'name',
            // render: (text) => <a>{text}</a>,
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
    DataForAssign = [
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


    deleteCompany = () => {
        const payload = {
            id: this.state.deleteId
        };
        this.setState({ loader: true })
        Api.deleteplan(payload)
            .then((res) => {
                if (res) {
                    toast.success("Deleted successfully");
                    this.setState({ deletemodal: !this.state.deletemodal, loader: false }, () => {
                        let payload = {
                            size: this.state.limit,
                            page: this.state.page,
                            search: this.state.serach
                        }
                        this._getAllBeatMass(payload);
                    });
                }
            })
            .catch((err) => {
                if (err.errors)
                    toast.error(err.errors.msg);
                else
                    toast.error("Error Occurred");
                this.setState({ loader: false })
            });
    }

    deletefun = (id) => {
        console.log("id", id)
        this.setState({ deletemodal: true, deleteId: id })
    }


    activeStatus = (activestatusid) => {
        //console.log("activeStatus", activestatusid)
        this.setState({ activeStatusModal: true, activestatusid: activestatusid });
    }


    deactiveStatus = (deactiveStatusid) => {
        this.setState({ deactiveStatusModal: true, deactiveStatusid: deactiveStatusid });
    }

    deactiveStatusButton = () => {
        const payload = {
            id: this.state.deactiveStatusid,
            status: "active"
        };
        this.setState({ loader: true })
        Api.activeStatusApi(payload)
            .then((res) => {
                if (res) {
                    toast.success("Actived successfully");
                    this.setState({ deactiveStatusModal: !this.state.deactiveStatusModal, loader: false }, () => {
                        let payload = {
                            size: this.state.limit,
                            page: this.state.page,
                            search: this.state.serach
                        }
                        this._getAllBeatMass(payload);
                    });
                }
            })
            .catch((err) => {
                if (err.errors)
                    toast.error(err.errors.msg);
                else
                    toast.error("Error Occurred");
                this.setState({ loader: false })
            });
    }



    activeStatusbutton = () => {
        const payload = {
            id: this.state.activestatusid,
            status: "inactive"
        };
        this.setState({ loader: true })
        Api.activeStatusApi(payload)
            .then((res) => {
                if (res) {
                    toast.success("Deactived successfully");
                    this.setState({ activeStatusModal: !this.state.activeStatusModal, loader: false }, () => {
                        let payload = {
                            size: this.state.limit,
                            page: this.state.page,
                            search: this.state.serach
                        }
                        this._getAllBeatMass(payload);
                    });
                }
            })
            .catch((err) => {
                if (err.errors)
                    toast.error(err.errors.msg);
                else
                    toast.error("Error Occurred");
                this.setState({ loader: false })
            });
    }

    setStateFromInput(event) {
        // console.log("calllllll")
        var obj = {};
        if (event.target.name === "search") {
            // console.log("Serach", event.target.value)
            this.setState({ loader: true, search: event.target.value }, () => {
                const payload = {
                    size: this.state.limit,
                    page: this.state.page,
                    search: this.state.search
                };
                //console.log("Serach nu payload", payload)
                this._getAllBeatMass(payload);
            })
        }
        else {
            obj[event.target.name] = event.target.value;
            this.setState(obj);
        }
    }


    render() {
        let pendingData = this.state.adminpage && this.state.adminpage.length > 0 && this.state.adminpage.map((earningdata, i) => {
            return {
                key: i,
                plan_name: earningdata.plan_name,
                description: earningdata.description,
                price: earningdata.price,
                Eligibleusers: earningdata.eligible_users,
                //sold:earningdata.no_sold,
                Status: <div>
                    {
                        earningdata.status === "Active" ?
                            <Switch
                                checked={earningdata.status === "Active" ? true : false}
                                onClick={() => this.activeStatus(earningdata.id)}
                            /> :
                            <Switch
                                checked={earningdata.status === "Active" ? true : false}
                                onClick={() => this.deactiveStatus(earningdata.id)}
                            />
                    }
                </div>,
                Action: <span className="d-flex">
                    <Link to={"/view-details-plan/" + earningdata.id} 
                    >
                        <img className="Price-Delete-icon" src={eye} alt="" />
                    </Link>

                    <img className="Price-Delete-icon" src={edit} alt=""
                         />
                    <img onClick={() => { this.deletefun(earningdata.id) }}
                    className="Price-Delete-icon" src={deleted} alt="" />
                </span>,
            }
        })
        return (
            <div>
                <div className="d-flex mr-b-23">

                    <span className="Price-Plan-Pages mr-auto">Price & Plan</span>
                    <span className="Day-week-buttons-Price Price-Plan-button-Class">
                        <Input
                            className="Price-Plan-Placeholder"
                            prefix={<img src={serach} alt="logo" className="" />}

                            placeholder="Serach"
                            name="search" value={this.state.search}
                            onChange={this.setStateFromInput.bind(this)}

                        />
                        <Select defaultValue="All Path" style={{ width: 132 }} onChange={this.handleChange()}>
                            <Option value="All Path">All Path</Option>
                        </Select>
                        <Button onClick={() => this.imageClick()}>
                            Assign to customer
                        </Button>
                        <Link to="/add-plan">
                            <Button>
                                <img className="Plan-add-image" src={plus} alt="" />
                                <span className="add-plan-buttons">ADD PLAN</span>
                            </Button>
                        </Link>
                    </span>

                </div>
                <div>
                    <Table className="Price-Plan-Table-Management"
                        dataSource={pendingData}
                        pagination={false}
                        columns={this.columns}
                       //onChange={this.handleTableChange}
                    />
                </div>
                <div>
                    {this.state.allUserCount > 0 ? (
                        <Pagination
                            style={{ marginTop: "15px", float: 'right' }}
                            className="ant-users-pagination"
                            onChange={this._handleUserPagination.bind(this)}
                            pageSize={this.state.limit}
                            defaultCurrent={1}
                            total={this.state.allUserCount}
                        />
                    ) : (
                        ""
                    )}
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
                            columns={this.columnsDataForAssign}
                            dataSource={this.DataForAssign}
                        />
                    </div>

                    <div className="d-flex Modal-Button">
                        <div className="Cancel-button">
                            <div className="Button-Cancel">
                                <span className="Cancel">Cancel</span>
                            </div>
                        </div>

                        <div className="Create-button">
                            <div className="Button-Create">
                                <span className="Create">Add</span>
                            </div>
                        </div>
                    </div>

                </Modal>


                <Modal visible={this.state.deletemodal}
                    width={500}
                    onCancel={this.handleCanceldeletemodal}
                    className="Confirm-Delete">
                    <div className="Confirm-Delete-fucntio">
                        <span className="confirm-delete-text"> Confirm Delete

                        </span>
                    </div>
                    <div className="are-you-select">
                        Are you sure you want to delete?
                    </div>
                    <div className="d-flex">
                        <div className="Cancel-button" onClick={() => { this.deleteCompany() }}>
                            <div className="Button-Cancel">
                                <span className="Cancel">Yes</span>
                            </div>
                        </div>
                        <div className="Create-button" onClick={() => { this.setState({ deletemodal: false }) }}>
                            <div className="Button-Create">
                                <span className="Create">No</span>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Priceplan
