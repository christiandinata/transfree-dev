import Link from "next/link";
import { useState, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { connect } from "react-redux";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import * as axios from "axios";
import ENV from "../config";
import Header from "../components/header";
import { NavBar } from "../components/MenuComponents";
import styled from "styled-components";
// import batik from "../static/images/Batik_World_Map_1.png";

//Component yang ditampilkan saat user memilih opsi forgot password
function Progress(props) {
	const items = [];

	for (let i = 1; i <= 3; i++) {
		if (i === props.step) {
			items.push(<img src="../../static/images/forgot/step1.svg" />);
		} else {
			items.push(<img src="../../static/images/forgot/step2.svg" />);
		}
	}

	return items;
}

function ForgotPassword(props) {
	const [values, setValues] = useState({
		email: "",
		step: 1,
		password: "",
		confirmPassword: "",
		code: "",
		sid: "",
	});

	useEffect(() => {
		// document.querySelector("#popup").style.display = "none";
		// document.querySelector("#text-valid").style.display = "none";
		// document.querySelector("#text-success-send").style.display = "none";
		// document.querySelector("#text-email").style.display = "none";
		// document.querySelector("#text-send").style.display = "none";
		// document.querySelector("#text-number").style.display = "none";
		// document.querySelector("#text-nocode").style.display = "none";
		// document.querySelector("#field-password").style.display = "none";
		// document.querySelector("#field-confirm-password").style.display =
		// 	"none";
		// document.querySelector("#field-code").style.display = "none";
		// document.querySelector("#button-send").style.display = "none";
		// document.querySelector("#button-continue").style.display = "none";
		// document.querySelector("#button-verify").style.display = "none";
	});
	// componentDidMount() {
	// document.querySelector("#popup").style.display = "none";
	// document.querySelector("#text-valid").style.display = "none";
	// document.querySelector("#text-success-send").style.display = "none";
	// document.querySelector("#text-email").style.display = "none";
	// document.querySelector("#text-send").style.display = "none";
	// document.querySelector("#text-number").style.display = "none";
	// document.querySelector("#text-nocode").style.display = "none";
	// document.querySelector("#field-password").style.display = "none";
	// document.querySelector("#field-confirm-password").style.display =
	// 	"none";
	// document.querySelector("#field-code").style.display = "none";
	// document.querySelector("#button-send").style.display = "none";
	// document.querySelector("#button-continue").style.display = "none";
	// document.querySelector("#button-verify").style.display = "none";
	// }

	function handleCheck(event) {
		event.preventDefault();
		axios
			.post(ENV.API + `/v1/checkNumber`, { email: values.email })
			.then(async (response) => {
				if (response.data.found) {
					document.querySelector("#text-send").style.display =
						"block";
					document.querySelector("#text-email").innerHTML = "<b>"
						.concat(response.data.email)
						.concat("</b>");
					document.querySelector("#text-number").style.display =
						"block";
					document.querySelector("#button-check").style.display =
						"none";
					document.querySelector("#button-send").style.display =
						"block";
				} else {
					document.querySelector("#text-number").innerHTML =
						"Account Not Found";
					document.querySelector("#text-number").style.display =
						"block";
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleSend(event) {
		event.preventDefault();
		axios
			.post(ENV.API + `/v1/sendotp`, { email: values.email })
			.then(async (response) => {
				if (response.data.success) {
					document.querySelector("#text-email").style.display =
						"block";
					document.querySelector("#text-number").style.display =
						"none";
					document.querySelector("#text-number").style.display =
						"none";
					document.querySelector("#button-continue").style.display =
						"block";
					document.querySelector("#button-send").style.display =
						"none";
					document.querySelector("#img-tablet").style.display =
						"none";
					document.querySelector("#text-send").style.display = "none";
					document.querySelector(
						"#field-confirm-password"
					).style.display = "block";
					document.querySelector("#field-email").style.display =
						"none";
					document.querySelector("#field-password").style.display =
						"block";
					setValues({
						...values,
						step: 2,
						sid: response.data.serviceSid,
					});
				} else {
					document.querySelector("#text-number").innerHTML =
						"Cannot send verification code";
					document.querySelector("#text-number").style.display =
						"block";
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

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
	function handleEmailChange(event) {
		setValues({ ...values, email: event.target.value });
	}

	//Componenet untuk mengirim ulang verification code
	function handleResend() {
		axios
			.post(ENV.API + `/v1/sendotp`, { email: values.email })
			.then(async (response) => {
				if (response.data.success) {
					document.querySelector("#text-number").innerHTML =
						"Successfully resend verification code";
					document.querySelector("#text-number").style.display =
						"block";
					setValues({ ...values, sid: response.data.serviceSid });
				} else {
					document.querySelector("#text-number").innerHTML =
						"Cannot resend verification code";
					document.querySelector("#text-number").style.display =
						"block";
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<>
			<Header />
			<NavBar />
			<RecoveryContainer>
				<RecoveryForm
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}>
					<RecoveryFormInner>
						<center>
							<Heading>Account Recovery</Heading>
							<BelowHeading>
								Please enter your email address or phone number
								here to reset your password
							</BelowHeading>
						</center>
						{/* {selected.name || (filled.name && !error.name) ? (
							<FormLabel
								filled={filled.name}
								selectedName={selected.name}>
								Name
							</FormLabel>
						) : null} */}
						<InputContainer
						// selectedName={selected.name}
						// filled={filled.name}
						>
							<FormInput
								// type="text"
								// name="name"
								// autoComplete="new-name"
								// value={values.name}
								// required
								// placeholder="Name"
								// error={error.name}
								onChange={handleEmailChange}
								// onFocus={handleOnFocus}
								// onBlur={handleOnBlur}
							/>
						</InputContainer>
						<Button disabled={!values.email}>Send</Button>
						<BelowButton>Back to Login</BelowButton>
					</RecoveryFormInner>
				</RecoveryForm>
			</RecoveryContainer>
		</>
	);
}

const RecoveryContainer = styled.div`
	min-height: 880px;
	width: 100%;
	display: flex;
	justify-content: center;
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
`;

const BelowHeading = styled.div`
	margin: 32px 0;
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	letter-spacing: -0.02em;

	color: #232933;

	p {
		margin: 0;
	}
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	width: 100%;
	background: #ffffff;
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
	border-radius: 4px;
	margin-bottom: 1rem;
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
	margin-top: 50px;
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

const BelowButton = styled.a`
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	letter-spacing: -0.02em;
	text-decoration-line: underline;
	margin-bottom: 32px;
	color: #009fe3;
`;

ForgotPassword.getInitialProps = async (ctx) => {
	initialize(ctx);
	return {};
};

const mapStateToProps = (state) => {
	return {};
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
