import Link from "next/link";
import { useState, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { connect } from "react-redux";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import * as axios from "axios";
import ENV from "../config";
import Header from "../components/header";

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
		document.querySelector("#popup").style.display = "none";
		document.querySelector("#text-valid").style.display = "none";
		document.querySelector("#text-success-send").style.display = "none";
		document.querySelector("#text-email").style.display = "none";
		document.querySelector("#text-send").style.display = "none";
		document.querySelector("#text-number").style.display = "none";
		document.querySelector("#text-nocode").style.display = "none";
		document.querySelector("#field-password").style.display = "none";
		document.querySelector("#field-confirm-password").style.display =
			"none";
		document.querySelector("#field-code").style.display = "none";
		document.querySelector("#button-send").style.display = "none";
		document.querySelector("#button-continue").style.display = "none";
		document.querySelector("#button-verify").style.display = "none";
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
			<div id="popup" className="popup" style={{ display: "none" }}>
				<div className="popup_inner">
					<h1 id="text-popup"></h1>
					<p>Your password has been changed successfully</p>
					<button
						className="btn-popup"
						onClick={() => {
							window.location = "/login";
						}}>
						OK
					</button>
				</div>
			</div>
			<style jsx>
				{`
					.popup-mobile {
						display: none;
					}
					.btn-popup {
						border: 2px solid #5bb7de;
						color: #ffffff;
						padding: 5px 23px 5px 23px;
						text-align: center;
						text-decoration: none;
						font-size: 18px;
						border-radius: 24px;
						transition: all 0.2s ease;
						margin-left: 10px;
						background: #5bb7de;
						font-weight: 700;
						width: 120px;
					}

					.buttonPopUp {
						display: flex;
						flex-direction: row;
						margin-top: 30px;
					}
					.popup,
					.popup-mobile {
						position: fixed;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						background-color: rgba(0, 0, 0, 0.5);
					}
					.popup_inner {
						position: absolute;
						left: 20%;
						right: 20%;
						top: 15%;
						margin: auto;
						height: auto;
						width: auto;
						border-radius: 20px;
						background: white;
						text-align: center;
						padding: 1% 0 1% 0;
						display: flex;
						flex-direction: column;

						align-items: center;
					}
					.popup-inner-mobile {
						position: absolute;
						left: 20%;
						right: 20%;
						top: 25%;
						margin: auto;
						height: auto;
						width: auto;
						display: flex;
						flex-direction: column;

						align-items: center;
					}
					h1 {
						color: #5bb7de;
						font-weight: 700;
						font-size: 1.3em;
					}
					h2 {
						margin: 0px;
						padding: 0px;
						text-align: center;
						font-weight: 700;
						color: #000000;
						font-size: 1em;
						margin-bottom: 2%;
					}
					p {
						margin: 0px;
						padding: 0px;
						font-size: 0.8em;
						color: #000000;
					}

					.popup {
						display: flex;
					}

					.form-container,
					.box-title {
						border-radius: 0px;
					}

					@media only screen and (max-width: 414px) {
						.popup_inner {
							left: 10%;
							right: 10%;
						}

						.popup {
							display: none;
						}

						.popup-mobile {
							display: flex;
						}

						.btn-popup-error,
						.btn-popup-verify {
							border: 2px solid #5bb7de;
							color: #ffffff;
							padding: 5px 20px 5px 20px;
							text-align: center;
							text-decoration: none;
							font-size: 18px;
							border-radius: 18px;
							transition: all 0.2s ease;

							background: #5bb7de;
							font-weight: 700;
						}

						.btn-popup-error {
							background: #ea5252;
							border: 2px solid #ea5252;

							margin-left: 15%;
						}

						.btn-popup-verify {
							margin-left: 25%;
						}

						.form-container {
							padding: 15% 5%;
						}
					}
				`}
			</style>
			<div className="logo">
				<Link href="/">
					<a>
						<img
							src="../static/images/transfree-logo.png"
							alt="Logo"
						/>
					</a>
				</Link>
			</div>
			<div className="box-title">Account Recovery</div>
			<form
				className="form-container"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
					}
				}}>
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
        `}</style>
		</>
	);
}

ForgotPassword.getInitialProps = async (ctx) => {
	initialize(ctx);
	return {};
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, actions)(ForgotPassword);
