import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Bar } from "react-chartjs-2";
// import { Line } from 'react-chartjs-2';
import { Pagination } from 'antd';
import { Table } from 'antd';
import moment from 'moment';
import download from "../../assets/images/download.png";
import { toast } from 'react-toastify';
import Api from '../../Api/ApiUtils';
import Loader from "../../Views/Loader/Loader";
import SimpleReactValidator from 'simple-react-validator';
// import { PieChart } from 'react-minimal-pie-chart';
// import { Pie } from "ant-design-pro/lib/Charts";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Select } from 'antd';
import { DatePicker } from 'antd';

// import CanvasJSReact from '../../assets/canvasjs.react';
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'DD/MMM/YYYY';
// const data = {
//     labels: ['Jan1', 'Jan2'],
//     datasets: [
//         {
//             label: '# of Votes',
//             data: [1, 2, 3],
//             // fill: false,
//             // backgroundColor: '#e9e6fe',
//             borderColor: '#e9e6fe',
//         },
//     ],
// };

// const options = {
//     scales: {
//         yAxes: [
//             {
//                 ticks: {
//                     beginAtZero: true,
//                 },
//             },
//         ],
//     },
// };




class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Day: false,
            Week: true,
            Month: false,
            submit: true,
            width: 100,
            chooseSubject: "",
            height: 100,
            start_date: new Date(),
            end_date: new Date(),
            page: 0,
            limit: 10,
            sortOrder: '',
            loader: false,
            allUserCount: 0,
            sorterCol: '',
            adminpage: [],
        };
        this.test = this.test.bind(this);
        this.validator = new SimpleReactValidator();
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({ chooseSubject: value })
    }
    Daybutton = () => {
        this.setState({ Day: true, Week: false, Month: false });
    }

    Weekbutton = () => {
        this.setState({ Day: false, Week: true, Month: false });
    }


    Monthbutton = () => {
        this.setState({ Day: false, Week: false, Month: true });
    }

    downloadusers() {
        this.setState({ loader: true });
        let payload =
        {
            subject: this.state.chooseSubject,
            start_date: this.state.start_date ? moment(this.state.start_date).format("DD-MMM-YYYY") : moment(this.state.start_date).format("DD-MMM-YYYY"),
            end_date: this.state.end_date ? moment(this.state.end_date).format("DD-MMM-YYYY") : moment(this.state.end_date).format("DD-MMM-YYYY")
        }
        //console.log("Cllllllll")
        Api.downloadcsv(payload).then(res => {
            console.log("Resss", res.data.data.report_url)
            this.setState({ loader: false })
            window.location.href = res.data.data.report_url
        })
            .catch(err => {
                toast.error("Some error occurred!");
                this.setState({ loader: false })
            })
    }

    test() {
        this.setState({ loader: true });
        if (this.validator.allValid()) {
            let payload = {
                size: this.state.limit,
                page: this.state.page,
                subject: this.state.chooseSubject,
                start_date: this.state.start_date ? moment(this.state.start_date).format("DD-MMM-YYYY") : moment(this.state.start_date).format("DD-MMM-YYYY"),
                end_date: this.state.end_date ? moment(this.state.end_date).format("DD-MMM-YYYY") : moment(this.state.end_date).format("DD-MMM-YYYY")
            };
            //console.log("Payload For Details", payload)
            Api.fetchReport(payload).then(res => {
                //console.log("Resss", res.data.data)
                this.setState({
                    loader: false,
                    submit: false,
                    adminpage: res.data.data,
                    allUserCount: res.data.total_records
                })
            })
                .catch(err => {
                    toast.error("Some error occurred!");
                    this.setState({ loader: false })

                })
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({ loader: false });
        }
    }



    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }




    onChangeDate = (date, datestring) => {
        // console.log('dates.....', datestring)
        this.setState({
            start_date: datestring[0],
            end_date: datestring[1]
        }, () => { console.log("Start Date and end date", this.state.start_date, this.state.end_date) })
    }


    _handleUserPagination = (page) => {
        this.setState({ pageChecking: page, loader: true }, () => {
            const payload = {
                size: this.state.limit,
                page: this.state.pageChecking - 1,

                subject: this.state.chooseSubject,
                start_date: this.state.start_date ? moment(this.state.start_date).format("DD-MMM-YYYY") : moment(this.state.start_date).format("DD-MMM-YYYY"),
                end_date: this.state.end_date ? moment(this.state.end_date).format("DD-MMM-YYYY") : moment(this.state.end_date).format("DD-MMM-YYYY")

            };
            console.log('payload', payload);
            Api.fetchReport(payload).then(res => {
                //console.log("Resss", res.data.data)
                this.setState({
                    loader: false,
                    //submit: false,
                    adminpage: res.data.data,
                    allUserCount: res.data.total_records
                })
            })
                .catch(err => {
                    toast.error("Some error occurred!");
                    this.setState({ loader: false })
                })
        });
    };


    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Email Id',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'MobileNumber',
            key: 'MobileNumber',
        },

        {
            title: 'Company Code',
            dataIndex: 'EmpCode',
            key: 'EmpCode',

        },

    ];

    render() {

        let pendingData = this.state.adminpage && this.state.adminpage.length > 0 && this.state.adminpage.map((earningdata, i) => {
            return {
                key: i,
                name: earningdata.first_name + earningdata.last_name,
                email: earningdata.email,
                MobileNumber: earningdata.mobile_number,
                EmpCode: earningdata.company.company_code,
            }
        })


        // const options = {
        //     //animationEnabled: true,
        //     // title: {
        //     // 	text: "Customer Satisfaction"
        //     // },
        //     subtitles: [{
        //         text: "71%",
        //         verticalAlign: "center",
        //         fontSize: 24,
        //         dockInsidePlotArea: true
        //     }],
        //     data: [{
        //         type: "doughnut",
        //         //	showInLegend: true,
        //         //indexLabel: "{name}: {y}",
        //         //	yValueFormatString: "#,###'%'",
        //         dataPoints: [
        //             { name: "Unsatisfied", y: 5 },
        //             // { name: "Very Unsatisfied", y: 31 },
        //             // { name: "Very Satisfied", y: 40 },
        //             // { name: "Satisfied", y: 17 },
        //             // { name: "Neutral", y: 7 }
        //         ]
        //     }]
        // }
        return (
            <div className="Dashbaord-content">
                {this.state.loader ? <Loader /> : null}
                <span style={this.state.loader ? { opacity: '0.4' } : null}>
                    <div className="d-flex">
                        <span className="Reports-Page mr-auto">Reports</span>
                    </div>
                    <div className="Reports-main-border">
                        <div className="Summary-Borders">
                            <div className="d-flex">
                                <div className="Summary-Text mr-auto">
                                    Summary
                                </div>
                                {/* <div className="Custom-Report">
                                <span className="Custom-Report-text">
                                    Custom Report
                                </span>
                            </div> */}
                            </div>

                            <div className="row w-100 ml-0">
                                <div className="col-4 pl-0">
                                    <div className="Report-DropDown-Property">
                                        <Select defaultValue="Choose Subject" name="chooseSubject" style={{ width: 400 }} onChange={this.handleChange.bind(this)}>
                                            <Option value="Active User">Active User</Option>
                                            <Option value="Inactive User">Inactive User</Option>
                                            <Option value="Active Company">Active Company</Option>
                                            <Option value="Inactive Company">Inactive Company</Option>
                                            <Option value="Active Admin">Active Admin</Option>
                                        </Select>
                                    </div>

                                    <div className="err-message-email">
                                        {this.validator.message('chooseSubject', this.state.chooseSubject, 'required')}
                                    </div>

                                </div>
                                <div className="col-6">
                                    <div className="Date-picker-class">
                                        <RangePicker
                                            value={[moment(this.state.start_date, dateFormat), moment(this.state.end_date, dateFormat)]}
                                            placeholder={['From   :   DD-MMM-YYYY', 'To   :  DD-MMM-YYYY']} onChange={this.onChangeDate}
                                            format="DD-MMM-YYYY" />
                                    </div>
                                    {/* <div className="err-message-email">
                                    {this.validator.message('Start Date', this.state.start_date, 'required')}
                                </div>
                                <div className="err-message-email">
                                    {this.validator.message('End Date', this.state.end_date, 'required')}
                                </div> */}


                                </div>
                                <div className="col-2 pr-0">
                                    <div className="Custom-Report-Submit"
                                        onClick={() => this.test()}>
                                        <span className="Custom-Report-text-Submit">
                                            Submit
                                        </span>
                                    </div>
                                </div>



                            </div>

                            {this.state.submit === true ?
                                <div>
                                    {/* CUSTOM REPORTS */}
                                    {/* <div className="">
                                    <div className="row mr-30 w-100 mlt-4">
                                        <div className="col-4 pl-0">
                                            <div className="Pie-Chart-Number">
                                                <div className="d-flex mr-26">
                                                    <span className="Dashsbord-First-Men mr-auto">
                                                        Revenue
                                                    </span>
                                                </div>
                                                <div className="d-flex">
                                                    <CanvasJSChart options={options}
                                                    />

                                                    <CanvasJSChart options={options}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-4">
                                            <div className="Pie-Chart-Second">
                                                <div className="d-flex mr-20">
                                                    <span className="Dashsbord-First-Men mr-auto">
                                                        Placeholder Title
                                                    </span>

                                                </div>
                                                <div>

                                                    <div className="d-flex">
                                                        <span className="Basic-teams-Report">Teams</span>
                                                        <span className="Dashbord-Progress-Report">
                                                            <Progress percent={60} strokeColor={{
                                                                '0%': '#108ee9',
                                                                '100%': '#87d068',
                                                            }}
                                                                format={percent => `${percent}`} />

                                                        </span>


                                                    </div>

                                                    <div className="d-flex">
                                                        <span className="Basic-Premium-Report">Premium</span>
                                                        <span className="Dashbord-Progress-Report">
                                                            <Progress percent={60} strokeColor={{
                                                                '0%': '#108ee9',
                                                                '100%': '#87d068',
                                                            }}
                                                                format={percent => `${percent}`} />
                                                        </span>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span className="Basic-Enterprise">Enterprise</span>
                                                        <span className="Dashbord-Progress-Report">
                                                            <Progress percent={60} strokeColor={{
                                                                '0%': '#108ee9',
                                                                '100%': '#87d068',
                                                            }}
                                                                format={percent => `${percent}`} />

                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 pr-0">
                                            <div className="Pie-Chart-third">
                                                <div className="d-flex mr-20">
                                                    <span className="Dashsbord-First-Men mr-auto">
                                                        Placeholder Title
                                                    </span>

                                                </div>
                                                <div>

                                                    <div className="d-flex">
                                                        <span className="Basic-teams-Report">Teams</span>
                                                        <span className="Dashbord-Progress-Report">
                                                            <Progress percent={60} strokeColor={{
                                                                '0%': '#108ee9',
                                                                '100%': '#87d068',
                                                            }}
                                                                format={percent => `${percent}`} />

                                                        </span>


                                                    </div>

                                                    <div className="d-flex">
                                                        <span className="Basic-Premium-Report">Premium</span>
                                                        <span className="Dashbord-Progress-Report">
                                                            <Progress percent={60} strokeColor={{
                                                                '0%': '#108ee9',
                                                                '100%': '#87d068',
                                                            }}
                                                                format={percent => `${percent}`} />

                                                        </span>


                                                    </div>
                                                    <div className="d-flex">
                                                        <span className="Basic-Enterprise">Enterprise</span>
                                                        <span className="Dashbord-Progress-Report">
                                                            <Progress percent={60} strokeColor={{
                                                                '0%': '#108ee9',
                                                                '100%': '#87d068',
                                                            }}
                                                                format={percent => `${percent}`} />

                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                    {/* <div className="Pie-Tootal mr-15">
                                    <div className="d-flex mr-11">
                                        <span className="Dashsbord-First-Men mr-auto">
                                            Active Users
                                        </span>
                                        <div class="Reports-Day-Week-Buttons">
                                            <Button className={this.state.Day === false ? "Reports-Day-Blue-White" : "Dash-Day-Buttons-Blue"} onClick={this.Daybutton}>
                                                <span id="Day" className={this.state.Day === false ? "Report-Day-Black" : "Report-Day-white"}>Day</span>
                                            </Button>
                                            <Button className={this.state.Week === false ? "Reports-Day-Blue-White" : "Dash-Day-Buttons-Blue"} onClick={this.Weekbutton} >
                                                <span id="Week" className={this.state.Week === false ? "Report-Day-Black" : "Report-Day-white"}>Week</span></Button>
                                            <Button className={this.state.Month === false ? "Reports-Day-Blue-White" : "Dash-Day-Buttons-Blue"} onClick={this.Monthbutton}>
                                                <span id="Month" className={this.state.Month === false ? "Report-Day-Black" : "Report-Day-white"}>Month</span></Button>
                                        </div>
                                    </div>
                                    <Line data={data} options={options}
                                        width={10}
                                        height={5}
                                    />
                                    <div>

                                    </div>
                                </div> */}
                                </div>
                                :
                                <div>
                                    <hr className="styling-for-hr-class"></hr>
                                    <div className="Reports-Summary-borders">
                                        <div className="d-flex mr-11">
                                            <span className="Reports-TitleHere mr-auto">
                                                Title here
                                            </span>
                                            <div class="Reports-Download-buttons">

                                                {this.state.allUserCount > 0 ? (
                                                    <span className="Reports-Day-Buttons-white" onClick={this.downloadusers.bind(this)}>
                                                        <img src={download} alt="" />
                                                        <span className="Day-Download-Button">Download csv</span>
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                                {/* <span className="Reports-Day-Buttons-print">
                                                    <img src={print} alt="" />
                                                    <span className="Day-Download-Button">Print</span>
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className="Color-Code-Grey-Claass">
                                            <Table className="table-User-magament"
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
                                    </div>
                                </div>}


                        </div>
                    </div>
                    <div>
                        <div className="footer-styling-Reports">© 2022, Sameteam all right reserved</div>
                    </div>
                </span>
            </div>
        );
    }
}
export default withRouter(Reports);
