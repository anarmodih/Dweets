import React, { Component } from 'react';
import Api from "../../Api/ApiUtils";
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CustomInput } from 'reactstrap';
import "moment-timezone";
import LoaderComponent from '../../loader';
import { Pagination, Table } from 'antd';
import { CurrencyFormat } from '../../sharedFiles/currency';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

const columns = [
    {
        title: <div className="table-title padding-space-1">#</div>,
        dataIndex: 'id',
        key: 'id',
        width: "5%",
    },
    {
        title: <div className="table-title">Organization Name</div>,
        dataIndex: 'organizationName',
        key: 'organizationName',
        width: "19%",
    },
    {
        title: <div className="table-title">User Name</div>,
        dataIndex: 'userName',
        key: 'userName',
        width: "19%",
    },
    {
        title: <div className="table-title">Card Number</div>,
        dataIndex: 'cardNumber',
        key: 'cardNumber',
        width: "17%",
    },
    {
        title: <div className="table-title table-text-left">Card Status</div>,
        dataIndex: 'cardStatus',
        key: 'cardStatus',
        width: "13%",
    },
    {
        title: <div className="table-title table-text-left">Card Service Type</div>,
        dataIndex: 'cardServiceType',
        key: 'cardServiceType',
        width: "13%"
    },
    {
        title: <div className="table-title table-text-left">Card Active/Inactive</div>,
        dataIndex: 'cardActive',
        key: 'cardActive',
        width: "7%",
    },
    {
        title: <div className="table-title table-text-left">Cancel Card</div>,
        dataIndex: 'cancelCard',
        key: 'cancelCard',
        width: "7%",
    },
];

class MerchantCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            loader: false,
            currentPage: 1,
            total: '',
            pageSize: '',
            pages: '',
            deleteModal: false,

            customTransaction: [],
            expandedCardsData: [],
            expandedRowKeys1: []
        };
        this.srNo = 0;
    }

    componentDidMount() {
        const payload = {
            merchantId: this.props.match.params.id,
            page: this.state.currentPage - 1,
        };
        this.getData(payload);
    }

    //get records
    getData(payload) {
        this.setState({ loader: true });
        Api.getSuspectedMerchantCards(payload)
            .then((res) => {
                if (res.data !== undefined) {
                    this.setState({
                        cards: res.data.transactionData, total: res.data.total, pageSize: res.data.pageSize,
                        pages: res.data.pages
                    });
                }
                this.setState({ loader: false });
            })
            .catch((err) => {
                if (err.errors)
                    toast.error(err.errors.msg);
                else
                    toast.error("Error Occurred");
                this.setState({ loader: false });
            });
    }

    currencyFormat(value) {
        if (value === undefined) {
            return null;
        }
        else {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(value);
        }

    }

    handleCheckBox = (id, transactionId, index, event) => {
        let payload = {
            id: id,
            isBlockedByAdmin: event.target.checked ? '0' : '1',
            transactionId: transactionId
        }

        const { cards } = this.state;
        cards[index].card.cardStatus = event.target.checked ? 'freexe' : 'unfreeze';

        this.setState({ loader: true })
        Api.changeSuspectedMerchantCardStatus(payload)
            .then((res) => {
                if (res.msg !== undefined) {
                    toast.success(res.msg)
                    let payload = {
                        merchantId: this.props.match.params.id,
                        page: this.state.currentPage - 1
                    }
                    this.setState({ cards, loader: false }, () => this.getData(payload))
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

    _handlePagination = page => {
        this.setState({ currentPage: page }, () => {
            let data = {
                merchantId: this.props.match.params.id,
                page: this.state.currentPage - 1
            }
            this.getData(data);
        });
    };

    deleteCard = () => {
        const payload = {
            cardId: this.state.deleteId
        };
        this.setState({ loader: true })
        Api.deleteCard(payload)
            .then((res) => {
                if (res.msg !== undefined) {
                    toast.success(res.msg);
                    this.setState({ deleteModal: !this.state.deleteModal, loader: false }, () => {
                        let payload = {
                            merchantId: this.props.match.params.id,
                            page: this.state.currentPage - 1
                        }
                        this.getData(payload);
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

    expandRow(expanded, event) {
        if (expanded === true) {
            var keys = [];
            keys.push(event.cardId);
            this.setState({ expandedRowKeys1: keys });
            const payload = {
                merchantId: this.props.match.params.id,
                cardId: event.cardId
            };
            this.setState({ loader: true });
            Api.getSuspectedMerchantCards(payload)
                .then((res) => {
                    if (res.data !== undefined) {
                        this.setState({
                            expandedCardsData: res.data.transactionData
                        });
                    }
                    this.setState({ loader: false });
                })
                .catch((err) => {
                    if (err.errors)
                        toast.error(err.errors.msg);
                    else
                        toast.error("Error Occurred");
                    this.setState({ loader: false });
                });
        }
    }
    getIndex() {
        this.srNo++;
        return (this.srNo);
    }

    render() {
        let { cards } = this.state;
        let start = cards.length > 0 ? (this.state.pageSize * (this.state.currentPage - 1)) : null;
        this.srNo = start;

        let customTransaction = cards.length > 0 && cards.map((data, index) => {
            return {
                key: data.id,
                cardId: data.card && data.card.id,
                id: <div>{this.getIndex()}</div>,
                organizationName: <div>{data.company && data.company.legalName || ""}</div>,
                userName: <div> {data.user && data.user.firstName ? data.user.firstName : ""}{data.user && data.user.lastName ? " " + data.user.lastName : ""}</div>,
                cardNumber: <div>{data.card && data.card.cardNumber || ""}</div>,
                cardStatus: <div className="common-capitalize">{data.card && data.card.cardStatus || ""}</div>,
                cardServiceType: <div>{data.card && data.card.cardServiceType || "-"}</div>,
                cardActive: <div>
                    {data.card && data.card.status === 'cancelled' ? "Cancelled" :
                        <span className="table-text-left d-flex">
                            <span className="mr-3">{data.card && data.card.cardStatus === 'unfreeze' ? 'Active' : 'Inactive'}</span>
                            <CustomInput type="switch" id={index + 1} checked={data.card && data.card.cardStatus === 'unfreeze' ? true : false} onChange={this.handleCheckBox.bind(this, data.card && data.card.id, data.id, index)} />
                        </span>
                    }
                </div>,
                cancelCard: <div className="table-text-left">
                    {data.card && data.card.status === 'cancelled' ?
                        <i className="fa fa-trash fa-2x text-muted" style={{ opacity: '0.3', cursor: 'default' }} id={`delete-${data.card && data.card.id}`}></i>
                        :
                        <i className="fa fa-trash fa-2x text-muted" id={`delete-${data.card && data.card.id}`} onClick={() => this.setState({ deleteModal: !this.state.deleteModal, deleteId: data.card && data.card.id })}></i>
                    }</div>,
                description:
                    <table className="table-hover">
                        <thead>
                            <th className="table-text-left pb-2 border-bottom" style={{ width: "5%" }}>#</th>
                            <th className="table-text-left pb-2 border-bottom" style={{ width: "19%" }}>Amount</th>
                            <th className="table-text-left pb-2 border-bottom" style={{ width: "19%" }}>Local Currency Amount</th>
                            <th className="table-text-left pb-2 border-bottom" style={{ width: "17%" }}>Transaction Status</th>
                            <th className="table-text-left pb-2 border-bottom" style={{ width: "13%" }}>Auth ID</th>
                            <th style={{ width: "27%", border: "none" }}></th>
                        </thead>
                        <tbody>
                            {this.state.expandedCardsData && this.state.expandedCardsData.length > 0 ?
                                this.state.expandedCardsData.map((data, index) =>
                                    <tr key={index}>
                                        <td className={index === 0 ? "pt-2" : ""}>{index + 1}</td>
                                        <td className="table-text-left">{CurrencyFormat(data.localCurrencyLookup.alphaCode, data.transactionAmount)}</td>
                                        <td className="table-text-left">{CurrencyFormat(data.localCurrencyLookup.alphaCode, data.localCurrencyAmount)}</td>
                                        <td className="table-text-left common-capitalize">{data.transactionStatus || "-"}</td>
                                        <td className="table-text-left">{data.authId ?
                                            <a href={`https://dashboard.stripe.com/issuing/authorizations/${data.authId}`} target="_blank">{data.authId}</a>
                                            : "-"}
                                        </td>
                                    </tr>
                                )
                                : <tr className="no-data-found text-center"><td colSpan="5" className="text-center"><i className="text-muted icon-ban" ></i>No Data Found</td></tr>}
                        </tbody>
                    </table >
            }
        });

        return (
            <div>
                {this.state.loader ? <LoaderComponent /> : null}
                <div className="animated fadeIn" style={this.state.loader ? { opacity: '0.3' } : null}>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i>Transactions
                                </div>
                                <div className="card-body">
                                    <Table columns={columns} dataSource={customTransaction} scroll={{ x: 1100 }}
                                        onExpand={(expanded, record) => this.expandRow(expanded, record)}
                                        expandedRowKeys={this.state.expandedRowKeys1}
                                        {...this.state} expandIconColumnIndex={9} expandIconAsCell={false} pagination={false}
                                        rowKey={record => record.cardId}
                                        expandable={{
                                            expandedRowRender: record => <span className="margin-style-4">{record.description}</span>,
                                            expandIcon: ({ expanded, onExpand, record }) =>
                                                expanded ? (
                                                    <DownOutlined onClick={e => onExpand(record, e)} />
                                                ) : (
                                                    <RightOutlined onClick={e => onExpand(record, e)} />
                                                )
                                        }}
                                    > </Table>

                                    <div className="row mt-3">
                                        <div className="col-lg-3 col-md-3 col-sm-12 text-left pt-2"><span>Showing {cards.length > 0 ? (this.state.pageSize * (this.state.currentPage - 1)) + 1 : 0} to {((this.state.pageSize * (this.state.currentPage - 1)) + 1) + cards.length - 1} of {this.state.total} records</span></div>
                                        <div className="col-lg-9 col-md-9 col-sm-12 text-right">
                                            {this.state.total > 0 &&
                                                <Pagination
                                                    // className="float-right"
                                                    onChange={this._handlePagination.bind(this)}
                                                    pageSize={this.state.pageSize}
                                                    current={this.state.currentPage}
                                                    total={this.state.total}
                                                />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Delete */}
                    <Modal isOpen={this.state.deleteModal} toggle={() => this.setState({ deleteModal: !this.state.deleteModal })}>
                        <ModalHeader toggle={() => this.setState({ deleteModal: !this.state.deleteModal })}>Confirmation</ModalHeader>
                        <ModalBody>
                            Are you sure you want to cancel this card? Once you cancel this card you can not undo this action.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.deleteCard.bind(this)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={() => this.setState({ deleteModal: false })}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div >
        )
    }
}
export default MerchantCards;