import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";

// Navbar for blue background with "Back to..." text
export function NavBarBlue(props) {
	return (
		<>
			<Nav>
				<NavInner>
					<a style={{ height: 17 }} href="/index">
						<Logo
							src="../static/images/transfree-logo.png"
							homepage="false"
						/>
					</a>
					<Navigation>
						<NavigationChild
							navChildColor={props.navChildColor}
							href={props.endpoint}>
							<FontAwesomeIcon
								icon={faArrowCircleLeft}
								style={{
									width: 24,
									height: 24,
									marginRight: "8px",
								}}
							/>
							Back to {props.navText}
						</NavigationChild>
					</Navigation>
				</NavInner>
			</Nav>
		</>
	);
}

// Navbar for white background (the same one as the navbar at homepage when scrolled, with profile info)
export function NavBarWhite(props) {
	return (
		<Nav scrolled="true" homepage="true" marginTop="0px">
			<Line />
			<NavInner>
				<a href="/">
					<Logo
						src="../static/images/transfree-logo.png"
						scrolled="true"
					/>
				</a>
				{props.isAuthenticated ? (
					<React.Fragment>
						<NavigationCenter>
							<NavigationChild
								href="/order"
								scrolled="true"
								homepage="true"
								navChildColor="#f5f5f5">
								Send Money
							</NavigationChild>
							<NavigationChild
								href="/account"
								scrolled="true"
								homepage="true"
								navChildColor="#f5f5f5"
								active={props.current == "transactions"}>
								Transactions
							</NavigationChild>
							<NavigationChild
								href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak"
								scrolled="true"
								homepage="true"
								navChildColor="#f5f5f5">
								How It Works
							</NavigationChild>
							<NavigationChild
								href="/about"
								scrolled="true"
								homepage="true"
								navChildColor="#f5f5f5"
								active={props.current == "aboutus"}>
								About Us
							</NavigationChild>
						</NavigationCenter>
						<NavigationChild
							href="/user-profile"
							scrolled="true"
							homepage="true"
							navChildColor="#f5f5f5">
							<ProfileInfo scrolled="true" name="true">
								{props.username}
							</ProfileInfo>
							<ProfileInfo scrolled="true" id="true">
								{props.id}
							</ProfileInfo>
						</NavigationChild>
					</React.Fragment>
				) : null}

				{!props.isAuthenticated ? (
					<React.Fragment>
						<Navigation>
							<NavigationChild
								href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak"
								scrolled="true"
								homepage="true"
								navChildColor="#f5f5f5">
								How It Works
							</NavigationChild>
							<NavigationChild
								href="/about"
								scrolled="true"
								homepage="true"
								navChildColor="#f5f5f5">
								About Us
							</NavigationChild>
							<SignInButton
								href="/login"
								scrolled="true"
								homepage="true">
								Sign In
							</SignInButton>
							<RegisterButton
								href="/signup"
								scrolled="true"
								homepage="true">
								Register
							</RegisterButton>
						</Navigation>
					</React.Fragment>
				) : null}
			</NavInner>
		</Nav>
	);
}

export const Line = styled.div`
	position: absolute;
	display: ${({ scrolled }) => (scrolled ? "none" : "flex")};
	/* height: 72px; */
	z-index: 11;
	border-bottom: 1px solid white;
	max-width: 1095px; // sesuaikan
	width: 100%;
	top: 72px;
	/* margin-top: 72px; */
	background-color: transparent;
	justify-content: center;
	place-self: center;

	@media only screen and (max-width: 900px) {
		display: none;
	}
`;

// wrap Nav
export const Outer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: sticky;
	height: 72px;
	top: 0;
	margin-top: -72px;
	z-index: 10;
	background-color: ${({ scrolled, homepage }) => {
		if (homepage) {
			if (scrolled) {
				return "#fff";
			} else {
				return "transparent";
			}
		} else {
			return "#009fe3";
		}
	}};

	@media only screen and (max-width: 900px) {
		background-color: #fff;
		display: block;
		padding-left: 20px;
		height: ${({ clicked }) => (clicked ? "350px" : "72px")};
	}
`;

export const Nav = styled.div`
	height: 72px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	transition: background 0.5s;
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: ${({ scrolled, homepage }) => {
		if (homepage) {
			if (scrolled) {
				return "#fff";
			} else {
				return "transparent";
			}
		} else {
			return "#009fe3";
		}
	}};
	margin-top: ${({ homepage }) => (homepage ? "-72px" : "null")};
	box-shadow: ${({ scrolled, homepage }) =>
		homepage && scrolled
			? "0px 10px 35px rgba(98, 107, 121, 0.15)"
			: "none"};
	padding: 0 106px; // sesuaikan
	background-color: transparent;

	@media only screen and (max-width: 900px) {
		background-color: #fff;
		display: block;
		padding: 0;
		margin-left: ${({ clicked }) => (clicked ? "-20px" : "null")};
		padding-left: ${({ clicked }) => (clicked ? "20px" : "null")};
		box-shadow: ${({ clicked }) => (clicked ? 
			"0px 2px 8px rgba(119, 119, 119, 0.2)"
			: "none")};
	}
`;

export const NavInner = styled.div`
	/* width: 1224px; */
	// display: flex;
	// justify-content: space-between;
	// align-items: center;
	/* margin: 0 106px; */
	/* border-bottom: ${({ scrolled, homepage }) =>
		homepage && !scrolled ? "1px solid white" : "none"}; */
	margin-left: -20px;
`;

export const LogoRef = styled.a`

`;

export const Logo = styled.img`
	width: 88px;
	height: 17px;
	-webkit-filter: ${({ scrolled, homepage }) =>
		homepage && !scrolled ? "brightness(0) invert(1)" : "none"};
	filter: ${({ scrolled, homepage }) =>
		homepage && !scrolled ? "brightness(0) invert(1)" : "none"};

	@media only screen and (max-width: 900px) {
		-webkit-filter: none;
		filter: none;
		padding: 20px 0;
	}
`;

export const ExpandButton = styled.button`
	display: none;

	@media only screen and (max-width: 900px) {
		display: ${({ clicked }) =>
			clicked ? "inline" : "inline"};
		float: right;
		padding: 21.25px 20.25px 21.25px 0;
		outline: none;
		border: none;
		text-decoration: none;
		background-color: #fff;
	}
`;

export const ExpandImage = styled.img`
	@media only screen and (max-width: 900px) {
		display: ${({ clicked }) =>
			clicked ? "none" : "inline"};
	}
`;

export const ExpandClose = styled.img`
	@media only screen and (max-width: 900px) {
		display: ${({ clicked }) =>
			clicked ? "inline" : "none"};
	}
`;

export const Navigation = styled.div`
	height: 72px;
	display: flex;
	align-items: center;

	@media only screen and (max-width: 900px) {
		display: ${({ clicked }) =>
			clicked ? "flex" : "none"};
		flex-direction: column;
		background-color: #fff;
		align-items: stretch;
		margin: 16px;
	}
`;

export const NavigationCenter = styled.div`
	height: 72px;
	display: flex;
`;

export const NavigationChild = styled.a`
	// height: 72px;
	display: flex;
	align-items: center;
	margin-right: 40px;
	text-decoration: none;
	font-style: normal;
	font-size: 16px;
	font-weight: normal;
	line-height: ${({ homepage }) => (homepage ? "24px" : "19px")};
	color: ${({ scrolled, homepage, navChildColor }) =>
		homepage && scrolled ? "#000" : navChildColor};
	&:hover {
		color: ${({ scrolled, navChildColor }) =>
			scrolled ? "#009fe3" : navChildColor};
		font-weight: 500;
		letter-spacing: 0.2px;
	}

	${({ active }) =>
		active &&
		`
		color: #009fe3;
		font-weight: 500;
  	`}

	@media only screen and (max-width: 900px) {
		color: #2B2A35;
		// margin: 16px 16px 0 16px;
		margin-top: 16px;
		margin-right: 0;
		padding-bottom: 16px;
		border-bottom: 1px solid #E2E2E2;
	}
`;

export const SignInButton = styled.a`
	align-items: center;
	text-decoration: none;
	outline: none;
	text-align: center;
	border: none;
	border-left: 1px solid #e9e9e9;
	color: ${({ scrolled, homepage }) =>
		homepage && scrolled ? "#9a9a9a" : "#fff"};
	background-color: transparent;
	font-size: 16px;
	line-height: 24px;
	font-style: normal;
	font-weight: normal;
	padding: 8px 24px;
	margin-right: 17px;

	&:hover {
		// color: ${({ scrolled }) => (scrolled ? "#009fe3" : "#fff")};
		// font-weight: 500;
		border: 1px solid #9a9a9a;
	}

	@media only screen and (max-width: 900px) {
		padding-left: 0;
		margin-top: 40px;
		margin-right: 0;
		color: #009FE3;
		border: 1px solid #009fe3;
		border-radius: 4px;
	}
`;

export const RegisterButton = styled.a`
	align-items: center;
	text-decoration: none;
	outline: none;
	padding: 8px 24px;
	background-color: ${({ scrolled, homepage }) =>
		homepage && scrolled ? "#009fe3" : "#fff"};
	color: ${({ scrolled, homepage }) =>
		homepage && scrolled ? "#fff" : "#009fe3"};
	border-radius: 4px;
	border: 1px solid #009fe3;
	font-size: 16px;
	line-height: 24px;
	font-style: normal;
	font-weight: normal;

	&:hover {
		background-color: ${({ scrolled, homepage }) =>
			homepage && scrolled ? "#068EC8" : "#eaeaea"};
		border: 1px solid #068ec8;
	}

	${({ active }) =>
		active &&
		`
		color: #009fe3;
		font-weight: 500;
  	`}

	@media only screen and (max-width: 900px) {
		padding-left: 0;
		margin-top: 8px;
		text-align: center;
		color: #fff;
		background-color: #009fe3;
	}
`;

export const ProfileInfo = styled.p`
	font-weight: 500;
	font-style: normal;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: ${({ name }) => (name ? "0.002em" : "0.2px")};
	border-left: ${({ id }) => (id ? "1px solid #e9e9e9" : "none")};
	color: ${({ name, id, scrolled }) => {
		if (name) {
			if (scrolled) {
				return "#2B2A35";
			} else {
				return "#fff";
			}
		}
		if (id) {
			if (scrolled) {
				return "#B4B4B4";
			} else {
				return "#F5F5F5";
			}
		}
	}};
	padding-left: ${({ id }) => (id ? "8px" : "0")};
	margin-right: ${({ name }) => (name ? "8px" : "0")};
`;
