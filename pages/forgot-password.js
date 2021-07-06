import { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import * as axios from "axios";
import ENV from "../config";
import Header from "../components/header";
import { NavBarBlue } from "../components/MenuComponents";
import styled from "styled-components";
import OtpInput from "react-otp-input";

//Component yang ditampilkan saat user memilih opsi forgot password
function ForgotPassword(props) {
	const Router = useRouter();
	// states used in this page
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

	// function that handles form inputs
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

	// function to send an otp code to your email
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
					setStep("otp");
					setErrorMsg(false);
				} else {
					setStep(step);
					console.log(props);
					setErrorMsg(true);
					setError({
						...error,
						email: true,
					});
				}
			});
	}

	//Verifikasi untuk ganti password
	function handleVerify(event) {
		if (values.password != values.confirmPassword) {
			event.preventDefault();
			setVerifyPassword(false);
			setError({
				...error,
				password: true,
				confirmPassword: true,
			});
		} else {
			event.preventDefault();
			setVerifyPassword(true);
			axios
				.post(ENV.API + `/v1/changePassword`, {
					email: values.email,
					password: values.password,
					sid: values.sid,
					code: values.code,
				})
				.then(async (response) => {
					if (response.data.success) {
						setStep("success");
						setErrorMsg(false);
					} else {
						setStep("otp");
						setErrorMsg(true);
						setError({
							...error,
							email: true,
							password: false,
							confirmPassword: false,
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	//Componenet untuk mengirim ulang verification code
	function handleResend() {
		axios
			.post(ENV.API + `/v1/sendotp`, { email: values.email })
			.then(async (response) => {
				if (response.data.success) {
					setCountdown({
						...countdown,
						seconds: 59,
					});
					setValues({ ...values, sid: response.data.serviceSid });
					setErrorMsg(false);
				} else {
					setStep(step);
					setErrorMsg(true);
					setError({
						...error,
						email: true,
					});
				}
			});
	}

	const [countdown, setCountdown] = useState({
		minutes: "00",
		seconds: 59,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [step]);

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
		} else {
			countdown.seconds = 59;
		}
	});

	return (
		<>
			<Header />
			<NavBarBlue
				navChildColor="#fff"
				navText="Account"
				endpoint="/account"
			/>
			{step == "otp" && errorMsg ? (
				<ErrorDiv>
					<ErrorDivInner>Wrong Verification Code</ErrorDivInner>
				</ErrorDiv>
			) : null}
			<RecoveryContainer>
				<RecoveryForm
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}>
					<RecoveryFormInner>
						<center>
							{step != "success" ? (
								<Heading className="bold">
									Account Recovery
								</Heading>
							) : (
								<SuccessHeading>
									Account Recovery Success
								</SuccessHeading>
							)}

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
									<BelowHeading step="otp">
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
									focusStyle={
										errorMsg ? "focusError" : "focusStyling"
									}
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
						{step == "success" && (
							<>
								<center>
									<FontAwesomeIcon
										icon={faCheckCircle}
										style={{
											color: "green",
											width: 48,
											height: 48,
											marginTop: 32,
											marginBottom: 32,
										}}
									/>
								</center>
								<SuccessText>
									Successfully reset password for account with
									email <b>{values.email}</b>
								</SuccessText>
							</>
						)}
						{step == "email" && (
							<Button
								disabled={!values.email}
								onClick={handleSend}>
								Send
							</Button>
						)}
						{step == "otp" && (
							<Button
								disabled={!values.code}
								step="otp"
								onClick={() => setStep("password")}>
								Send
							</Button>
						)}
						{step == "password" && (
							<Button
								disabled={
									!values.password && !values.confirmPassword
								}
								error={error.password || error.confirmPassword}
								onClick={handleVerify}>
								Send
							</Button>
						)}
						{step != "success" ? (
							<BelowButton>
								<span onClick={() => Router.push("/login")}>
									Back to Login
								</span>
							</BelowButton>
						) : (
							<Button
								type="submit"
								success={true}
								onClick={() => Router.push("/login")}>
								Login
							</Button>
						)}
					</RecoveryFormInner>
				</RecoveryForm>
			</RecoveryContainer>
			<CopyrightDiv>
				Transfree © Copyright {new Date().getFullYear()}. All rights
				reserved.
			</CopyrightDiv>
			<style jsx global>{`
				.containerStyling {
					display: flex;
					justify-content: center;
					align-items: center;
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
				.inputStyling.error {
					color: #ff0000;
					font-weight: 700;
				}
				.inputStyling.filled {
					color: #009fe3;
					border: 1px solid #009fe3;
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
	margin-top: 32px;
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
	margin-bottom: ${(props) => {
		if (props.step == "email") {
			return "32px";
		} else if (props.step == "otp") {
			return "56px";
		} else {
			return "24px";
		}
	}};

	color: #232933;

	p {
		margin: 0;
	}
`;

const SuccessHeading = styled.p`
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: -0.02em;
	margin-top: 32px;
	margin-bottom: 0;
	color: #009fe3;
`;

const SuccessText = styled.div`
	font-weight: normal;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	letter-spacing: -0.02em;

	color: #626b79;
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
	margin-bottom: 4px;
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
	margin-bottom: 16px;
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
	margin-top: ${(props) => {
		if (props.success) {
			return "40px";
		} else if (props.step == "otp") {
			return "136px";
		} else {
			return "120px";
		}
	}};
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
	position: absolute;
	width: 100%;
	height: 40px;
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: -60px;
	line-height: 24px;
`;

const ErrorDivInner = styled.div`
	background-color: #ff0000;
	width: 528px;
	height: 40px;
	display: flex;
	color: #fff;
	font-weight: 500;
	font-size: 16px;
	letter-spacing: 0.2px;
	align-items: center;
	justify-content: center;
`;

const ErrorText = styled.p`
	color: #ff0000;
	font-size: 12px;
	margin-top: -12px;
	margin-bottom: 16px;
`;

const EyeIcon = styled.div`
	height: 20px;
	width: 20px;
	margin-right: 16px;
`;

const CopyrightDiv = styled.div`
	width: 100%;
	height: 72px;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	text-align: center;
	letter-spacing: 0.2px;
	color: #232933;
`;

ForgotPassword.getInitialProps = async (ctx) => {
	initialize(ctx);
	return {};
};

const mapStateToProps = (state) => {
	return { errorMessage: state.authentication.errorMessage };
};

export default connect(mapStateToProps, actions)(ForgotPassword);
