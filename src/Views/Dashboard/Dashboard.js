import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
//import { Bar , Line } from "react-chartjs-2";
import Lightbox from 'react-lightbox-component';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from "../../Views/Loader/Loader";
import Api from '../../Api/ApiUtils';
import { Progress, Button, Select } from 'antd';
import multipleusers from "../../assets/images/multiple-users.jpg";
import faq from "../../assets/images/faq.jpg";
import Admin from "../../assets/images/Admin.png";
import visits from "../../assets/images/inactive.jpg";
import { Radio } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
const { Option } = Select;

const data = {
  labels: ['Jan1', 'Jan2', 'Jan3', 'Jan4', 'Jan5', 'Jan6', 'Jan7'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      // fill: false,
      // backgroundColor: '#e9e6fe',
      borderColor: '#e9e6fe',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Day: false,
      Week: true,
      loader: false,
      dashboard: "",
      Month: false,

      acquired_filter: "",
      activeUserCount: "",
      deActiveUserCount: "",
      filteredUserCount: "",
      userTotalCount: "",
    };
  }
  componentDidMount() {

    this.setState({ loader: true });
    this.getData();
    this.getData1();

  }

  getData() {
    let payload =
    {

    }
    Api.dashboard(payload)
      .then((res) => {
        if (res && res.data.data) {
          //console.log("res", res.data.data)
          this.setState({ loader: false, dashboard: res.data.data });
        }
      })
      .catch(function (err) {
        if (err) {
          // toast.success(res.err)
        }
        else {
          toast.success("Error Occured")
        }
        //this.setState({ loader: false });
      });
  }
  getData1() {
    this.setState({ loader: true });
    let payload = {
      filter_type: this.state.acquired_filter === "" ? "Week" : this.state.acquired_filter
    }
    console.log("payload", payload)
    Api.getTransactionDetails(payload)
      .then((res) => {
        if (res && res.data) {

          // console.log("Dahhhhboardd",res.data.data);
          this.setState({
            userTotalCount: res.data.data.total_sub_admin
            , filteredUserCount: res.data.data.active_sub_admin
            , acquired_filter: res.data.data.filter_type,
            loader: false
          });
        }
        else {
          this.setState({ userTotalCount: 0, filteredUserCount: 0 });
        }
      })
      .catch(function (err) {
        if (err) {
          console.log(err);
          this.setState({ userTotalCount: 0, filteredUserCount: 0 });
        }
      });
  }
  onChange3 = (e) => {
    // console.log('radio3 checked', e.target.value);
    this.setState({
      acquired_filter: e.target.value,
    }, () => { console.log(this.state.acquired_filter); this.getData1() });
  };


  // handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  // Daybutton = () => {
  //   this.setState({ Day: true, Week: false, Month: false });
  // }

  // Weekbutton = () => {
  //   this.setState({ Day: false, Week: true, Month: false });
  // }


  // Monthbutton = () => {
  //   this.setState({ Day: false, Week: false, Month: true });
  // }

  render() {

    const salesPieData = [
      {
        x: `Last ${this.state.acquired_filter}`,
        y: this.state.filteredUserCount
      },
      {
        x: `Before Last ${this.state.acquired_filter}`,
        y: this.state.userTotalCount - this.state.filteredUserCount,
      },
    ];

    const options = [
      { label: 'Last 24 hours', value: 'Day' },
      { label: 'Last Week', value: 'Week' },
      { label: 'Last Month', value: 'Month' },
    ];



    //console.log("Dahhh", this.state.dashboard)

    return (
      <div className="Dashbaord-content">
        {this.state.loader ? <Loader /> : null}
        <span style={this.state.loader ? { opacity: '0.4' } : null}>
          <div className="d-flex">
            <span className="Main-page-Dashbaord mr-auto">Home</span>
            <div>
              {/* <sectionimage>
                <Lightbox images={
                  [
                    {
                      src: {Admin},
                    }
                  ]
                } />
              </sectionimage> */}
            </div>
            {/* <div class="Dashboard-Button-Day-Week">
            <Button className={this.state.Day === false ? "Dash-Day-Button-White" : "Dash-Day-Buttons-Blue"} onClick={this.Daybutton}>
              <span id="Day" className={this.state.Day === false ? "Day-black" : "Day-white"}>Day</span>
            </Button>
            <Button className={this.state.Week === false ? "Dash-Day-Button-White" : "Dash-Day-Buttons-Blue"} onClick={this.Weekbutton} >
              <span id="Week" className={this.state.Week === false ? "Day-black" : "Day-white"}>Week</span></Button>
            <Button className={this.state.Month === false ? "Dash-Day-Button-White" : "Dash-Day-Buttons-Blue"} onClick={this.Monthbutton}>
              <span id="Month" className={this.state.Month === false ? "Day-black" : "Day-white"}>Month</span></Button>
          </div> */}

          </div>

          <div className="d-flex">
            <div className="row w-100 m-0">
              <div className="col-3 pl-0">
                <Link to="/superadmin">
                  <div className="Rectangle">
                    <div className="row">
                      <div className="col-md-7">
                        <span className="On-board-members">Admin</span>
                        <div className="digits">{this.state.dashboard.super_admin_count}</div>
                      </div>
                      <div className="col-md-5">
                        <img src={Admin} className="float-right inactive-admin" alt="" />
                      </div>
                    </div>
                    {/*<div>
                  <img src={trending} alt="" />
                  <span className="last-week">
                    8.5% up from last week
                  </span>
                </div>*/}
                  </div>
                </Link>
              </div>

              <div className="col-3">
                <Link to="/ClientManagement">
                  <div className="Rectangle">
                    <div className="row">
                      <div className="col-md-7">
                        <span className="On-board-members">Client</span>
                        <div className="digits">{this.state.dashboard.active_sub_admin_count}</div>
                      </div>
                      <div className="col-md-5">
                        <img src={multipleusers} className="float-right inactive-client" alt="" />
                      </div>

                    </div>
                    {/* <div>
                  <img src={trending} alt="" />
                  <span className="last-week">
                    8.5% up from last week
                  </span>
                </div> */}
                  </div>
                </Link>
              </div>

              <div className="col-3 pl-0">
                <Link to="/ClientManagement">
                  <div className="Rectangle">
                    <div className="row">
                      <div className="col-md-7">
                        <span className="On-board-members">Inactive Client</span>
                        <div className="digits">{this.state.dashboard.inactive_sub_admin_count}</div>
                      </div>
                      <div className="col-md-5">
                        <img src={visits} className="float-right inactive-users" alt="" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-3">
                <Link to="/faq">
                  <div className="Rectangle">
                    <div className="row">
                      <div className="col-md-7">
                        <span className="On-board-members">FAQ</span>
                        <div className="digits">{this.state.dashboard.faqs_count}</div>
                      </div>
                      <div className="col-md-5">
                        <img src={faq} className="float-right inactive-users" alt="" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>


            {/* Second Tag */}
            {/* <div className="Rectangle Rectabngle-right">
            <div className="row">
              <div className="col-md-7">
                <span className="On-board-members">Website Visits</span>
                <div className="digits">548</div>
              </div>
              <div className="col-md-5">
                <img src={visits} className="float-right" />
              </div>

            </div>
            <div>
              <img src={trending} />
              <span className="last-week">
                8.5% up from last week
              </span>

            </div>
          </div> */}

            {/*Third Tag  */}
            {/* <div className="Rectangle Rectabngle-right">
            <div className="row">
              <div className="col-md-7">
                <span className="On-board-members">Review Counts</span>
                <div className="digits">500</div>
              </div>
              <div className="col-md-5">
                <img src={revuewCounts} className="float-right" />
              </div>

            </div>
            <div>

              <div className="">
                <img src={google}></img>
                <span className="review-counts-number">250</span>
                <img src={apple}></img>
                <span className="review-counts-number">250</span>
              </div>

            </div>
          </div> */}


            {/* <div className="Rectangle">
            <div className="row">
              <div className="col-md-7">
                <span className="On-board-members">Expire Alert</span>
                <div className="digits">15</div>
              </div>
              <div className="col-md-5">
                <img src={ExpireAlert} className="float-right" />
              </div>

            </div>
            <div>
              <img src={trending} />
              <span className="last-week">
                8.5% up from last week
              </span>
            </div>
          </div> */}

          </div>

          <div className="row w-100 m-0">
            <div className="col-6 pl-0">
              <div className="Events-Cards-PieChart">
                <div className="ml-2 pt-2"><span className="charttitle">Client</span></div>

                <Radio.Group
                  options={options}
                  onChange={this.onChange3}
                  value={this.state.acquired_filter}
                  className="pl-2 pt-2"
                >
                  <Radio className="radiostyling" name="active" onChange={this.onChange3} value={"Day"} >Male</Radio>
                  <Radio className="radiostyling " name="active" onChange={this.onChange3} value={"Week"}>Female</Radio>
                  <Radio className="radiostyling" name="active" onChange={this.onChange3} value={"Month"}>others</Radio>
                </Radio.Group>
                <Pie
                  className="mt-10"
                  hasLegend
                  title="Total Client"
                  subTitle="Total Client"
                  colors={['#F70033', '#0092FF']}
                  total={this.state.userTotalCount}
                  data={salesPieData}
                  valueFormat={val => <span dangerouslySetInnerHTML={{ __html: (val) }} />}
                  height={294}
                />
              </div>
            </div>
          </div>

          {/* <div class="d-flex">
          <div className="row w-100 m-0 justify-content-between">
            <div className="col-8 pl-0">
              <div className="First-Boards-Numbers">
                <div className="d-flex">
                  <span className="Dashsbord-First-Men mr-auto">
                    Total Sales
                  </span>
                  <span className="Dashboard-Border-Buttons">
                    <span className="Dashboard-View-All">
                      <Select defaultValue="Weekly" onChange={this.handleChange()}>
                        <Option value="jack">Weekly</Option>
                      </Select>
                    </span>
                  </span>
                </div>
                <div>
                  <div>
                    <Bar
                      data={{
                        // Name of the variables on x-axies for each bar
                        labels: ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"],
                        datasets: [
                          {
                            // Label for bars
                            label: "Discount Price",
                            // Data or value of your each variable
                            data: [20, 40, 60, 80, 100, 90, 100],
                            // Color of each bar
                            backgroundColor: ["#7667f4", "#7667f4", "#7667f4", "#7667f4", "#7667f4"],
                            // Border color of each bar
                            borderColor: ["#7667f4", "#7667f4", "#7667f4", "#7667f4", "#7667f4"],
                            borderWidth: 0.5,

                          },
                          {
                            // Label for bars
                            label: "Full Price",
                            // Data or value of your each variable
                            data: [20, 40, 60, 80, 100, 90, 120],
                            // Color of each bar
                            backgroundColor: ["#ffb367", "#ffb367", "#ffb367", "#ffb367", "#ffb367"],
                            // Border color of each bar
                            borderColor: ["#ffb367", "#ffb367", "#ffb367", "#ffb367", "#ffb367"],
                            borderWidth: 0.5,

                          },
                        ],
                      }}
                      //Height of graph
                      //height={400}
                      width={245}
                      height={247}
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                // The y-axis value will start from zero
                                beginAtZero: true,
                              },
                            },
                          ],
                        },
                        legend: {
                          labels: {
                            fontSize: 15,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>            
            <div className="col-4 pr-0">

              <div className="rectangle-3">
                <div className="d-flex mr-bottom-26">
                  <span className="Dashsbord-First-Men mr-auto">
                    Upcoming renewal
                  </span>
                  <span className="Dashboard-Border-Buttons">

                    <span className="Dashboard-View-All">
                      <Select defaultValue="Weekly" onChange={this.handleChange()}>
                        <Option value="jack">Weekly</Option>
                      </Select>
                    </span>

                  </span>

                </div>
                <div className="d-flex mr-37">
                  <img src={EventsImage} alt="" />
                  <span className="erin-shi mr-auto">GeekAnts</span>
                  <span className="Dashbord-Run">
                    <span className="Dashabord-Date-Time">21/05/2020</span>
                  </span>
                </div>

                <div className="d-flex mr-37">
                  <img src={EventsImage} alt="" />
                  <span className="erin-shi mr-auto">Google Design</span>
                  <span className="Dashbord-Run">
                    <span className="Dashabord-Date-Time">21/05/2020</span>
                  </span>
                </div>



                <div className="d-flex mr-37">
                  <img src={EventsImage} alt="" />
                  <span className="erin-shi mr-auto">Microsoft</span>
                  <span className="Dashbord-Run">
                    <span className="Dashabord-Date-Time">21/05/2020</span>
                  </span>
                </div>

                <div className="d-flex mr-37">
                  <img src={EventsImage} alt="" />
                  <span className="erin-shi mr-auto">Linkedin</span>
                  <span className="Dashbord-Run">
                    <span className="Dashabord-Date-Time">21/05/2020</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div> */}

          {/* <div className="d-flex">
          <div className="row w-100 m-0">
            <div className="col-4 pl-0">
              <div className="First-Boards-Numbers-progress">
                <div className="d-flex mr-26">
                  <span className="Dashsbord-First-Men mr-auto">
                    Pricing Plan
                  </span>
                  <span className="Dashboard-Border-Buttons">
                    <Button>
                      <span className="Dashboard-View-All">View All</span>
                    </Button>
                  </span>
                </div>
                <div>
                  <div className="d-flex">
                    <span className="Basic-text">Basic </span>
                    <span className="Dashboard-Progres-line">
                      <Progress percent={60} strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                        format={percent => `${percent}`} />

                    </span>


                  </div>
                  <div className="d-flex">
                    <span className="Basic-teams">Teams</span>
                    <span className="Dashboard-Progres-line">
                      <Progress percent={60} strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                        format={percent => `${percent}`} />

                    </span>


                  </div>

                  <div className="d-flex">
                    <span className="Basic-Premium">Premium</span>
                    <span className="Dashboard-Progres-line">
                      <Progress percent={60} strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                        format={percent => `${percent}`} />
                    </span>
                  </div>
                  <div className="d-flex">
                    <span className="Basic-Enterprise">Enterprise</span>
                    <span className="Dashboard-Progres-line">
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


            <div className="col-4">
              <div className="First-Boards-Numbers-customs">
                <div className="d-flex mr-26">
                  <span className="Dashsbord-First-Men mr-auto">
                    Custom Promo
                  </span>
                  <span className="Dashboard-Border-Buttons">
                    <Button>
                      <span className="Dashboard-View-All">View All</span>
                    </Button>
                  </span>
                </div>
                <div>
                  <div className="d-flex mr-31">
                    <img src={EventsImage} className="Dashboard-new-year" alt="" />
                    <span className="New-Year-Sales-Dashboards mr-auto">New Year Sale</span>
                    <span className="Dashbord-Runed">
                      <Button>
                        <span className="Dashbord-Running-Text">Running</span>
                      </Button>
                    </span>
                  </div>

                  <div className="d-flex mr-31">
                    <img src={EventsImage} className="Dashboard-new-year" alt="" />
                    <span className="New-Year-Sales-Dashboards mr-auto">New Year Sale</span>
                    <span className="Dashbord-Runed">
                      <Button>
                        <span className="Dashbord-Running-Text">Running</span>
                      </Button>
                    </span>
                  </div>
                  <div className="d-flex mr-31">
                    <img src={EventsImage} className="Dashboard-new-year" alt="" />
                    <span className="New-Year-Sales-Dashboards mr-auto">New Year Sale</span>
                    <span className="Dashbord-Runed">
                      <Button>
                        <span className="Dashbord-Running-Text">Running</span>
                      </Button>
                    </span>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-4 pr-0">
              <div className="First-Boards-Numbers-active">
                <div className="d-flex mr-11">
                  <span className="Dashsbord-First-Men mr-auto">
                    Active Users
                  </span>
                  <span className="Dashboard-Border-Buttons">
                    <Button>
                      <span className="Dashboard-View-All">View All</span>
                    </Button>
                  </span>
                </div>
                <div>
                  <Line data={data} options={options} 
                  // width={100}
                  // height={20}
                   />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </span>
      </div >
    );
  }
}
export default withRouter(Dashboard);
