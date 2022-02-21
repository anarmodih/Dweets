import React, { Component } from 'react';
import { Input } from 'antd';
import serach from "../../assets/images/searchicon.png";
import { Switch } from 'antd';
import { toast } from 'react-toastify';
import { Select, Button, Modal } from 'antd';
import Api from "../../Api/ApiUtils";
import deleted from "../../assets/images/Delete.png";
import plus from "../../assets/images/plus.png";
import Loader from "../../Views/Loader/Loader";
import { Link } from "react-router-dom";
import DownArrow from "../../assets/images/DownArrow.png";
import UpArrow from "../../assets/images/UpArrow.png";
import { Table } from 'antd';
import ModalImage from "react-modal-image";
import { Pagination } from 'antd';
import defaultpollimg from "../../assets/images/profile-icon.png";
const { Option } = Select;

class ClientManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            limit: 10,
            sortOrder: '',
            allUserCount: 0,
            sorterCol: '',

            adminpage: [],
            expandedRows: [],
            deletemodal: false,
            expandedRowKeys1: [],
            expandedCardsData: [],

        };
    }


    handleCanceldeletemodal = e => {
        this.setState({
            deletemodal: false,
        });

    };

    activeHandleCanel = e => {
        this.setState({
            activeStatusModal: false,
        });

    };
    deactiveHandleCanel = e => {
        this.setState({
            deactiveStatusModal: false,
        });

    };






    handleChange(value) {
        //console.log(`selected ${value}`);
    }

    componentDidMount = () => {
        let payload = {
            size: this.state.limit,
            page: this.state.page,
            search: this.state.serach
        }
        this._getAllBeatMass(payload);
    };

    _getAllBeatMass = (payload) => {
        this.setState({ loader: true });
        Api.getclients(payload)
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


    columns = [
        {
            title: 'Image',
            dataIndex: 'profilePicture',
            key: 'profilePicture',
            width: "20%",
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: "20%",
        },
        {
            title: 'Company Reg.No.',
            dataIndex: 'registrationNumber',
            key: 'registrationNumber',
            width: "20%",
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "17%",
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: "10%",
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            //width: '10px',
            //width: "10%",
            //colSpan: 1,
        },
        // { title: "", dataIndex: "", key: "expand", width: '10px', colSpan: 0 }
    ];


    expandRow(expanded, event) {
        this.setState({ loader: true })
        console.log("Expanded", event)
        if (expanded === true) {
            var keys = [];
            keys.push(event.cardId);
            this.setState({ expandedRowKeys1: keys });
            const payload = {
                id: event.cardId
            };
            this.setState({ loader: true });
            Api.getcompanybyid(payload)
                .then((res) => {
                    if (res.data !== undefined) {
                        this.setState({
                            expandedCardsData: res.data.data,
                            loader: false
                        });
                    }
                    this.setState({ loader: false });
                })
                .catch((err) => {
                    // if (err.errors)
                    //     toast.error(err.errors.msg);
                    // else
                    //     toast.error("Error Occurred");
                    // this.setState({ loader: false });
                });
        }
        else {
            if (expanded === false) {
                console.log("inisde false")
                // var keys = [];
                // keys.push(event.cardId);
                this.setState({ expandedRowKeys1: [], loader: false });
            }
        }
    }

    deleteCompany = () => {
        const payload = {
            id: this.state.deleteId
        };
        this.setState({ loader: true })
        Api.companydelete(payload)
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




    // handleChangePhoneNo = (no, country, e, formmatedValue) => {
    //     this.setState({
    //         phoneCode: '+' + country.dialCode,
    //      }, () => {
    //         console.log("Phone Number", this.state.phoneNo)
    //         //console.log("Phone Code",this.state.phoneCode)
    //     });
    // };

    render() {
        let pendingData = this.state.adminpage && this.state.adminpage.length > 0 &&
            this.state.adminpage.map((earningdata, i) => {
                return {
                    key: earningdata.id,
                    cardId: earningdata.id && earningdata.id,
                    profilePicture:
                        <ModalImage
                            large={
                                earningdata.profile_picture
                                    ? earningdata.profile_picture
                                    : defaultpollimg
                            }
                            small={
                                earningdata.profile_picture
                                    ? earningdata.profile_picture
                                    : defaultpollimg
                            }
                            hideDownload={true}
                            className="settingimage"
                        />,
                    firstName: earningdata.company_name && earningdata.company_name || "",
                    registrationNumber: <div className="Regino">
                        {earningdata.reg_no && earningdata.reg_no || ""}
                    </div>,
                    email: earningdata.email && earningdata.email || "",
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
                        <img alt="" className="delete-icon-client" src={deleted}
                            onClick={() => { this.deletefun(earningdata.id) }} />
                    </span>,
                    description:
                        <table className="">
                            <thead>
                                <th className="table-text-left pb-2 styling-tables" style={{ width: "30%" }}>Address</th>
                                <th className="table-text-left pb-2 styling-tables" style={{ width: "22%" }}>Country</th>
                                <th className="table-text-left pb-2 styling-tables" style={{ width: "17%" }}>Contact Number</th>
                                <th className="table-text-left pb-2 styling-tables" style={{ width: "12%" }}>Zip Code</th>
                                {/* <th className="table-text-left pb-2 styling-tables" style={{ width: "10%" }}>Plan</th>
                                <th className="table-text-left pb-2 styling-tables " style={{ width: "8%" }}>Expire Date</th> */}
                            </thead>
                            <tbody>
                                {/* {console.log("SetState For Country", this.state.expandedCardsData.country_code)}
                                {console.log("SetState For phone Number", this.state.expandedCardsData.mobile_number)} */}
                                <tr>
                                    <td className="table-text-left styling-tables">{this.state.expandedCardsData.address || "-"}</td>
                                    <td className="table-text-left styling-tables">{this.state.expandedCardsData.country_name || "-"},{this.state.expandedCardsData.state_name || "-"}</td>
                                    <td className="table-text-left styling-tables">{this.state.expandedCardsData.country_code || "-"} {this.state.expandedCardsData.mobile_number || "-"}</td>
                                    <td className="table-text-left styling-tables">{this.state.expandedCardsData.pin_zip_code || "-"}</td>
                                    {/* <td className="table-text-left styling-tables">

                                        <PhoneInput
                                            className="form-control py-2 w-100"
                                            country={'us'}
                                            value={'+92 434-3434343'}
                                            onChange={this.handleChangePhoneNo}
                                            autoFormat={true}
                                            style={{ width: '100%' }}
                                            enableSearch={false}
                                            disableSearchIcon={true}
                                            countryCodeEditable={false}
                                            placeholder="+1 8990-9898"
                                        /> 
                                    </td>*/}
                                    {/* <td className="table-text-left styling-tables">Dec 20th 2022</td> */}

                                </tr>

                            </tbody>
                        </table >

                }
            })

        return (
            <div>
                <div className="d-flex mr-b-23">
                    <span className="CLient-Mangement-Page mr-auto">Clients</span>
                    <span className="Client-Management-buttons Client-Managemenet-Serach">
                        <Input
                            className="Client-serach-placeholder"
                            prefix={<img alt="" src={serach} className="" />}
                            placeholder="Serach"
                            name="search" value={this.state.search}
                            onChange={this.setStateFromInput.bind(this)}
                        />
                        {/* <Select defaultValue="All Path" style={{ width: 132 }} onChange={this.handleChange()}>
                            <Option value="All Path">All Path</Option>
                        </Select> */}
                        <Link to="/add-client">
                            <Button>
                                <img className="Plan-add-image" src={plus} alt="" />
                                <span className="add-plan-buttons">ADD CLIENT</span>
                            </Button>
                        </Link>

                    </span>

                </div>
                <div>
                    {this.state.loader ? <Loader /> : null}
                    <span style={this.state.loader ? { opacity: '0.4' } : null}>
                        <Table
                            dataSource={pendingData}
                            expandIconColumnIndex={7}
                            className="parentTable"
                            pagination={false}
                            columns={this.columns}
                            {...this.state}
                            rowKey={record => record.cardId}
                            onExpand={(expanded, record) => this.expandRow(expanded, record)}
                            expandedRowKeys={this.state.expandedRowKeys1}
                            expandIconAsCell={false}
                            expandable={{
                                expandedRowRender: record => <span className="margin-style-4">{record.description}</span>,
                                expandIcon: ({ expanded, onExpand, record }) =>
                                    expanded ? (
                                        <img alt="" src={UpArrow} onClick={e => onExpand(record, e)} />
                                    ) : (
                                        <img alt="" src={DownArrow} onClick={e => onExpand(record, e)} />
                                    )
                            }}
                        />
                    </span>
                </div>

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


                <Modal visible={this.state.deletemodal}
                    width={500}
                    onCancel={this.handleCanceldeletemodal}
                    className="Confirm-Delete">
                    <div className="Confirm-Delete-fucntio">
                        <span className="confirm-delete-text"> Confirm Delete

                        </span>
                    </div>
                    <div className="are-you-select">
                        Are you sure you want to delete this client?
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

                <Modal visible={this.state.activeStatusModal}
                    width={500}
                    onCancel={this.activeHandleCanel}
                    className="Confirm-Delete">
                    <div className="Confirm-Delete-fucntio">
                        <span className="confirm-delete-text"> Confirm Deactive

                        </span>
                    </div>
                    <div className="are-you-select">
                        Are you sure you want to deactive?
                    </div>
                    <div className="d-flex">
                        <div className="Cancel-button" onClick={() => { this.activeStatusbutton() }}>
                            <div className="Button-Cancel">
                                <span className="Cancel">Yes</span>
                            </div>
                        </div>
                        <div className="Create-button" onClick={() => { this.setState({ activeStatusModal: false }) }}>
                            <div className="Button-Create">
                                <span className="Create">No</span>
                            </div>
                        </div>
                    </div>
                </Modal>



                <Modal visible={this.state.deactiveStatusModal}
                    width={500}
                    onCancel={this.deactiveHandleCanel}
                    className="Confirm-Delete">
                    <div className="Confirm-Delete-fucntio">
                        <span className="confirm-delete-text"> Confirm Active

                        </span>
                    </div>
                    <div className="are-you-select">
                        Are you sure you want to active?
                    </div>
                    <div className="d-flex">
                        <div className="Cancel-button" onClick={() => { this.deactiveStatusButton() }}>
                            <div className="Button-Cancel">
                                <span className="Cancel">Yes</span>
                            </div>
                        </div>
                        <div className="Create-button" onClick={() => { this.setState({ deactiveStatusModal: false }) }}>
                            <div className="Button-Create">
                                <span className="Create">No</span>
                            </div>
                        </div>
                    </div>
                </Modal>



                <div>
                    <div className="ClientManagement-footer-styling">© 2022, Sameteam all right reserved</div>
                </div>
            </div>
        )
    }
}

export default ClientManagement
