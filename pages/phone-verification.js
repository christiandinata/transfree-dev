import Header from "../components/header";
import Menu from "../components/menu";
import Link from "next/link";
import { connect } from "react-redux";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import { getCookie } from "../utils/cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Form, FormContainer } from "../components/FormComponents";
import styled from "styled-components";
import OtpInput from "react-otp-input";
import Footer from "../components/footer";
import { NavBar } from "../components/MenuComponents";

//Verifikasi nomor handphone saat user register
function PhoneVerification(props) {
	// constructor({ props }) {
	// 	super(props);
	// 	this.state = {
	// 		service_sid: "",
	// 		code: "",
	// 		isValidCode: true,
	// 	};

	// 	this.checkCodeOTP = this.checkCodeOTP.bind(this);
	// }

	const [state, setState] = useState({
		service_sid: "",
		code: "",
		isValidCode: true,
	});

	const [filledCode, setFilledCode] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);

	function handleChange(value) {
		// const { name, value } = e.target;
		setState({
			...state,
			code: value,
		});
		console.log(state.code);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const { email, fullname, password, phone } = props.data;
		props.register(
			{
				fullname: fullname,
				email: email,
				password: password,
				phone: phone,
				code: state.code,
				serviceSid: props.serviceSid,
			},
			"register"
		);
	}

	function handleResendCode(e) {
		e.preventDefault();
		const { email, fullname, password, phone } = props?.data;
		props.verify(
			{
				phone: phone,
				email: email,
				fullname: fullname,
				password: password,
			},
			"verify"
		);
	}

	// const checkCodeOTP = () => {
	// 	if (props.errorMessage != "" && props.errorMessage != undefined) {
	// 		setState({
	// 			...state,
	// 			isValidCode: false,
	// 		});
	// 	} else {
	// 		setState({
	// 			...state,
	// 			isValidCode: true,
	// 		});
	// 	}
	// };

	// componentWillReceiveProps() {
	// 	this.checkCodeOTP();
	// }
	useEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		if (props.errorMessage?.includes("OTP")) {
			setError(true);
			setErrorMsg(true);
		}
		console.log(props.data);
		console.log(props.errorMessage);
	}, [props.errorMessage]);

	return (
		<>
			<Header />

			<NavBar navChildColor="#fff" navText="Homepage" endpoint="/index" />

			<FormContainer>
				{errorMsg ? <ErrorDiv>Wrong Verification Code</ErrorDiv> : null}
				<Form onSubmit={handleSubmit}>
					<FormInner>
						<center>
							<Heading>Verification code in your email</Heading>

							<BelowHeading>
								<p>Enter 6-digit code we sent to the email.</p>
								<p>
									The code valid for <b>5 minutes</b>
								</p>
							</BelowHeading>
							<OtpInput
								value={state.code}
								onChange={(value) => handleChange(value)}
								numInputs={6}
								containerStyle="containerStyling"
								inputStyle={
									errorMsg
										? "inputStyling error"
										: "inputStyling"
								}
								focusStyle="focusStyling"
								shouldAutoFocus={true}
								hasErrored={errorMsg ? "true" : null}
								errorStyle="errorStyling"
							/>
							<BelowHeading>
								<p>Didn't receive the code ?</p>
								<p>
									Please check your Spam or Promotion or{" "}
									<Link href="/">
										<a onClick={handleResendCode}>
											Resend Code
										</a>
									</Link>
								</p>
							</BelowHeading>
							<Button type="submit">
								{props.inProgress ? (
									<FontAwesomeIcon
										icon="sync-alt"
										spin
										style={{ width: 25, height: 25 }}
									/>
								) : (
									"Verify code"
								)}
							</Button>
						</center>
					</FormInner>
				</Form>
			</FormContainer>
			<style jsx global>{`
				.containerStyling {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 80px 0;
				}

				.inputStyling {
					font-weight: 700;
					color: #232933;
					width: 48px !important;
					height: 54px;
					margin: 8px;
					border: 1px solid #e2e2e2;
				}

				.inputStyling.error {
					color: #ff0000;
					font-weight: 700;
				}

				.focusStyling {
					border: 1px solid #009fe3 !important;
					outline: none;
				}

				.errorStyling {
					border: 1px solid #ff0000;
				}

				a {
					color: #009fe3;
				}
			`}</style>
			<Footer />
		</>
	);
}

const FormInner = styled.div`
	height: 100%;
	width: 480px;
	margin: 0 4px;
	display: flex;
	flex-direction: column;
`;

const Heading = styled.p`
	font-weight: bold;
	font-size: 32px;
	line-height: 40px;
	margin-bottom: 16px;
	color: #009fe3;
`;

const BelowHeading = styled.div`
	font-size: 14px;
	line-height: 20px;
	color: #232933;

	p {
		margin: 0;
	}
`;

const Button = styled.button`
	width: 328px;
	margin-top: 50px;
	margin-bottom: 40px;
	height: 40px;
	border-radius: 4px;
	background-color: #009fe3;
	color: white;
	font-size: 16px;
	font-weight: 500;
	outline: none;
	border: none;
	transition: 0.4s ease all;
	letter-spacing: 0.2px;

	&:hover {
		background-color: #068ec8;
	}
`;

const ErrorDiv = styled.div`
	background-color: #ff0000;
	width: 528px;
	height: 40px;
	margin-top: 16px;
	display: flex;
	color: #fff;
	font-weight: 500;
	font-size: 16px;
	letter-spacing: 0.2px;
	margin-bottom: -16px;
	line-height: 24px;
	align-items: center;
	justify-content: center;
`;

PhoneVerification.getInitialProps = async (ctx) => {
	initialize(ctx);
	if (ctx.isServer) {
		if (ctx.req.headers.cookie) {
			await ctx.store.dispatch(
				actions.getUser(getCookie("_id", ctx.req), "user", ctx.req)
			);
		}
	}
	return {};
};

const mapStateToProps = (state) => {
	return {
		serviceSid: state.verify.serviceSid,
		inProgress: state.verify.inProgress,
		data: state.initialDataUser.data_user,
		errorMessage: state.authentication.errorMessage,
	};
};

export default connect(mapStateToProps, actions)(PhoneVerification);
// {
// 	/* <div
// 				className={
// 					"error-container " +
// 					(this.props.errorMessage != "" &&
// 					this.props.errorMessage != undefined
// 						? "error-label"
// 						: "")
// 				}>
// 				{this.props.errorMessage}
// 			</div> */
// }
// {
// 	/* <div className="box-title">Code Verification</div>
// 			<form className="form-container" onSubmit={handleSubmit}>
// 				<h1>Join us</h1>
// 				<p>We have succesfully sent the code</p>
// 				<p>
// 					Your code valid for <span>5 minutes</span>
// 				</p>
// 				<label htmlFor="code">Verification Code</label>
// 				<br />
// 				<div id="divOuter">
// 					<div id="divInner">
// 						<input
// 							type="tel"
// 							id="partitioned"
// 							maxLength="6"
// 							required
// 							// placeholder="Enter 6-digit verification code"
// 							value={state.code}
// 							// onBlur={this.checkCodeOTP}
// 							onChange={(e) =>
// 								setState({ ...state, code: e.target.value })
// 							}
// 						/>
// 					</div>
// 				</div>

// 				<br></br>
// 				<span
// 					style={{
// 						fontSize: 13,
// 						color: "red",
// 						fontWeight: "normal",
// 					}}
// 					className={
// 						state.isValidCode ? "error-label-hidden" : "error-label"
// 					}>
// 					{props.errorMessage}
// 				</span>
// 				<div>
// 					<h2>Enter 6- Digit Code</h2>
// 					<p style={{ fontSize: 13 }}>
// 						No code showing on your email?{" "}
// 					</p>
// 					<p style={{ fontSize: 13 }}>
// 						Please check Spam or Promotion{" "}
// 						<a onClick={handleResendCode} className="link">
// 							Resend Code
// 						</a>
// 					</p>
// 				</div>

// 				<button type="submit" className="btn-primary">
// 					{props.inProgress ? (
// 						<FontAwesomeIcon
// 							icon="sync-alt"
// 							spin
// 							style={{ width: 40, height: 40 }}
// 						/>
// 					) : (
// 						"Verification Code"
// 					)}
// 				</button> */
// }

// // 	<div className="bottom-mobile">
// // 		<a onClick={handleResendCode}>
// // 			<span>Resend Code</span>
// // 			<img src="../static/images/features/resend code_icon.png" />
// // 		</a>
// // 		{/* <img src="../static/images/features/resend code_icon.png"/> */}
// // 	</div>
// // </form>

// // <div className="bottom">
// // 	<h1>
// // 		<Link href="/forgot-password">
// // 			<a className="link">Forgot Password? </a>
// // 		</Link>
// // 	</h1>
// // 	<p>
// // 		Don't you have an account?
// // 		<Link href="/signup">
// // 			<a className="link"> Sign up</a>
// // 		</Link>
// // 	</p>
// // </div>

// // <div className="bottom-container-web">
// // 	<div className="left">
// // 		<a href="/signup">
// // 			<img src="../static/images/Sign Up ASSET WEB/Component 2 – 12.png"></img>
// // 		</a>
// // 		<img src="../static/images/Sign Up ASSET WEB/Component 2 – 11.png"></img>
// // 	</div>
// // 	<div className="right">
// // 		{/* <p style={{fontSize:13}}><a className="link" href="/">&lt; Back to Home</a></p> */}
// // 	</div>
// // </div>

// // <style jsx>{`
// // 	#divInner {
// // 		left: 0px;
// // 		position: sticky;

// // 		background: red;
// // 	}

// // 	#divOuter {
// // 		width: 290px;
// // 		overflow: hidden;
// // 		text-align: center;
// // 		float: center;
// // 		padding-left: 1.5rem;
// // 	}

// // 	a :hover {
// // 		cursor: pointer;
// // 	}
// // 	.error-label-hidden {
// // 		display: none;
// // 	}
// // 	h1 {
// // 		font-size: 20px;
// // 		font-family: "Open Sans", sans-serif;
// // 		font-weight: 500;
// // 	}
// // 	#partitioned {
// // 		padding-left: 9px;
// // 		letter-spacing: 32px;
// // 		border: 0;
// // 		background-image: linear-gradient(
// // 			to left,
// // 			black 70%,
// // 			rgba(255, 255, 255, 0) 0%
// // 		);
// // 		background-position: bottom;
// // 		background-size: 50px 1px;
// // 		background-repeat: repeat-x;
// // 		background-position-x: 35px;
// // 		width: 300px;
// // 		min-width: 300px;
// // 		font-size: 30px;
// // 	}
// // 	.form-container input {
// // 		font-weight: 700;
// // 	}
// // 	.form-container label {
// // 		display: none;
// // 	}
// // 	.btn-primary {
// // 		margin-top: 20px;
// // 	}
// // 	.bottom {
// // 		display: none;
// // 	}
// // 	p {
// // 		font-size: 10px;
// // 		color: grey;
// // 	}
// // 	h2 {
// // 		color: #707070;
// // 		font-size: 15px;
// // 		margin-bottom: 20%;
// // 		font-weight: 640;
// // 	}
// // 	.form-container span {
// // 		font-weight: 900;
// // 		color: #000000;
// // 	}
// // 	.bottom-mobile {
// // 		display: none;
// // 	}
// // 	.bottom-mobile img {
// // 		height: 15%;
// // 		width: 15%;
// // 		margin-left: 5%;
// // 		// margin-top:6%;
// // 	}

// // 	.bottom-container-web {
// // 		display: flex;
// // 		flex-direction: row;
// // 		// background:blue;
// // 		margin: 0 auto;
// // 		width: 100%;
// // 		align-items: flex-start;
// // 		justify-content: flex-start;
// // 		align-self: flex-start;
// // 	}

// // 	.bottom-container-web .left {
// // 		flex-basis: 26%;
// // 		// background:red;
// // 		display: flex;
// // 		margin-top: 1%;
// // 		justify-content: flex-end;
// // 		align-self: flex-start;
// // 	}

// // 	.bottom-container-web .right {
// // 		flex-basis: 60%;
// // 		// background:yellow;
// // 		text-align: left;
// // 		margin-top: 1%;
// // 		align-items: flex-start;
// // 		justify-content: flex-start;
// // 		align-self: flex-start;
// // 		margin-top: -1%;
// // 	}

// // 	.bottom-container-web img {
// // 		height: 25px;
// // 		width: 25px;
// // 		tex-align: center;
// // 	}

// // 	a {
// // 		margin: 0px;
// // 		padding: 0px;
// // 	}
// // 	@media only screen and (max-width: 414px) {
// // 		#partitioned {
// // 			min-width: 210px;
// // 			font-size: 30px;
// // 		}
// // 		#divOuter {
// // 			width: 290px;
// // 			overflow: hidden;
// // 			text-align: center;
// // 			float: center;
// // 			padding-left: 1rem;
// // 		}
// // 		.form-container h1 {
// // 			display: none;
// // 		}
// // 		.form-container p {
// // 			font-size: 15px;
// // 			margin: 0px;
// // 		}
// // 		.form-container > div p {
// // 			display: none;
// // 			font-size: 90px;
// // 		}
// // 		.btn-primary {
// // 			margin-top: 0%;
// // 		}
// // 		.form-container {
// // 			// padding-bottom:30%;
// // 		}
// // 		.bottom-mobile {
// // 			margin-top: 25%;
// // 			display: inline-block;
// // 			text-align: right;
// // 			//  background:red;
// // 			vertical-align: middle;
// // 		}
// // 		a {
// // 			text-decoration: none;
// // 		}
// // 		.bottom-container-web {
// // 			display: none;
// // 		}
// // 	}
// // `}</style>
