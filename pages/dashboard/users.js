import Link from 'next/link';
import Header from '../../components/header.js';
import MenuAdmin from '../../components/menuAdmin.js';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import actions from '../../redux/actions';
import { getCookie } from '../../utils/cookie';
import moment from 'moment';

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

  render() {
    return (
      <div>
        <div className="container-item container-header">
          <div className="column">Name</div>
          <div className="column">Email</div>
          <div className="column">Gender</div>
          <div className="column">Date of Birth</div>
          <div className="column">ID Type</div>
          <div className="column">ID Number</div>
          <div className="column">Photo of ID</div>
          <div className="column">Photo of Face</div>
          <div className="column">Status</div>
        </div>
      {this.props.users.map((user, key) => {
        return (
          <div key={key} className="container-item">
            <div className="column">{user.fullname}</div>
            <div className="column">{user.email}</div>
            <div className="column">{user.gender}</div>
            <div className="column">{user.pob}, {moment(user.dob).format("DD MMM YYYY")}</div>
            <div className="column">{user.idType}</div>
            <div className="column">{user.idNumber}</div>
            <div className="column">
              <a href={"#photoId"+key}><img src={user.photoId} className="thumbnail"/></a>
              <a href="#_" className="lightbox" id={"photoId"+key}><img src={user.photoId}/></a>
            </div>
            <div className="column">
              <a href={"#photoFace"+key}><img src={user.photoFace} className="thumbnail"/></a>
              <a href="#_" className="lightbox" id={"photoFace"+key}><img src={user.photoFace}/></a>
            </div>
            <div className="column action">
              {user.isApproved ?
                (<div className="status approved">approved</div>) :
                (<div><div className="status pending">pending</div><div onClick={() => this.approve(user._id )} className="btn-primary btn-small">Approve</div></div>)}
            </div>
          </div>
        )

      })}
      <style jsx>{`
        .container-item {
          width; 100%;
          display: flex;
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
          flex: 1;
          overflow-wrap: break-word;
          margin: 10px;
        }

        .thumbnail {
          max-width: 40%;
          margin: 0 auto;
        }

        .action {
          display: flex;
          flex-direction: column;
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
    this.approveUser = this.approveUser.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAllUsers({},'getAllUsers'));
  };

  approveUser(uid) {
    this.props.approveUser({uid: uid}, 'approveUser');
  }

  render() {
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
            <form className="form-container">
              <UserItem users={this.props.users} approveUser={this.approveUser}/>
            </form>
          </div>
        </div>
        <style jsx>{`
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

        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const users = JSON.parse(state.user.user_data_array);
  return {
    users: users
  }
}

export default connect(mapStateToProps, actions)(Users);
