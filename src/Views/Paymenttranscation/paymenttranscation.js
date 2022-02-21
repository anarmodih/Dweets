import React, { Component } from 'react';
import serach from "../../assets/images/searchicon.png";
import { toast } from 'react-toastify';
import Api from "../../Api/ApiUtils";
import moment from 'moment';
import { Select, Pagination, Table, Input } from 'antd';
import Loader from '../Loader/Loader';
import LocalStorage from '../../Api/LocalStorage';
const { Option } = Select;

class Paymenttranscation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            limit: 10,
            sortOrder: '',
            allUserCount: 0,
            allUserRequestCount: 0,
            sorterCol: '',
            adminpage: [],
            loader: false
        };
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
        let payload = {
            size: this.state.limit,
            page: this.state.page,
            search: this.state.serach
        }
        this._getAllBeatMass(payload);


    };

    _getAllBeatMass = (payload) => {
        this.setState({ loader: true });
        Api.getpaymentdetails(payload)
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
            title: 'Payment Id',
            dataIndex: 'paymentid',
            key: 'paymentid',
        },
        {
            title: 'Payment Due Date',
            dataIndex: 'nextpaymentdate',
            key: 'nextpaymentdate',
        },
        {
            title: 'Company Code',
            dataIndex: 'CompanyCode',
            key: 'CompanyCode',
        },
        {
            title: 'Company Name',
            dataIndex: 'CompanyName',
            key: 'CompanyName',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
        },
    ];


    render() {
        let pendingData = this.state.adminpage && this.state.adminpage.length > 0 && this.state.adminpage.map((earningdata, i) => {
            return {
                key: i,
                paymentid: earningdata.payment_id,

                // lastpaymentdate: moment(earningdata.last_payment_date).format("DD-MM-YYYY"),
                nextpaymentdate: moment(earningdata.payment_date).format("DD-MM-YYYY"),
                CompanyCode: earningdata.user.company.company_code,
                CompanyName: earningdata.user.company.company_name,
                Amount:earningdata.amount,
                Name:earningdata.user.first_name + earningdata.user.last_name,
                Status: <span>
                   {earningdata.payment_status === "succeeded" ?
                        <span className="all-borders" style={{ backgroundColor: '#95D69B' }}>
                            <span className="text-for-all"> {earningdata.payment_status}</span>
                        </span> : ""}
                    {earningdata.payment_status === "new" ? "": ""}
                    {earningdata.payment_status === "failed" ?
                        <span className="all-borders" style={{ backgroundColor: 'lightred' }}>
                            <span className="text-for-all">  {earningdata.payment_status} </span>
                        </span> : ""}
                </span>,
            }
        })
        return (
            <div>
                {this.state.loader ? <Loader /> : null}
                <span style={this.state.loader ? { opacity: '0.4' } : null}>
                    <div className="d-flex mr-b-23">
                        <span className="CLient-Mangement-Page mr-auto">Payment Transcation</span>
                        <span className="Client-Management-buttons Client-Managemenet-Serach">
                            <Input
                                className="Client-serach-placeholder"
                                prefix={<img src={serach} alt="logo" className="" />}
                                placeholder="Serach"
                                name="search" value={this.state.search}
                                onChange={this.setStateFromInput.bind(this)}
                            />
                        </span>
                    </div>
                    <div>
                        <Table className="SuperAdmin-Table-mamagement"
                            dataSource={pendingData}
                            pagination={false}
                            columns={this.columns}
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

                </span>
            </div>
        )
    }
}

export default Paymenttranscation
