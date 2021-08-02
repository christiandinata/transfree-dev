import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideNav, {
	Toggle,
	Nav,
	NavItem,
	NavIcon,
	NavText,
} from "@trendmicro/react-sidenav";

//Sidebar untuk user
export default class SideBar extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				{/* <Header />
                <Menu /> */}
				<SideNav
					styles={sidebarStyles}
					onSelect={(selected) => {
						// Add your code here
					}}>
					<SideNav.Toggle />
					<SideNav.Nav defaultSelected="home" styles={sidebarStyles}>
						<NavItem eventKey="home">
							<NavIcon>
								<i
									className="fa fa-fw fa-home"
									style={{ fontSize: "1.75em" }}
								/>
							</NavIcon>
							<NavText>
								<a href="/editprofile">Edit Profile</a>
							</NavText>
						</NavItem>
						<NavItem eventKey="charts">
							<NavIcon>
								<i
									className="fa fa-fw fa-line-chart"
									style={{ fontSize: "1.75em" }}
								/>
							</NavIcon>
							<NavText>
								<a href="/user/profile">Edit PhoneNumber</a>
							</NavText>
						</NavItem>
					</SideNav.Nav>
				</SideNav>
			</div>
		);
	}
}

const sidebarStyles = {
	sidebar: {
		backgroundColor: "dodgerblue",
		width: "300px",
	},
};
