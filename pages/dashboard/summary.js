import Header from '../../components/header.js';
import MenuAdmin from '../../components/menuAdmin.js';
import {connect} from 'react-redux';
import initialize from '../../utils/initialize';
import actions from '../../redux/actions';
import NumberFormat from 'react-number-format';
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class SummaryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: null
        }
    }

    render() {
        return (
            <div>
                <div className="container-item container-header">
                    <div className="column">Name</div>
                    <div className="column currency">Total Amount</div>
                </div>
                {this.props.users.map((summary, key) => {
                    return (
                        <div key={key} className="container-item">
                            <div className="column">{summary.sender_name}</div>
                            <div className="column currency"><strong><NumberFormat value={summary.total_amount}
                                                                                   displayType={'text'}
                                                                                   thousandSeparator={true}
                                                                                   decimalScale={2}/> IDR
                            </strong></div>
                        </div>
                    )

                })}
                <style>{`
        .container-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eaeaea;
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }

        .container-header {
          text-transform: uppercase;
          background-color: #F6F8FB;
          font-size: 12px;
          color: #666;
          border-radius: 4px 4px 0 0;
        }

        .column {
          width: 160px;
          padding: 10px;
          overflow-wrap: break-word;
        }

        .btn-small {
          padding: 8px;
          width: 10%;
          margin-left: 2px;
          margin-top: 0;
          margin-bottom: 0;
          font-size: 12px;
        }

        .btn-small:hover {
          cursor: pointer;
        }

        .currency {
          text-align: right;
        }


      `}</style>
            </div>
        )
    }
}

class Summary extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.state = {
            name: '',
            fromDate: firstDay.getTime(),
            toDate: lastDay.getTime()
        }

        this.handleName = this.handleName.bind(this);
        this.handleFromDate = this.handleFromDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    static async getInitialProps(ctx) {
        initialize(ctx);
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        await ctx.store.dispatch(actions.getCustomerSummary('', firstDay.getTime(), lastDay.getTime(), "getOrderSummary",ctx.req));
    };

    handleSearch() {
        this.props.getCustomerSummary(this.state.name, this.state.fromDate, this.state.toDate, "getOrderSummary");
    }

    handleName(event) {
        this.setState({name: event.target.value});
    }

    handleFromDate = date => {
        this.setState({
            fromDate: date.getTime()
        });
    };

    handleToDate = date => {
        this.setState({
            toDate: date.getTime()
        });
    };

    render() {
        return (
            <div>
                <Header/>
                <MenuAdmin/>
                <div className="container-fluid">
                    <div className="container-fixed">
                        <div className="list-header">
                            <div className="left"><h2>Summary</h2></div>
                            <input type="text" placeholder="Search user" onChange={this.handleName}
                                   value={this.state.name}/>
                            From
                            <DatePicker
                                selected={this.state.fromDate}
                                onChange={this.handleFromDate}
                            />
                            To
                            <DatePicker
                                selected={this.state.toDate}
                                onChange={this.handleToDate}
                            />
                            <button className="btn-primary btn-small" onClick={this.handleSearch}>Search</button>
                        </div>
                        {this.props.inProgress ? (
                            <div className="overlay">
                                <div className="overlay-content">
                                    <FontAwesomeIcon icon="sync-alt" color="white" size="4x" spin/>
                                    <p>Getting list of customer summary from database...</p>
                                </div>
                            </div>
                        ) : (
                            <form className="form-container">
                                <SummaryItem users={this.props.users}/>
                            </form>
                        )}
                    </div>
                </div>
                <style>{`
          .overlay {
            display: block;
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0, 0.9);
            transition: 0.3s;
            color: #fff;
          }

          .overlay-content {
            position: relative;
            top: 30%;
            width: 100%;
            text-align: center;
            margin-top: 30px;
          }

          .overlay-content p {
            margin: 30px auto;
          }

          .pagination-container {
            padding: 30px 0;
          }

          .container-fluid {
            align-items: flex-start;
            height; auto;
          }
          
          .container-fixed {
            max-width: 1280px;
            margin: 10px auto;
          }

          .form-container {
            width: 1140px;
            height: auto;
            margin: 30px auto;
            background: #FFFFFF;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
            border-radius: 8px;
            text-align: center;
          }

          h2 {
            margin: 0;
          }

          .list-header {
            display: flex;
            width: 100%;
            font-size: 14px;
            margin-bottom: 30px;
            justify-content: space-between;
            align-items: center;
          }

          .list-header .right {
            text-align: right;
            display: flex
            align-self: flex-end;
          }

          .list-header a {
            text-decoration: none;
            color: #469DDD;
          }

          input[type=text] {
            border: 1px solid #EAEDF2;
            font-size: 14px;
            padding: 8px 8px 8px 8px;
            border-bottom: 1px solid #eaeaea;
            background-color: #EAEDF2;
            border-radius: 8px;
            width: auto;
          }
          
          .react-datepicker__input-container input {
            margin: 0;
          }
          
          .react-datepicker-wrapper, .react-datepicker__input-container {
            width: auto;
          }

          .btn-tertiary {
            margin: 20px auto;
          }

        `}</style>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    if (state.summary.summary != null) {
        return {
            users: state.summary.summary,
            inProgress: false
        }
    } else {
        return {
            inProgress: true
        }
    }
}

export default connect(mapStateToProps, actions)(Summary);
