import React, { Component } from 'react';
import { Input, Button } from 'antd';
import serach from "../../assets/images/searchicon.png";
import edit from "../../assets/images/edit.png";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Pagination, Modal } from 'antd';
import deleted from "../../assets/images/Delete.png";
import Api from "../../Api/ApiUtils";
import { Table } from 'antd';
import LocalStorage from '../../Api/LocalStorage';
import plus from "../../assets/images/plus.png";

class SuperAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            limit: 10,
            sortOrder: '',
            allUserCount: 0,
            sorterCol: '',
            adminpage: []
        };
    }

    // handleTableChange = (pagination, filters, sorter) => {
    //     this.setState({ sorterCol: sorter.columnKey, sortOrder: sorter.order, page: 1 }, () => {
    //         this._getAllBeatMass();
    //     })
    // }
    componentDidMount = () => {
        LocalStorage.getItem("Super_Admin").then(user => {
            this.setState({ user: user, userid: user.id, loader: false },
                () => {
                    //console.log("User id from localdtorage", this.state.userid)
                })
        });


        // let localData = JSON.parse(localStorage.getItem('Super_Admin'));
        // let setdata = localData.id
        // console.log("setdata",setdata)

        let payload = {
            size: this.state.limit,
            page: this.state.page,
            search: this.state.serach
        }
        this._getAllBeatMass(payload);
    };

    _getAllBeatMass = (payload) => {
        this.setState({ loader: true });
        Api.getadmin(payload)
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




    columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            // sortDirection: ['ascend'],
            // sorter: (a, b) => a.first_name.length - b.first_name.length,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email Id',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
    ];


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


    deleteCompany = () => {
        const payload = {
            id: this.state.deleteId
        };
        this.setState({ loader: true })
        Api.superadmindelete(payload)
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


    render() {
        //console.log("admin pahe",this.state.adminpage)
        let pendingData = this.state.adminpage && this.state.adminpage.length > 0 && this.state.adminpage.map((earningdata, i) => {
            return {
                key: i,
                first_name: earningdata.first_name,
                last_name: earningdata.last_name,
                email: earningdata.email,
                Action: <span className="d-flex">
                    {console.log("userid nice table ma", this.state.userid)}
                    {earningdata.id === this.state.userid ?
                         "": <img alt="" className="delete-icon-client mr-right-17" src={deleted}
                         onClick={() => { this.deletefun(earningdata.id) }} />}
                    {/* <img alt="" className="delete-icon-client mr-right-17" src={deleted}
                        onClick={() => { this.deletefun(earningdata.id) }} /> */}
                    <Link to={"/edit-admin/" + earningdata.id}>
                        <img className="Price-Delete-icon" src={edit} alt=""
                        />
                    </Link>
                </span>,


            }
        })
        return (
            <div>
                <div className="d-flex mr-b-23">

                    <span className="SuperAdmin-Planes-Pages mr-auto">Admin</span>
                    <span className="SuperAdmin-Button-Prices Super-Admin-Plan-button">
                        <Input
                            className="SuperAdmin-Planes-Placeholder"
                            prefix={<img src={serach} alt="logo" className="" />}
                            placeholder="Serach"
                            name="search" value={this.state.search}
                            onChange={this.setStateFromInput.bind(this)}

                        />

                        {/* <input placeholder="Search..." type="text"
                            className="form-control search-input"
                            name="search" value={this.state.search}
                            onChange={this.setStateFromInput.bind(this)} />
                        <i className="feather icon-x search-close-btn position-absolute"
                            onClick={() => { this.setState({ search: "" }, () => { this.getData(); }) }} /> */}

                        <Link to="/add-super-admin">
                            <Button>
                                <img className="SuperAdmin-Add-Image" src={plus} alt="" />
                                <span className="SuperAdmin-Buttons-Admin">ADD SUPER ADMIN</span>
                            </Button>
                        </Link>
                    </span>

                </div>
                <div>

                    <Table className="SuperAdmin-Table-mamagement"
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
                    <div className="SuperAdmin-Footer-Styling">© 2022, Sameteam all right reserved</div>
                </div>

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

export default SuperAdmin
