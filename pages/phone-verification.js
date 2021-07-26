import Header from "../components/header";
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
import { NavBarBlue } from "../components/MenuComponents";

//Verifikasi nomor handphone saat user register
function PhoneVerification(props) {
	const [state, setState] = useState({
		service_sid: "",
		code: "",
		isValidCode: true,
	});

	const size = useWindowSize();

	function useWindowSize() {
		// Initialize state with undefined width/height so server and client renders match
		// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
		const [windowSize, setWindowSize] = useState({
			width: undefined,
			height: undefined,
		});

		useEffect(() => {
			// only execute all the code below in client side
			if (typeof window !== "undefined") {
				// Handler to call on window resize
				function handleResize() {
					// Set window width/height to state
					setWindowSize({
						width: window.innerWidth,
						height: window.innerHeight,
					});
				}

				// Add event listener
				window.addEventListener("resize", handleResize);

				// Call handler right away so state gets updated with initial window size
				handleResize();

				// Remove event listener on cleanup
				return () => window.removeEventListener("resize", handleResize);
			}
		}, []); // Empty array ensures that effect is only run on mount
		return windowSize;
	}

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

			<NavBarBlue
				navChildColor="#fff"
				navText="Homepage"
				endpoint="/index"
			/>

			<FormContainer>
				{errorMsg ? <ErrorDiv>Wrong Verification Code</ErrorDiv> : null}
				<Form onSubmit={handleSubmit} type="verif">
					<FormInner>
						<center>
							<Heading className="bold">
								Verification code in your email
							</Heading>

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
								containerStyle={
									size.width < 375
										? "smallscreen"
										: "containerStyling"
								}
								inputStyle={
									errorMsg
										? "inputStyling error"
										: size.width < 375
										? "inputStyling-smallscreen"
										: "inputStyling"
								}
								focusStyle={
									errorMsg ? "focusError" : "focusStyling"
								}
								shouldAutoFocus={true}
								hasErrored={errorMsg ? "true" : null}
								errorStyle="errorStyling"
								isInputNum={true}
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
						</center>
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
					</FormInner>
				</Form>
			</FormContainer>
			<style jsx global>{`
				.containerStyling {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 80px 4px;
				}

				.containerStyling > div {
					width: 48px;
					height: 54px;
					margin-left: 4px;
					margin-right: 4px;
				}

				.smallscreen {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 80px 4px;
				}

				.inputStyling {
					font-size: 20px;
					line-height: 24px;
					font-weight: 700;
					color: #232933;
					width: 48px !important;
					height: 54px;
					border: 1px solid #e2e2e2;
					border-radius: 4px;
					padding: 0 !important;
					margin-left: -2px;
					margin-right: 4px;
				}

				.inputStyling.error {
					color: #ff0000;
					font-weight: 700;
				}

				.inputStyling-smallscreen {
					font-size: 20px;
					line-height: 24px;
					font-weight: 700;
					color: #232933;
					width: 40px !important;
					height: 48px;
					border: 1px solid #e2e2e2;
					border-radius: 4px;
					padding: 0 !important;
					margin-left: 4px;
					margin-right: 4px;
				}

				.focusStyling {
					border: 1px solid #009fe3 !important;
					outline: none;
				}

				.focusError {
					border: 2px solid #f80202 !important;
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
	transition: 0.4s all ease-in;

	@media (max-width: 620px) {
		width: 312px;
	}
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
	padding: 8px 24px;
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
	place-self: center;

	&:hover {
		background-color: #068ec8;
	}

	@media (max-width: 620px) {
		width: 296px;
	}

	@media (max-width: 375px) {
		width: 70vw;
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
