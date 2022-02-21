import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../../Views/Loader/Loader";
import chat from '../../assets/images/chat.png';
import Api from '../../Api/ApiUtils';
import send from '../../assets/images/send.png';
import { Input, Button } from 'antd';
import profile from "../../assets/images/Image.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Day: false,
      Week: true,
      loader: false,
      dashboard: "",
      comment: '',
      Month: false,
      acquired_filter: "",
      activeUserCount: "",
      deActiveUserCount: "",
      chatBox: false,
      filteredUserCount: "",
      userTotalCount: "",
    };
  }

  onKeyPress = (e) => {
    if (e.which === 13 && this.state.allowcomment) {
      this.addComment();
    }
  };

  handleinput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  componentDidMount() {
    this.setState({ loader: false });
  }


  addComment = (e) => {
    // // e.preventDefault()
    // this.setState({ loader: true, allowcomment: false });

    // let payload = {
    //     user_id: this.state.userdata.id,
    //     poll_id: this.state.featuredpolldetail.id,
    //     comment: this.state.comment,
    // };
    // if (this.commentValidator.allValid()) {
    //     Api.addComment(payload)
    //         .then((res) => {
    //             if (res) {
    //                 console.log('res', res);
    //                 console.log('res data', res.data);
    //                 this.setState({ comment: '', allowcomment: true });
    //                 let payload = {
    //                     poll_id: this.state.pollid,
    //                     record_count: this.state.pageChecking,
    //                     limit: this.state.limit,
    //                     user_id: this.state.userdata.id,
    //                 };

    //                 this.getAllComments(payload);
    //                 this.getpollDetails(this.state.pollid);
    //             }
    //         })
    //         .catch((err) => {
    //             if (err) {
    //                 console.err(err);
    //             }
    //             this.setState({ loader: false, allowcomment: true });
    //         });
    // } else {
    //     this.setState({ loader: false, allowcomment: true });
    // }
  };
  chatbox() {
    console.log("CHat Box")
    this.setState({ chatBox: true })
  }

  render() {
    return (
      <div className="Dashbaord-content">
        {this.state.loader ? <Loader /> : null}
        <span style={this.state.loader ? { opacity: '0.4' } : null}>
          <div className="d-flex">
            <span className="Main-page-Dashbaord mr-auto">Home</span>

          </div>
          <hr></hr>
          <div className="row">
            <div className="d-flex">
              <img src={profile} style={{ width: '70px', height: '60px' }}></img>
              <div className="whats-happening">What's happening?</div>
            </div>
          </div>
          <div className="row w-100">
            <div className="d-flex">
              {/* <div className="button-input-field">
                <Input placeholder='Tweet here'></Input>
              </div> */}

              <div className="button-input-field">
                <Input
                  placeholder="Tweet Here"
                  className="button-input-field"
                />
              </div>


              <div className="button-class-for-tweet">
                <Button><span className="Tweet">Tweet</span></Button>
              </div>

            </div>
            <div className="row w-100" style={{ marginLeft: '23px' }}>
              <div className="praeetk-border">
                <div className="d-flex">
                  <span className="prateek-sengar">prateek sengar</span>
                  <span className="email-address-design">@prateksenagr</span>
                  <span className="august-30"> August 30</span>
                </div>
                <div className="yo-thank-you">
                  Yo ! Thank You
                </div>

                <div className="chatbox1" onClick={() => { this.chatbox() }}>
                  <img
                    src={chat}
                    alt=""
                    className="like"
                  // onClick={() => {
                  //   this.executeScroll();
                  // }}
                  ></img>

                  {/* <span className="numbers">{this.state.featuredpolldetail.comment_count}</span> */}
                </div>

                {this.state.chatBox == true ?
                  <div className="row styled-row-imput">
                    <div className="inputfiledperfex">
                      <Input
                        placeholder="Add Comment"
                        className="Prefixplace"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleinput}
                        onKeyPress={this.onKeyPress}
                        prefix={
                          <img
                            src={profile}
                            alt=""
                            className="david-inputclass rounded-circle"
                          />
                        }
                        suffix={<img src={send} alt="" onClick={(e) => (this.state.allowcomment ? this.addComment(e) : '')}></img>}
                      />
                      {/* <div className="err-message-email">{this.commentValidator.message('comment text', this.state.comment, 'required')}</div> */}
                    </div>
                  </div> : ""}

              </div>
            </div>



            <div className="row w-100" style={{ marginLeft: '23px' }}>
              <div className="praeetk-border">
                <div className="d-flex">
                  <span className="prateek-sengar">prateek sengar</span>
                  <span className="email-address-design">@prateksenagr</span>
                  <span className="august-30"> August 30</span>
                </div>
                <div className="yo-thank-you">
                  Yo ! Thank You
                </div>

                <div className="chatbox1" onClick={() => { this.chatbox() }}>
                  <img
                    src={chat}
                    alt=""
                    className="like"
                  // onClick={() => {
                  //   this.executeScroll();
                  // }}
                  ></img>

                  {/* <span className="numbers">{this.state.featuredpolldetail.comment_count}</span> */}
                </div>

                {this.state.chatBox == true ?
                  <div className="row styled-row-imput">
                    <div className="inputfiledperfex">
                      <Input
                        placeholder="Add Comment"
                        className="Prefixplace"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleinput}
                        onKeyPress={this.onKeyPress}
                        prefix={
                          <img
                            src={profile}
                            alt=""
                            className="david-inputclass rounded-circle"
                          />
                        }
                        suffix={<img src={send} alt="" onClick={(e) => (this.state.allowcomment ? this.addComment(e) : '')}></img>}
                      />
                      {/* <div className="err-message-email">{this.commentValidator.message('comment text', this.state.comment, 'required')}</div> */}
                    </div>
                  </div> : ""}

              </div>
            </div>




            <div className="row w-100" style={{ marginLeft: '23px' }}>
              <div className="praeetk-border">
                <div className="d-flex">
                  <span className="prateek-sengar">prateek sengar</span>
                  <span className="email-address-design">@prateksenagr</span>
                  <span className="august-30"> August 30</span>
                </div>
                <div className="yo-thank-you">
                  Yo ! Thank You
                </div>

                <div className="chatbox1" onClick={() => { this.chatbox() }}>
                  <img
                    src={chat}
                    alt=""
                    className="like"
                  // onClick={() => {
                  //   this.executeScroll();
                  // }}
                  ></img>

                  {/* <span className="numbers">{this.state.featuredpolldetail.comment_count}</span> */}
                </div>

                {this.state.chatBox == true ?
                  <div className="row styled-row-imput">
                    <div className="inputfiledperfex">
                      <Input
                        placeholder="Add Comment"
                        className="Prefixplace"
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleinput}
                        onKeyPress={this.onKeyPress}
                        prefix={
                          <img
                            src={profile}
                            alt=""
                            className="david-inputclass rounded-circle"
                          />
                        }
                        suffix={<img src={send} alt="" onClick={(e) => (this.state.allowcomment ? this.addComment(e) : '')}></img>}
                      />
                      {/* <div className="err-message-email">{this.commentValidator.message('comment text', this.state.comment, 'required')}</div> */}
                    </div>
                  </div> : ""}

              </div>
            </div>






          </div>
        </span>
      </div >
    );
  }
}
export default withRouter(Dashboard);
