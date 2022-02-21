import React, { Component } from 'react';
import { Table ,Input, Button , Pagination, Modal } from 'antd';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import Api from "../../Api/ApiUtils";
import LocalStorage from '../../Api/LocalStorage';
import plus from "../../assets/images/plus.png";
import deleted from "../../assets/images/Delete.png";
import edit from "../../assets/images/edit.png";

class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            limit: 10,
            sortOrder: '',
            allUserCount: 0,
            sorterCol: '',
            show: false,
            setShow: false,
            editShow: false,
            actid: "",
            addModal: false,
            newName: "",
            err: "",
            adminpage: []
        };
        this.validator = new SimpleReactValidator();
    }



    // handleTableChange = (pagination, filters, sorter) => {
    //     this.setState({ sorterCol: sorter.columnKey, sortOrder: sorter.order, page: 1 }, () => {
    //         this._getAllBeatMass();
    //     })
    // }
    componentDidMount = () => {
        LocalStorage.getItem("Super_Admin").then(user => {
            this.setState({ user: user, userid: user.id, loader: true },
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
        Api.getallfaq(payload)
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
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
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
        Api.deleteFAQ(payload)
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

    addCategory() {
        this.setState({ loader: true })
        if (this.validator.allValid()) {
            let payload = {
                question: this.state.newName,
                answer: this.state.description
            }
            Api.addhelpandfaq(payload)
                .then((res) => {
                    if (res && res.data) {
                        this.setState({ addModal: false, newName: "", description: "" })
                        this.validator.hideMessages();
                        toast.success("Added Successfully")
                        let payload = {
                            size: this.state.limit,
                            page: this.state.page,
                            search: this.state.serach
                        }
                        this._getAllBeatMass(payload);
                    }
                })
                .catch(function (err) {
                    if (err) {
                        toast.error("Some Error Occurred");
                    }
                    this.setState({ loader: false });
                });
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false })
        }
    }


    editCategory(payload) {
        this.setState({ loader: true });
        if (this.validator.allValid()) {
            payload = {
                id: this.state.actid,
                question: this.state.newName,
                answer: this.state.description
            }
            Api.edithelpandfaq(payload)
                .then((res) => {
                    if (res && res.data) {
                        toast.success("Edited Successfully")
                        this.setState({ editShow: false, newName: "" ,description:"" })
                        this.validator.hideMessages();
                        let payload = {
                            size: this.state.limit,
                            page: this.state.page,
                            search: this.state.serach
                        }
                        this._getAllBeatMass(payload);
                    }
                })
                .catch(function (err) {
                    if (err) {
                        toast.error("Error Occured")
                    }
                    this.setState({ loader: false });
                    // console.log("err");
                });
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false })
        }
    }

    render() {
        //console.log("admin pahe",this.state.adminpage)
        let pendingData = this.state.adminpage && this.state.adminpage.length > 0 && this.state.adminpage.map((earningdata, i) => {
            return {
                key: i,
                Title: earningdata.question,
                Description: earningdata.answer,
                Action: <span className="d-flex">


                    <img alt="" className="delete-icon-client mr-right-17" src={deleted}
                        onClick={() => { this.deletefun(earningdata.id) }} />
                    
                        <img className="Price-Delete-icon" onClick={() =>
                         this.setState({ actid: earningdata.id, editShow: !this.state.editShow, newName: earningdata.question,description:earningdata.answer })} src={edit} alt=""
                        />
                    
                </span>,


            }
        })
        return (
            <div>
                {this.state.loader ? <Loader /> : null}
                <span style={this.state.loader ? { opacity: '0.4' } : null}>
                    <div className="d-flex mr-b-23">

                        <span className="SuperAdmin-Planes-Pages mr-auto">FAQ</span>
                        <span className="SuperAdmin-Button-Prices Super-Admin-Plan-button">
                            {/* <Input
                            className="SuperAdmin-Planes-Placeholder"
                            prefix={<img src={serach} alt="logo" className="" />}
                            placeholder="Serach"
                            name="search" value={this.state.search}
                            onChange={this.setStateFromInput.bind(this)}

                        /> */}

                            {/* <input placeholder="Search..." type="text"
                            className="form-control search-input"
                            name="search" value={this.state.search}
                            onChange={this.setStateFromInput.bind(this)} />
                        <i className="feather icon-x search-close-btn position-absolute"
                            onClick={() => { this.setState({ search: "" }, () => { this.getData(); }) }} /> */}


                            <Button onClick={() => this.setState({ addModal: !this.state.addModal })}>
                                <img className="SuperAdmin-Add-Image" src={plus} alt="" />
                                <span className="SuperAdmin-Buttons-Admin">ADD FAQ</span>
                            </Button>

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


                    {/* Add Category */}


                    <Modal visible={this.state.addModal}
                        width={500}

                        className="Confirm-Delete">
                        <div className="Confirm-Delete-fucntio">
                            <span className="confirm-delete-text"> Add Faq

                            </span>
                        </div>

                        <div className="row text-title-description">
                            <div className="col-3">
                                <div >Title: </div>
                            </div>
                            <div className="col-9">
                                <Input type="text" style={{height:'56px'}} className="form-control" placeholder="Enter Title" name="newName" onChange={(e) => { this.setState({ newName: e.target.value }) }} />
                                <div className="err-msg-category text-center">{this.validator.message('Title', this.state.newName, 'required')}</div>
                            </div>
                        </div>

                        <div className="row text-title-description" style={{ marginTop: '10px' }}>
                            <div className="col-3">
                                <div >Description: </div>
                            </div>
                            <div className="col-9">
                                <textarea type="text" style={{height:'115px'}} className="form-control resize-none" placeholder="Enter Desciption" name="description" onChange={(e) => { this.setState({ description: e.target.value }) }} />
                                <div className="err-msg-category text-center">{this.validator.message('Description', this.state.description, 'required')}</div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="Cancel-button" onClick={() => this.addCategory()}>
                                <div className="Button-Cancel">
                                    <span className="Cancel">Yes</span>
                                </div>
                            </div>
                            <div className="Create-button" onClick={() => { this.setState({ addModal: !this.state.addModal, newName: "", description: "" }); this.validator.hideMessages() }}>
                                <div className="Button-Create">
                                    <span className="Create">No</span>
                                </div>
                            </div>
                        </div>
                    </Modal>



                    <Modal visible={this.state.editShow}
                        width={599}

                        className="Confirm-Delete">
                        <div className="Confirm-Delete-fucntio">
                            <span className="confirm-delete-text"> Edit Faq
                            </span>
                        </div>

                        <div className="row text-title-description">
                            <div className="col-3">
                                <div >Title: </div>
                            </div>
                            <div className="col-9">
                            <Input type="text" style={{height:'56px'}} className="form-control" placeholder="Enter Tile" value={this.state.newName} name="newName" onChange={(e) => { this.setState({ newName: e.target.value }) }} />
                                    <div className="err-msg-category text-center errmsg">{this.validator.message('Title', this.state.newName, 'required')}</div>

                            </div>
                        </div>

                        <div className="row text-title-description" style={{ marginTop: '10px' }}>
                            <div className="col-3">
                                <div >Description: </div>
                            </div>
                            <div className="col-9">
                            <textarea type="text" style={{height:'115px'}}className="resize-none form-control" placeholder="Enter Desciption" name="description"  value={this.state.description} onChange={(e) => { this.setState({ description: e.target.value }) }} />
                                    <div className="err-msg-category text-center errmsg">{this.validator.message('Description', this.state.description, 'required')}</div>

                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="Cancel-button" onClick={() => { this.editCategory() }}>
                                <div className="Button-Cancel">
                                    <span className="Cancel">Yes</span>
                                </div>
                            </div>
                            <div className="Create-button" onClick={() => { this.setState({ editShow: false }); this.validator.hideMessages() }}>
                                <div className="Button-Create">
                                    <span className="Create">No</span>
                                </div>
                            </div>
                        </div>
                    </Modal>


                </span>
            </div>
        )
    }
}

export default FAQ
