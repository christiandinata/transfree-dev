import Header from '../components/header.js';
import Menu from '../components/menu.js';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBar from './sidebar'
import Profile from './profile'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom"

class EditProfile extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    static async getInitialProps(ctx) {
        initialize(ctx);
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
      };

    render() {
        const { fullname, email, idType, idNumber, idName, gender, dob, pob, address } = this.props.users // menampung props yang telah diterima
        return (
            <div>
                <Header/>
                <Menu/>
                <SideBar/>
                <p>Haideaddddddddddddddddddd</p>
            </div>
        )
    }

    
}

// melakukan konversi state yang diambil dari store kedalam props
const mapStateToProps = (state) => ({
    users: state.user.user_data,
})
  
// menghubungkan props dengan Profile
export default connect(mapStateToProps)(EditProfile);