import Link from "next/link";
import { connect } from "react-redux";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FormContainer, Form } from "../components/FormComponents";
import styled from "styled-components";
import Header from "../components/header.js";
import { useState, useEffect } from "react";
import { set } from "react-ga";
import Footer from "../components/footer";
import { NavBar } from "../components/MenuComponents";

//Component untuk login
function Login(props) {
	const [selected, setSelected] = useState({
		email: false,
		password: false,
	});

	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const [filled, setFilled] = useState({
		email: false,
		password: false,
	});

	const [error, setError] = useState(false);
	const [hiddenPass, setHiddenPass] = useState(true);
	// constructor({ props }) {
	// 	super(props);
	// 	this.state = {
	// 		email: "",
	// 		password: "",
	// 		hiddenPass: false,
	// 		selected: false,
	// 	};

	// 	this.togglePassShow = this.togglePassShow.bind(this);
	// }

	function handleOnFocus(e) {
		const { name, value } = e.target;
		if (props.errorMessage) {
			setValues({
				...values,
				[name]: "",
			});
		}
		setSelected({
			...selected,
			[name]: true,
		});
		setError(false);
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
	}

	function togglePassShow() {
		setHiddenPass(!hiddenPass);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.authenticate(
			{ email: values.email, password: values.password },
			"login"
		);
	}

	useEffect(() => {
		if (props.errorMessage) {
			setError(true);
			console.log(error);
		}
	}, [props.errorMessage]);

	return (
		<>
			<Header />
			<NavBar navChildColor="#fff" navText="Homepage" endpoint="/index" />
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<FormInner>
						<center>
							<Heading>Welcome back</Heading>
							<BelowHeading>
								New user ?{" "}
								<Link href="/signup">
									<a>Register</a>
								</Link>
							</BelowHeading>
						</center>
						{selected.email || (filled.email && !error) ? (
							<FormLabel
								errorMessage={props.errorMessage}
								filled={filled.email}
								selectedEmail={selected.email}>
								Email
							</FormLabel>
						) : null}
						<InputContainer
							selectedEmail={selected.email}
							error={error}
							errorMessage={props.errorMessage}
							filled={filled.email}>
							<FormInput
								type="email"
								name="email"
								value={values.email}
								required
								placeholder="Email"
								error={error}
								onChange={handleChange}
								onFocus={handleOnFocus}
								onBlur={handleOnBlur}
							/>
						</InputContainer>
						{error || (!filled.email && props.errorMessage) ? (
							<ErrorText>
								{error && !selected.email
									? "Invalid username"
									: "Email cannot be blank"}
							</ErrorText>
						) : null}
						{selected.password || (filled.password && !error) ? (
							<FormLabel
								errorMessage={props.errorMessage}
								filled={filled.password}
								selectedPass={selected.password}>
								Password
							</FormLabel>
						) : null}
						<InputContainer
							selectedPass={selected.password}
							error={error}
							errorMessage={props.errorMessage}
							filled={filled.password}>
							<FormInput
								type={hiddenPass ? "password" : "text"}
								name="password"
								value={values.password}
								required
								placeholder="Password"
								error={error}
								onChange={handleChange}
								onFocus={handleOnFocus}
								onBlur={handleOnBlur}
							/>

							<EyeIcon>
								{hiddenPass ? (
									<FontAwesomeIcon
										onClick={togglePassShow}
										icon={faEyeSlash}
									/>
								) : (
									<FontAwesomeIcon
										onClick={togglePassShow}
										icon={faEye}
									/>
								)}
							</EyeIcon>
						</InputContainer>
						{error || (!filled.password && props.errorMessage) ? (
							<ErrorText>
								{error && !selected.password
									? "Invalid password"
									: "Password cannot be blank"}
							</ErrorText>
						) : null}
						<p className="forgot-password">
							<Link href="/forgot-password">
								<a>Forgot password ?</a>
							</Link>
						</p>
						<Button type="submit">
							{props.inProgress ? (
								<FontAwesomeIcon
									icon="sync-alt"
									spin
									style={{ width: 25, height: 25 }}
								/>
							) : (
								"Sign In"
							)}
						</Button>
					</FormInner>
				</Form>
			</FormContainer>
			<style jsx>{`
				.forgot-password {
					text-align: end;
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

const BelowHeading = styled.p`
	font-size: 14px;
	line-height: 20px;
	margin-bottom: 40px;
	color: #232933;
`;

const FormLabel = styled.label`
	font-size: 12px;
	text-align: start;
	margin-bottom: 2px;
	margin-left: 2px;
	color: ${({ error, errorMessage, filled, selectedEmail, selectedPass }) => {
		if (selectedEmail || selectedPass) {
			if (errorMessage) {
				return "#F80202";
			}
			return "#068EC8";
		} else {
			// no error
			if (selectedEmail || selectedPass) {
				return "#068EC8";
			}
			return "#626B79";
		}
	}};
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	width: 100%;
	background: #ffffff;
	border: ${({
		selectedPass,
		selectedEmail,
		error,
		errorMessage,
		filled,
	}) => {
		if (errorMessage) {
			if (filled && !error) {
				if (selectedEmail || selectedPass) {
					return "2px solid #F80202";
				}
				return "1px solid #e2e2e2";
			} else if (selectedEmail || selectedPass) {
				return "2px solid #F80202";
			}
			return "1px solid #FF0000";
		} else {
			// no error
			if (selectedEmail || selectedPass) {
				return "2px solid #068EC8";
			} // filled
			return "1px solid #e2e2e2";
		}
	}};
	// "2px solid #068EC8" : "1px solid #e2e2e2"
	border-radius: 4px;
	margin-bottom: 1rem;
`;

const ErrorText = styled.p`
	color: #ff0000;
	font-size: 12px;
	margin-top: -15px;
	margin-bottom: 13px;
`;

const EyeIcon = styled.div`
	height: 20px;
	width: 20px;
	margin-right: 16px;
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

	&:hover {
		background-color: #068ec8;
	}
`;

Login.getInitialProps = async (ctx) => {
	initialize(ctx);
	return {};
};

const mapStateToProps = (state) => {
	return {
		inProgress: state.authentication.inProgress,
		errorMessage: state.authentication.errorMessage,
	};
};

export default connect(mapStateToProps, actions)(Login);

/* <form
					className="form-container"
					onSubmit={this.handleSubmit.bind(this)}>
					<div className="box-title">Welcome back</div>
					<p style={{ marginBottom: "15%", color: "grey" }}>
						New user?
						<a
							href="/signup"
							className="link"
							style={{ marginLeft: 10 }}>
							Register
						</a>
					</p>
					<label htmlFor="email">Email</label>
					<br />
					<input
						type="email"
						id="email"
						placeholder="Email"
						required
						onInvalid="deadkaed"
						value={this.state.email}
						onChange={(e) =>
							this.setState({ email: e.target.value })
						}
					/>

					<label htmlFor="email">Password</label>
					<br />
					<div className="pass-wrapper">
						<input
							type={this.state.hiddenPass ? "text" : "password"}
							id="password"
							placeholder="Password"
							autoComplete="new-password"
							value={this.state.password}
							onChange={(e) =>
								this.setState({ password: e.target.value })
							}
						/>
						<i onClick={this.togglePassShow}>{eye}</i>
					</div>
					<p style={{ textAlign: "end", marginBottom: "2px" }}>
						<Link href="/forgot-password">
							<a className="link">Forgot password ?</a>
						</Link>
					</p>

					<button type="submit" className="btn-primary">
						{this.props.inProgress ? (
							<FontAwesomeIcon
								icon="sync-alt"
								spin
								style={{ width: 40, height: 40 }}
							/>
						) : (
							"Log in"
						)}
					</button>
				</form>

				<div className="bottom">
					<h1>
						<Link href="/forgot-password">
							<a className="link">Forgot Password? </a>
						</Link>
					</h1>
					<p>
						Don't you have an account?
						<a className="link" href="/signup">
							{" "}
							Sign up
						</a>
					</p>
				</div> */

/* <div
					className={
						"error-container " +
						(this.props.errorMessage != "" &&
						this.props.errorMessage != undefined
							? "error-show"
							: "")
					}>
					{this.props.errorMessage}
				</div> */

/* <p>
					<a style={{ fontSize: 13 }} className="link" href="/">
						{" "}
						&lt; Back to Home
					</a>
				</p> */

/* <style jsx>{`
					.form-container {
						background: #fff;
					}

					.form-container input {
						margin-bottom: 15px;
					}

					i {
						margin-top: 5%;
					}

					span {
						float: left;
					}

					.pass-wrapper {
						margin-top: 0px;
					}

					.btn-primary {
						margin-top: 50px;
					}

					.bottom {
						display: none;
					}

					.form-container > label {
						display: none;
					}

					p > a {
						margin: 0px;
						font-weight: 510;
						font-color: #5bb7de;
						-webkit-text-stroke: 0.5px #5bb7de;
					}
					@media only screen and (max-width: 414px) {
						.logo > a > img {
							display: none;
						}

						.error-container {
							margin-top: 10% !important;
						}

						i {
							position: absolute;
							top: 0%;
							right: 6%;
							// width:10px;
						}

						.form-container p {
							display: none;
						}

						.bottom {
							// margin-bottom:200px;
							display: flex;
							flex-direction: column;
						}

						.bottom p {
							color: #ffffff;
							font-size: 20px;
							font-family: "Open Sans", sans-serif;
							display: flex;
							margin-top: 25px;
							// font-weight:700;
						}

						.bottom h1 > a {
							color: #ffffff;
							font-size: 23px;
							font-family: "Open Sans", sans-serif;
							font-weight: 900;
							text-decoration: none;
						}

						.form-container {
							padding: 40px 15px 40px 15px;
						}

						.form-container input {
							// margin-bottom:60px;
							font-size: 18px;
						}

						.form-container label {
							font-size: 19px;
							text-transform: uppercase;
							display: flex;
							margin-bottom: -10px;
						}

						.form-container input,
						.form-container textarea {
							margin-bottom: 17px;
						}

						h1 {
							color: #000000;
							font-size: 23px;
							font-family: "Open Sans", sans-serif;
							font-weight: 700;
							margin-bottom: 0px;
						}

						p {
							display: none;
						}

						.link {
							text-decoration: none;
							color: #ffffff;
							font-weight: 700;
							font-size: 20px;
						}

						// .error-container{
						//   margin-top:120px;
						// }
					}
				`}</style> */
