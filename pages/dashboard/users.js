import Header from '../../components/header.js';
import MenuAdmin from '../../components/menuAdmin.js';
import UserDetailPopUp from '../../components/dashboard/users/UserDetailPopUp';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import actions from '../../redux/actions';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null
    }
  }

  approve(uid) {
    this.props.approveUser(uid);
  }

  delete(uid) {
    this.props.deleteUser(uid);
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr className="container-item container-header">
              <th className="column fullname">Name</th>
              <th className="column email">Email</th>
              <th className="column gender">Gender</th>
              <th className="column dob">Date of Birth</th>
              <th className="column idType">ID Details</th>
              <th className="column dttotCheckStatus">DTTOT Check Status</th>
              <th className="column status">Status</th>
            </tr>
          {this.props.users.map((user, key) => {
            return (
              <tr key={key} className="container-item">
                <td className="column">{user.fullname}</td>
                <td className="column">{user.email}</td>
                <td className="column">{user.gender}</td>
                <td className="column">{user.pob}, {moment(user.dob).format("DD MMM YYYY")}</td>
                <td className="column">
                  {user.idNumber ? 
                    (<div className="btn-primary btn-small" onClick={() => {this.props.getIdDetail(user)}}>Click to see details</div>) :
                    (<div className="status pending">No ID inserted</div>)
                  }
                </td>
                {user.isDttotWarningFlagRaised ?
                  <td className="column dttotWarningRaised">{`${user.dttotWarning.totalMatchFound} match${user.dttotWarning.totalMatchFound>1 ? 'es' : ''} found!`}</td> :
                  <td className="column">No match found!</td>
                }
                <td className="column action">
                  {user.isApproved ?
                    (<div className="status approved">approved</div>) :
                    (<div><div className="status pending">pending</div><div onClick={() => { if(window.confirm('Are you sure want to approve this '+user.fullname)) this.approve(user._id )}} className="btn-primary btn-small">Approve</div></div>)
                  }
                  <div onClick={() => { if (window.confirm('Are you sure you want to delete this '+user.fullname)) this.delete(user._id) } } className="btn-danger btn-small">Delete</div>
                </td>
              </tr>
            )

          })}
        </tbody>
      </table>
      <style jsx>{`
        table {
          border-collapse: collapse;
          min-width: 1280px;
        }

        td, th {
          border: 1px solid #eaeaea;
          border-collapse: collapse;
        }
        .container-item {
          width; 100%;
          border-bottom: 1px solid #eaeaea;
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
          overflow-wrap: break-word;
          padding: 10px;
        }

        .fullname,
        .email {
          width: 200px;
        }

        .gender {
          width: 100px;
        }

        .dob {
          width: 180px;
        }

        .idType,
        .idNumber {
          width: 100px;
        }

        .photoId,
        .photoFace {
          width: 150px;
        }

        .status {
          width: 100px;
        }

        .dttotCheckStatus {
          width: 100px;
        }

        .dttotWarningRaised {
          color: #CC0000;
        }

        .thumbnail {
          max-width: 40%;
          margin: 0 auto;
        }

        /** LIGHTBOX MARKUP **/

        .lightbox {
        	/** Default lightbox to hidden */
        	display: none;

        	/** Position and style */
        	position: fixed;
        	z-index: 999;
        	width: 100%;
        	height: 100%;
        	text-align: center;
        	top: 0;
        	left: 0;
        	background: rgba(0,0,0,0.8);
        }

        .lightbox img {
        	/** Pad the lightbox image */
        	max-width: 90%;
        	max-height: 80%;
        	margin-top: 2%;
        }

        .lightbox:target {
        	/** Remove default browser outline */
        	outline: none;

        	/** Unhide lightbox **/
        	display: block;
        }

        .status {
          text-transform: uppercase;
          font-size: 12px;
        }

        .approved {
          color: #32B44B;
        }

        .pending {
          color: #CC0000;
        }

        .btn-small {
          width: auto;
          padding: 8px;
          font-size: 12px;
        }

        .btn-small:hover {
          cursor: pointer;
        }


      `}</style>
      </div>
    )
  }
}

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      showPopUp : false,
      popUpUser : null
    }
    this.approveUser = this.approveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.handleFirstPage = this.handleFirstPage.bind(this);
    // this.handleLastPage = this.handleLastPage.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
    this.getIdDetail = this.getIdDetail.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAllUsers(1,'getAllUsers',ctx.req));
  };

  approveUser(uid) {
    this.props.approveUser({uid: uid}, 'approveUser');
  }

  deleteUser(uid) {
    this.props.deleteUser({uid: uid}, 'deleteUser');
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.props.getAllUsers(pageNumber, 'getAllUsers');
  }

  // handleFirstPage(pageNumber) {
  //   this.setState({activePage: pageNumber});
  //   this.props.getAllUsers(1, 'getAllUsers');
  // }

  // handleLastPage(pageNumber) {
  //   this.setState({activePage: pageNumber});
  //   this.props.getAllUsers(Math.ceil(this.props.totalDocs/10), 'getAllUsers');
  // }

  togglePopUp(){
    this.setState({showPopUp : !this.state.showPopUp});
  }

  getIdDetail(user){
    this.setState({popUpUser : user});
    this.togglePopUp();
  }

  render() {
    const {showPopUp, popUpUser} = this.state;

    return (
      <div>
        <Header />
        <MenuAdmin/>
        <div className="container-fluid">
          <div className="container-fixed">
            <div className="list-header">
              <div className="left"><h2>Users</h2></div>
              <div className="right">
                <input type="text" placeholder="Search user"/>
              </div>
            </div>
            { this.props.inProgress ? (
              <div className="overlay">
                <div className="overlay-content">
                  <FontAwesomeIcon icon="sync-alt" color="white" size="4x" spin/>
                  <p>Getting list of users from database...</p>
                </div>
              </div>
            ) : (
              <div>
              {showPopUp ? <UserDetailPopUp text="User ID Details" user={popUpUser} closePopUp={this.togglePopUp} /> : ''}
                <form className="form-container">
                  {this.handlePageChange}
                  <UserItem users={this.props.users} getIdDetail={this.getIdDetail} approveUser={this.approveUser} deleteUser={this.deleteUser} totalDocs={this.props.totalDocs}/>
                  {/* <div className="pagination">
                   <a  onClick={this.handleFirstPage}><span>&laquo;</span> </a>
                  <a  onClick={this.handleLastPage}><span>&raquo;</span></a> */}
                  <div className="pagination-container">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.props.totalDocs}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
        span {
          font-family:arial;
          font-size:40px;
          
      }
      a{
        margin-left:100px;
      }

          .pagination a.active {
            background-color: #4CAF50;
            color: white;
          }

          .pagination a:hover:not(.active) {background-color: #ddd;}

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

          .container-fluid {
            align-items: flex-start;
            height; auto;
          }

          .container-fixed {
            max-width: 1280px;
            margin: 50px auto;
          }

          .form-container {
            width: 1280px;
            height: auto;
            margin: 30px auto;
            padding: 0;
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
          }

          .list-header div {
            flex-basis: 50%;
          }

          .list-header .right {
            text-align: right;
            align-self: flex-end;
          }

          .list-header a {
            text-decoration: none;
            color: #469DDD;
          }

          input[type=text] {
            border: 1px solid #EAEDF2;
            font-size: 14px;
            padding: 8px 8px 8px 30px;
            border-bottom: 1px solid #eaeaea;
            background-color: #EAEDF2;
            border-radius: 8px;
            transition: all 0.4s ease-in-out;
            width: 200px;
            background-image: url('../static/images/ic-search.svg');
            background-position: 8px 8px;
            background-repeat: no-repeat;
          }

          input[type=text]:focus {
            outline: none;
            border: 1px solid #469DDD;
            background-color: #ECF3FA;
            width: 300px;
          }

          ::placeholder {
            color: #CACACA;
          }

          .btn-tertiary {
            margin: 20px auto;
          }

          .pagination-container {
            padding: 30px 0;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.user.user_data_array != null) {
    return {
      users: state.user.user_data_array.docs,
      totalDocs: state.user.user_data_array.totalDocs
    }
  } else {
    return {
      inProgress: state.user.inProgress
    }
  }
}

  export default connect(mapStateToProps, actions)(Users);
//  export default Users
