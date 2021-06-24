import Link from "next/link";
import { useState, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { connect } from "react-redux";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as axios from "axios";
import ENV from "../config";
import Header from "../components/header";
import { NavBar } from "../components/MenuComponents";
import styled from "styled-components";
import OtpInput from "react-otp-input";
// import batik from "../static/images/Batik_World_Map_1.png";

//Component yang ditampilkan saat user memilih opsi forgot password
function ForgotPassword(props) {
	const [step, setStep] = useState("email");

	const [values, setValues] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		code: "",
		sid: "",
	});

	const [selected, setSelected] = useState({
		email: false,
		password: false,
		confirmPassword: false,
	});

	const [filled, setFilled] = useState({
		email: false,
		password: false,
		confirmPassword: false,
	});

	const [error, setError] = useState({
		email: false,
		password: false,
		confirmPassword: false,
	});

	const [hiddenPass, setHiddenPass] = useState(true);
	const [hiddenConfirmPass, setHiddenConfirmPass] = useState(true);
	const [errorMsg, setErrorMsg] = useState(false);
	const [verifyPassword, setVerifyPassword] = useState(true);

	//Verifikasi password baru
	function handlePassword(event) {
		event.preventDefault();
		if (
			values.password !== "" &&
			values.password !== undefined &&
			values.password === values.confirmPassword
		) {
			// document.querySelector("#text-success-send").style.display =
			// 	"block";
			// document.querySelector("#text-number").style.display = "none";
			// document.querySelector("#field-code").style.display = "block";
			// document.querySelector("#text-valid").style.display = "block";
			// document.querySelector("#text-nocode").style.display = "block";
			// document.querySelector("#button-continue").style.display = "none";
			// document.querySelector("#button-verify").style.display = "block";
			// document.querySelector("#field-confirm-password").style.display =
			// 	"none";
			// document.querySelector("#field-password").style.display = "none";
			// setValues({...values, step: 3 });
		} else {
			if (values.password !== values.confirmPassword) {
				document.querySelector("#text-number").innerHTML =
					"Password doesn't match";
			} else {
				document.querySelector("#text-number").innerHTML =
					"Password may not be empty";
			}

			document.querySelector("#text-number").style.display = "block";
		}
	}

	//Verifikasi untuk ganti password
	function handleVerify(event) {
		event.preventDefault();
		document.querySelector("#text-number").style.display = "none";

		axios
			.post(ENV.API + `/v1/changePassword`, {
				email: values.email,
				password: values.password,
				sid: values.sid,
				code: values.code,
			})
			.then(async (response) => {
				if (response.data.success) {
					document.querySelector("#text-popup").innerHTML = "Hello "
						.concat(response.data.name)
						.concat("!");
					document.querySelector("#popup").style.display = "block";
				} else {
					document.querySelector("#text-number").innerHTML =
						"Wrong verification code";
					document.querySelector("#text-number").style.display =
						"block";
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	//Component untuk mengirimkan email
	function handleChange(e) {
		const { name, value } = e.target;
		if (value) {
			setFilled({
				...filled,
				[name]: true,
			});
		} else {
			setFilled({
				...filled,
				[name]: false,
			});
		}
		setValues({
			...values,
			[name]: value,
		});
		console.log(values);
	}

	function handleOnFocus(e) {
		const { name, value } = e.target;
		if (errorMsg) {
			if (name == "email") {
				setValues({
					...values,
					email: "",
				});
			}
		}
		setSelected({
			...selected,
			[name]: true,
		});
		setError({
			...error,
			[name]: false,
		});
		console.log(error);
	}

	function handleOnBlur(e) {
		const { name, value } = e.target;
		if (!value) {
			setFilled({
				...filled,
				[name]: false,
			});
		} else {
			setFilled({
				...filled,
				[name]: true,
			});
		}
		setSelected({
			...selected,
			[name]: false,
		});
	}

	function handleCodeChange(value) {
		setValues({ ...values, code: value });
		console.log(values.code.toString().length);
	}

	function handleSend(event) {
		event.preventDefault();
		axios
			.post(ENV.API + `/v1/sendotp`, { email: values.email })
			.then(async (response) => {
				if (response.data.success) {
					setValues({
						...values,
						sid: response.data.serviceSid,
					});
				} else {
					console.log(props);
					setErrorMsg(true);
					setError({
						...error,
						email: true,
					});
				}
			});
		// .catch((error) => {
		// 	console.log(error);
		// 	console.log("foo");
		// });
	}

	//Componenet untuk mengirim ulang verification code
	function handleResend() {
		// axios
		// 	.post(ENV.API + `/v1/sendotp`, { email: values.email })
		// 	.then(async (response) => {
		// 		if (response.data.success) {
		// 			setCountdown({
		// 				...countdown,
		// 				seconds: 59,
		// 			});
		// 			document.querySelector("#text-number").innerHTML =
		// 				"Successfully resend verification code";
		// 			document.querySelector("#text-number").style.display =
		// 				"block";
		// 			setValues({ ...values, sid: response.data.serviceSid });
		// 		} else {
		// 			document.querySelector("#text-number").innerHTML =
		// 				"Cannot resend verification code";
		// 			document.querySelector("#text-number").style.display =
		// 				"block";
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
		setCountdown({
			...countdown,
			seconds: 59,
		});
	}

	const [countdown, setCountdown] = useState({
		minutes: "00",
		seconds: 59,
	});

	useEffect(() => {
		if (step == "otp") {
			const counter = setTimeout(() => {
				if (countdown.seconds > 0) {
					setCountdown({
						...countdown,
						seconds: countdown.seconds - 1,
					});
				}
			}, 1000);
			return () => clearTimeout(counter);
		}
	});

	return (
		<>
			<Header />
			<NavBar navChildColor="#fff" navText="Homepage" endpoint="/index" />
			<RecoveryContainer>
				{step == "otp" && errorMsg ? (
					<ErrorDiv>Wrong Verification Code</ErrorDiv>
				) : null}
				<RecoveryForm
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}>
					<RecoveryFormInner>
						<center>
							<Heading>Account Recovery</Heading>
							{step == "email" && (
								<>
									<BelowHeading>
										Please enter your email address or phone
										number here to reset your password
									</BelowHeading>
								</>
							)}
							{step == "otp" && (
								<>
									<BelowHeading1>
										Enter the Verification Code
									</BelowHeading1>
									<BelowHeading>
										Transfree will send verification code to
										your email <b>{values.email}</b>
									</BelowHeading>
								</>
							)}
							{step == "password" && (
								<>
									<BelowHeading1>
										<b>Reset Your Password</b>
									</BelowHeading1>
									<BelowHeading step={step}>
										Create a new password for{" "}
										<b> {values.email} </b>
									</BelowHeading>
								</>
							)}
						</center>
						{step == "email" && (
							<>
								{selected.email ||
								(filled.email && !error.email) ? (
									<FormLabel
										errorMessage={errorMsg}
										filled={filled.email}
										selectedEmail={selected.email}>
										Email
									</FormLabel>
								) : null}
								<InputContainer
									selectedEmail={selected.email}
									error={error.email}
									errorMessage={errorMsg}
									filled={filled.email}>
									<FormInput
										type="email"
										name="email"
										value={values.email}
										required
										placeholder="e.g: timxx@gmail.com"
										error={error.email}
										onChange={handleChange}
										onFocus={handleOnFocus}
										onBlur={handleOnBlur}
									/>
								</InputContainer>
								{error.email || (!filled.email && errorMsg) ? (
									<ErrorText>
										{error.email &&
										!selected.email &&
										errorMsg
											? "Email is not registered"
											: "Email address cannot be blank"}
									</ErrorText>
								) : null}
							</>
						)}
						{step == "otp" && (
							<>
								<OtpInput
									value={values.code}
									onChange={(value) =>
										handleCodeChange(value)
									}
									numInputs={6}
									containerStyle="containerStyling"
									inputStyle={
										errorMsg
											? "inputStyling error"
											: values.code.toString().length == 6
											? "inputStyling filled"
											: "inputStyling"
									}
									isInputNum={true}
									focusStyle="focusStyling"
									shouldAutoFocus={true}
									hasErrored={errorMsg ? "true" : null}
									errorStyle="errorStyling"
								/>
								{countdown.seconds > 0 ? (
									<ResendCodeDiv>
										Resend in{" "}
										<b>
											{" "}
											{countdown.minutes}:
											{countdown.seconds < 10
												? "0"
												: null}
											{countdown.seconds}{" "}
										</b>
									</ResendCodeDiv>
								) : (
									<ResendCodeDiv>
										Not receiving code?{" "}
										<span onClick={handleResend}>
											Resend Code
										</span>
									</ResendCodeDiv>
								)}
							</>
						)}
						{step == "password" && (
							<>
								{selected.password ||
								(filled.password && !error.password) ? (
									<FormLabel
										error={errorMsg}
										errorMessage={!verifyPassword}
										filled={filled.password}
										selectedPass={selected.password}>
										New Password
									</FormLabel>
								) : null}
								<InputContainer
									selectedPass={selected.password}
									error={error.password}
									errorMessage={!verifyPassword}
									filled={filled.password}
									step={step}>
									<FormInput
										type={hiddenPass ? "password" : "text"}
										name="password"
										value={values.password}
										autoComplete="new-password"
										required
										placeholder="Password"
										error={error.password}
										onChange={handleChange}
										onFocus={handleOnFocus}
										onBlur={handleOnBlur}
									/>

									<EyeIcon>
										{hiddenPass ? (
											<FontAwesomeIcon
												onClick={() =>
													setHiddenPass(!hiddenPass)
												}
												icon={faEyeSlash}
											/>
										) : (
											<FontAwesomeIcon
												onClick={() =>
													setHiddenPass(!hiddenPass)
												}
												icon={faEye}
											/>
										)}
									</EyeIcon>
								</InputContainer>
								{error.password ||
								(!filled.password && !verifyPassword) ? (
									<ErrorText>
										{!verifyPassword &&
										!selected.password &&
										filled.password
											? "Password and confirmation password do not match"
											: "Password cannot be blank"}
									</ErrorText>
								) : null}
								{selected.confirmPassword ||
								(filled.confirmPassword &&
									!error.confirmPassword) ? (
									<FormLabel
										error={errorMsg}
										errorMessage={!verifyPassword}
										filled={filled.confirmPassword}
										selectedConfirmPassword={
											selected.confirmPassword
										}>
										Confirm New Password
									</FormLabel>
								) : null}
								<InputContainer
									selectedConfirmPassword={
										selected.confirmPassword
									}
									error={error.confirmPassword}
									errorMessage={!verifyPassword}
									filled={filled.confirmPassword}
									step={step}>
									<FormInput
										type={
											hiddenConfirmPass
												? "password"
												: "text"
										}
										name="confirmPassword"
										value={values.confirmPassword}
										autoComplete="new-password"
										required
										placeholder="Confirm New Password"
										error={error.confirmPassword}
										onChange={handleChange}
										onFocus={handleOnFocus}
										onBlur={handleOnBlur}
									/>
									<EyeIcon>
										{hiddenConfirmPass ? (
											<FontAwesomeIcon
												onClick={() =>
													setHiddenConfirmPass(
														!hiddenConfirmPass
													)
												}
												icon={faEyeSlash}
											/>
										) : (
											<FontAwesomeIcon
												onClick={() =>
													setHiddenConfirmPass(
														!hiddenConfirmPass
													)
												}
												icon={faEye}
											/>
										)}
									</EyeIcon>
								</InputContainer>
								{error.confirmPassword ||
								(!filled.confirmPassword && !verifyPassword) ? (
									<ErrorText>
										{!verifyPassword &&
										!selected.confirmPassword &&
										filled.confirmPassword
											? "Password and confirmation password do not match"
											: "Confirmation password cannot be blank"}
									</ErrorText>
								) : null}
							</>
						)}
						{step == "email" && (
							<Button
								// disabled={!values.email}
								onClick={handleSend}>
								Send
							</Button>
						)}
						{step == "otp" && (
							<Button
								// disabled={!values.email}
								onClick={() => setStep("password")}>
								Send
							</Button>
						)}
						{step == "password" && (
							<Button
							// disabled={!values.email}
							>
								Send
							</Button>
						)}
						<BelowButton>
							<span>Back to Login</span>
						</BelowButton>
					</RecoveryFormInner>
				</RecoveryForm>
			</RecoveryContainer>
			<style jsx global>{`
				.containerStyling {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 56px;
				}

				.inputStyling {
					font-size: 20px;
					line-height: 24px;
					color: #232933;
					font-weight: 700;
					width: 48px !important;
					height: 54px;
					margin: 4px;
					border: 1px solid #e2e2e2;
					border-radius: 4px;
				}
				.inputStyling.filled {
					color: #009fe3;
					border: 1px solid #009fe3;
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
		</>
	);
}

const RecoveryContainer = styled.div`
	min-height: 880px;
	width: 100%;
	display: flex;
	justify-content: center;
	background-image: url("../static/images/Batik_World_Map_1.png");
	background-repeat: no-repeat;
`;

const RecoveryForm = styled.form`
	width: 440px;
	min-height: 300px;
	height: fit-content;
	margin-top: 80px;
	background: #ffffff;
	box-shadow: 12px 20px 40px rgba(12, 12, 12, 0.1);
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const RecoveryFormInner = styled.div`
	width: 360px;
	display: flex;
	height: 100%;
	flex-direction: column;
`;

const Heading = styled.p`
	font-weight: bold;
	font-size: 32px;
	line-height: 38px;
	letter-spacing: -0.02em;
	color: #009fe3;
	margin-bottom: 32px;
`;

const BelowHeading1 = styled.div`
	font-size: 14px;
	font-weight: 700;
	line-height: 17px;
	text-align: center;
	letter-spacing: -0.02em;
	margin-bottom: 16px;
	color: #232933;

	p {
		margin: 0;
	}
`;

const BelowHeading = styled.div`
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	letter-spacing: -0.02em;
	margin-bottom: ${(props) => props.step && "8px"};

	color: #232933;

	p {
		margin: 0;
	}
`;

const ResendCodeDiv = styled.div`
	margin-top: 32px;
	font-weight: normal;
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	letter-spacing: -0.02em;
	color: #232933;

	span {
		color: #009fe3;
		text-decoration: underline;
		cursor: pointer;
	}
`;

const FormLabel = styled.label`
	font-size: 12px;
	text-align: start;
	margin-top: 32px;
	margin-bottom: -30px;
	margin-left: 2px;
	color: ${({
		errorMessage,
		selectedConfirmPassword,
		selectedEmail,
		selectedPass,
	}) => {
		if (selectedEmail || selectedPass || selectedConfirmPassword) {
			if (errorMessage) {
				return "#F80202";
			}
			return "#068EC8";
		} else {
			// no error
			if (selectedEmail || selectedPass || selectedConfirmPassword) {
				return "#068EC8";
			}
			return "#626B79";
		}
	}};
`;

const InputContainer = styled.div`
	margin-top: ${(props) => (props.step ? "16px" : "32px")};
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	width: 100%;
	background: #ffffff;
	border-radius: 4px;
	border: ${({
		selectedName,
		selectedPass,
		selectedConfirmPassword,
		selectedEmail,
		selectedPhone,
		error,
		errorMessage,
		filled,
	}) => {
		if (errorMessage) {
			if (filled && !error) {
				if (
					selectedEmail ||
					selectedPass ||
					selectedName ||
					selectedConfirmPassword ||
					selectedPhone
				) {
					return "2px solid #F80202";
				}
				return "1px solid #e2e2e2";
			} else if (
				selectedEmail ||
				selectedPass ||
				selectedName ||
				selectedConfirmPassword ||
				selectedPhone
			) {
				return "2px solid #F80202";
			}
			return "1px solid #FF0000";
		} else {
			// no error
			if (
				selectedEmail ||
				selectedPass ||
				selectedName ||
				selectedConfirmPassword ||
				selectedPhone
			) {
				return "2px solid #068EC8";
			} // filled
			return "1px solid #e2e2e2";
		}
	}};
	// "2px solid #068EC8" : "1px solid #e2e2e2"
`;

const FormInput = styled.input`
	outline: none;
	border: none;
	flex: 1;
	margin-left: 16px;
	margin-right: 16px;

	font-size: 16px;
	line-height: 24px;
	color: ${({ error }) => (error ? "#FF0000" : "#232933")};

	::placeholder {
		color: #b4b4b4;
	}

	&:focus ::placeholder {
		color: transparent;
	}

	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 30px white inset !important;
		box-shadow: 0 0 0 30px white inset !important;
		-webkit-text-fill-color: ${({ error }) =>
			error ? "#FF0000" : "#232933"};
	}
`;

const Button = styled.button`
	margin-top: 136px;
	margin-bottom: 16px;
	height: 40px;
	border-radius: 4px;
	background-color: ${(props) => (props.disabled ? "#F5F5F5" : "#009fe3")};
	color: ${(props) => (props.disabled ? "#B4B4B4" : "#FFFFFF")};
	font-size: 16px;
	font-weight: 500;
	outline: none;
	border: none;
	transition: 0.4s ease all;

	&:hover {
		background-color: ${(props) =>
			props.disabled ? "#F5F5F5" : "#068ec8"};
	}
`;

const BelowButton = styled.div`
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	letter-spacing: -0.02em;
	text-decoration-line: underline;
	margin-bottom: 32px;
	color: #009fe3;

	span {
		cursor: pointer;
	}
`;

const ErrorDiv = styled.div`
	background-color: #ff0000;
	width: 528px;
	height: 40px;
	margin-top: 20px;
	display: flex;
	color: #fff;
	font-weight: 500;
	font-size: 16px;
	letter-spacing: 0.2px;
	margin-bottom: -60px;
	line-height: 24px;
	align-items: center;
	justify-content: center;
`;

const ErrorText = styled.p`
	color: #ff0000;
	font-size: 12px;
	margin-top: 0px;
	margin-bottom: 0px;
`;

const EyeIcon = styled.div`
	height: 20px;
	width: 20px;
	margin-right: 16px;
`;

ForgotPassword.getInitialProps = async (ctx) => {
	initialize(ctx);
	return {};
};

const mapStateToProps = (state) => {
	return { errorMessage: state.authentication.errorMessage };
};

export default connect(mapStateToProps, actions)(ForgotPassword);

{
	/* <form
				className="form-container"
				>
				<p
					id="text-email"
					style={{ marginTop: "15px", marginBottom: "15px" }}>
					<b>{values.email}</b>
				</p>
				<p
					id="text-success-send"
					style={{ fontSize: 13, marginTop: "20px" }}>
					We have successfully sent the code
				</p>
				<p id="text-valid" style={{ fontSize: 13 }}>
					Your code valid for <b>60 seconds</b>
				</p>

				<input
					type="email"
					id="field-email"
					placeholder="Email"
					autoComplete="username"
					value={values.email}
					onChange={handleEmailChange}
				/>

				<input
					style={{ marginTop: 0 }}
					type="password"
					id="field-password"
					placeholder="Your Password"
					value={values.password}
					onChange={(e) =>
						setValues({ ...values, password: e.target.value })
					}
				/>

				<input
					style={{ marginTop: 0 }}
					type="password"
					id="field-confirm-password"
					placeholder="Confirm your password"
					value={values.confirmPassword}
					onChange={(e) =>
						setValues({
							...values,
							confirmPassword: e.target.value,
						})
					}
				/>

				<input
					style={{ marginTop: 0, textAlign: "center" }}
					type="text"
					id="field-code"
					placeholder="Enter 6-Digit Code"
					value={values.code}
					onChange={(e) =>
						setValues({ ...values, code: e.target.value })
					}
				/>

				<img
					id="img-tablet"
					src="../../static/images/forgot/tablet.svg"
				/>
				<p id="text-nocode" style={{ fontSize: 13 }}>
					No code showing on your email?
					<a
						href="#"
						onClick={handleResend}
						style={{ color: "#469DDD" }}>
						{" "}
						Resend Code
					</a>
				</p>
				<p id="text-send" style={{ fontSize: 13 }}>
					Transfree will send verification code to your email
				</p>
				<p id="text-number" style={{ fontSize: 13 }}>
					<b>{values.email}</b>
				</p>
				<button
					id="button-check"
					onClick={handleCheck}
					className="btn-primary">
					Check
				</button>
				<button
					id="button-send"
					onClick={handleSend}
					className="btn-primary">
					Send
				</button>
				<button
					id="button-continue"
					onClick={handlePassword}
					className="btn-primary">
					Continue
				</button>
				<button
					id="button-verify"
					onClick={handleVerify}
					className="btn-primary">
					Verify Code
				</button>
			</form>
			<div
				className="new-user-progress"
				style={{
					display: "flex",
					width: 435,
					justifyContent: "space-between",
				}}>
				<div style={{ width: "max-content" }}>
					<Progress step={values.step} />
				</div>
				<a
					style={{
						fontSize: 13,
						marginRight: "40%",
						marginTop: "10px",
					}}
					className="link"
					href="/login">
					{" "}
					&lt; Back to Login
				</a>
			</div>
			<style jsx>{`
          .form-container input{
            margin-bottom:20px;
            margin-top:50px;
          }

          @media only screen and (max-width: 414px) {
            .form-container input{
              margin-bottom:10px;
              margin-top:-10px;
            }

            .form-container label {
              font-size: 19px;
              text-transform: uppercase;
              display:flex;
              margin-top:20px;
              
            }

            .new-user-progress{
                width:380px !important;
            }
        `}</style> */
}
