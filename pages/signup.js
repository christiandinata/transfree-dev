import Link from "next/link";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import PhoneInput from "react-phone-number-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
import Header from "../components/header";
import { Form, FormContainer } from "../components/FormComponents";
import styled from "styled-components";
import Footer from "../components/footer";
import { NavBar } from "../components/MenuComponents";

//Menerima Argumen dari luar
function Signup(props) {
	// this.togglePassShow = this.togglePassShow.bind(this);
	// this.toggleConfirmShow = this.toggleConfirmShow.bind(this);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		confirmPassword: "",
	});

	const [selected, setSelected] = useState({
		name: false,
		email: false,
		password: false,
		confirmPassword: false,
		phone: false,
	});

	const [filled, setFilled] = useState({
		name: false,
		email: false,
		password: false,
		confirmPassword: false,
		phone: false,
	});
	// ada 3 case error (email, password, phone number)
	const [error, setError] = useState({
		name: false,
		email: false,
		password: false,
		confirmPassword: false,
		phone: false,
	});

	const [hiddenPass, setHiddenPass] = useState(true);
	const [hiddenConfirmPass, setHiddenConfirmPass] = useState(true);
	const [verifyPassword, setVerifyPassword] = useState(true);
	const [isInvalidFullName, setIsInvalidFullName] = useState(false);

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
		if (props.errorMessage?.includes("email")) {
			if (name == "email") {
				setValues({
					...values,
					email: "",
				});
			}
		} else if (!verifyPassword) {
			if (name == "password") {
				setValues({
					...values,
					password: "",
				});
			} else if (name == "confirmPassword") {
				setValues({
					...values,
					confirmPassword: "",
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

	function handlePhoneChange(value) {
		if (value) {
			setFilled({
				...filled,
				phone: true,
			});
		} else {
			setFilled({
				...filled,
				phone: false,
			});
		}
		setValues({
			...values,
			phone: value,
		});
		console.log(value, values);
	}

	function handlePhoneOnFocus(value) {
		if (props.errorMessage?.includes("phone")) {
			setValues({
				...values,
				phone: "",
			});
		}
		setSelected({
			...selected,
			phone: true,
		});
		setError({
			...error,
			phone: false,
		});
		console.log(error);
	}

	function handlePhoneOnBlur(value) {
		if (!value) {
			setFilled({
				...filled,
				phone: false,
			});
		} else {
			setFilled({
				...filled,
				phone: true,
			});
		}
		setSelected({
			...selected,
			phone: false,
		});
	}

	function togglePassShow() {
		setHiddenPass(!hiddenPass);
	}

	//
	// function handlePassword() {
	// 	if (values.password != values.confirmPassword) {
	// 		setVerifyPassword(false);
	// 	}
	// }

	//Mengumpulkan state react
	function handleSubmit(e) {
		e.preventDefault();
		if (values.password != values.confirmPassword) {
			setVerifyPassword(false);
			setError({
				...error,
				password: true,
				confirmPassword: true,
			});
		} else {
			e.preventDefault();
			setVerifyPassword(true);
			props.verify(
				{
					phone: values.phone,
					email: values.email,
					fullname: values.name,
					password: values.password,
				},
				"verify"
			);
			console.log(props.errorMessage);
		}
	}

	useEffect(() => {
		if (props.errorMessage?.includes("email")) {
			setError({
				...error,
				email: true,
			});
			console.log(props.errorMessage);
		}
		if (props.errorMessage?.includes("phone")) {
			setError({
				...error,
				phone: true,
			});
			console.log(props.errorMessage);
		}
	}, [props.errorMessage]);

	// handleSubmit(e) {
	//   e.preventDefault();
	//   this.props.authenticate(
	//     { email: this.state.email, password: this.state.password },
	//     'login'
	//   );
	// }

	//Memunculkan tulisan dan gambar dibawah
	return (
		<>
			<Header />
			<NavBar navChildColor="#fff" navText="Homepage" endpoint="/index" />
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<FormInner>
						<center>
							<Heading>Welcome to Transfree</Heading>
							<BelowHeading>
								Already have an account ?{" "}
								<Link href="/login">
									<a>Login</a>
								</Link>
							</BelowHeading>
						</center>
						{selected.name || (filled.name && !error.name) ? (
							<FormLabel
								// errorMessage={props.errorMessage}
								filled={filled.name}
								selectedName={selected.name}>
								Name
							</FormLabel>
						) : null}
						<InputContainer
							selectedName={selected.name}
							// error={error.name}
							// errorMessage={error.name}
							filled={filled.name}>
							<FormInput
								type="text"
								name="name"
								autoComplete="new-name"
								value={values.name}
								required
								placeholder="Name"
								error={error.name}
								onChange={handleChange}
								onFocus={handleOnFocus}
								onBlur={handleOnBlur}
							/>
						</InputContainer>
						{/* {error.name ||
						(!filled.name &&
							(props.errorMessage || !verifyPassword)) ? (
							<ErrorText>
								{(!filled.name || !selected.name) &&
									"Name cannot be blank"}
							</ErrorText>
						) : null} */}
						{selected.email || (filled.email && !error.email) ? (
							<FormLabel
								errorMessage={props.errorMessage?.includes(
									"email"
								)}
								filled={filled.email}
								selectedEmail={selected.email}>
								Email
							</FormLabel>
						) : null}
						<InputContainer
							selectedEmail={selected.email}
							error={error.email}
							errorMessage={props.errorMessage?.includes("email")}
							filled={filled.email}>
							<FormInput
								type="email"
								name="email"
								value={values.email}
								autoComplete="new-email"
								required
								placeholder="Email"
								error={error.email}
								onChange={handleChange}
								onFocus={handleOnFocus}
								onBlur={handleOnBlur}
							/>
						</InputContainer>
						{error.email || (!filled.email && !verifyPassword) ? (
							<ErrorText>
								{error.email && !selected.email && null}
							</ErrorText>
						) : null}
						{error.email ||
						(!filled.email &&
							props.errorMessage?.includes("email")) ? (
							<ErrorText>
								{error.email &&
								!selected.email &&
								props.errorMessage?.includes("email")
									? "Email is already registered"
									: "Email address cannot be blank"}
							</ErrorText>
						) : null}
						{selected.password ||
						(filled.password && !error.password) ? (
							<FormLabel
								error={props.errorMessage}
								errorMessage={!verifyPassword}
								filled={filled.password}
								selectedPass={selected.password}>
								Password
							</FormLabel>
						) : null}
						<InputContainer
							selectedPass={selected.password}
							error={error.password}
							errorMessage={!verifyPassword}
							filled={filled.password}>
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
						{/* {error.password ||
						(!filled.password && props.errorMessage) ? (
							<ErrorText>
								{!selected.password && filled.password
									? null
									: "Password cannot be blank"}
							</ErrorText>
						) : null} */}
						{selected.confirmPassword ||
						(filled.confirmPassword && !error.confirmPassword) ? (
							<FormLabel
								error={props.errorMessage}
								errorMessage={!verifyPassword}
								filled={filled.confirmPassword}
								selectedConfirmPassword={
									selected.confirmPassword
								}>
								Confirm Password
							</FormLabel>
						) : null}
						<InputContainer
							selectedConfirmPassword={selected.confirmPassword}
							error={error.confirmPassword}
							errorMessage={!verifyPassword}
							filled={filled.confirmPassword}>
							<FormInput
								type={hiddenConfirmPass ? "password" : "text"}
								name="confirmPassword"
								value={values.confirmPassword}
								autoComplete="new-password"
								required
								placeholder="Confirm Password"
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
						{/* {error.confirmPassword ||
						(!filled.confirmPassword && props.errorMessage) ? (
							<ErrorText>
								{!selected.confirmPassword &&
								filled.confirmPassword
									? null
									: "Confirmation password cannot be blank"}
							</ErrorText>
						) : null} */}
						{selected.phone || (filled.phone && !error.phone) ? (
							<FormLabel
								errorMessage={props.errorMessage?.includes(
									"phone"
								)}
								filled={filled.phone}
								selectedPhone={selected.phone}>
								Phone
							</FormLabel>
						) : null}
						<InputContainer
							selectedPhone={selected.phone}
							error={error.phone}
							errorMessage={props.errorMessage?.includes("phone")}
							filled={filled.phone}>
							<InputPhone
								placeholder="Phone"
								autoComplete="new-phone"
								// country="ID"
								className={error.phone ? "phone-error" : null}
								required
								error={props.errorMessage?.includes("phone")}
								value={values.phone}
								onChange={(value) => handlePhoneChange(value)}
								onFocus={(value) => handlePhoneOnFocus(value)}
								onBlur={(value) => handlePhoneOnBlur(value)}
							/>
						</InputContainer>
						{error.phone ||
						(!filled.phone &&
							props.errorMessage?.includes("phone")) ? (
							<ErrorText>
								{error.phone &&
								!selected.phone &&
								props.errorMessage?.includes("phone")
									? "Phone number is already registered"
									: "Phone number cannot be blank"}
							</ErrorText>
						) : null}
						<Button type="submit">
							{props.inProgress ? (
								<FontAwesomeIcon
									icon="sync-alt"
									spin
									style={{ width: 25, height: 25 }}
								/>
							) : (
								"Continue"
							)}
						</Button>
					</FormInner>
				</Form>
			</FormContainer>
			<style jsx global>{`
				.phone-error .react-phone-number-input__input {
					color: red;
				}
				.react-phone-number-input__input {
					padding: 0;
					height: 48px;
					border: none;
					font-family: "Avenir LT Pro", sans-serif;
					font-size: 16px;
				}

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
	color: ${({
		errorMessage,
		selectedName,
		selectedConfirmPassword,
		selectedEmail,
		selectedPass,
		selectedPhone,
	}) => {
		if (
			selectedEmail ||
			selectedPass ||
			selectedName ||
			selectedConfirmPassword ||
			selectedPhone
		) {
			if (errorMessage) {
				return "#F80202";
			}
			return "#068EC8";
		} else {
			// no error
			if (
				selectedEmail ||
				selectedPass ||
				selectedName ||
				selectedConfirmPassword ||
				selectedPhone
			) {
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

const InputPhone = styled(PhoneInput)`
	&&& {
		flex: 1;
		border: none;
		outline: none;
		font-size: 16px;
		line-height: 24px;
		margin-left: 16px;
		margin-right: 16px;
		height: 48px;
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

Signup.getInitialProps = async (ctx) => {
	initialize(ctx);

	return {};
};

const mapStateToProps = (state) => {
	return {
		inProgress: state.authentication.inProgress,
		errorMessage: state.authentication.errorMessage,
	};
};

//Mengirimkan signup
export default connect(mapStateToProps, actions)(Signup);

{
	/* <div className="logo">
				<Link href="/">
					<a>
						<img
							src="../static/images/transfree-logo.png"
							alt="Logo"
						/>
					</a>
				</Link>
			</div> */
}
{
	/* <h1>Register</h1> */
}
// <div
// 	className={
// 		"error-container " +
// 		(this.props.errorMessage != "" &&
// 		this.props.errorMessage != undefined
// 			? "error-show"
// 			: "")
// 	}>
// 	{this.props.errorMessage}
// </div>
// <div
// 	className={
// 		"error-container " +
// 		(this.props.errorMessage != " " &&
// 		this.state.verifyPassword == false
// 			? "error-show"
// 			: "")
// 	}>
// 	Password and Confirm Password not match
// </div>
// <div className="box-title">Register</div>
// <form
// 	className="form-container"
// 	onSubmit={this.handleSubmit.bind(this)}>
// 	<h1 style={{ marginTop: 10, textAlign: "center" }}>Join us</h1>
// 	<p
// 		style={{
// 			marginTop: -10,
// 			fontSize: 13,
// 			color: "grey",
// 			opacity: "66%",
// 		}}>
// 		Already have an Account?{" "}
// 		<a className="link" href="/login">
// 			Log In
// 		</a>
// 	</p>
// 	<label htmlFor="email">FULL NAME</label>
// 	<input
// 		type="text"
// 		id="name"
// 		placeholder="Full Name"
// 		required
// 		value={this.state.name}
// 		onChange={(e) =>
// 			this.setState({ name: e.target.value })
// 		}
// 	/>
// 	<label htmlFor="email">EMAIL ADDRESS</label>
// 	<input
// 		type="email"
// 		id="email"
// 		placeholder="Email"
// 		required
// 		autoComplete="username"
// 		value={this.state.email}
// 		onChange={(e) => this.setState({ email: e.target.value })}
// 	/>
// 	<label htmlFor="email">PASSWORD</label>
// 	<div className="pass-wrapper">
// 		<input
// 			type={this.state.hiddenPass ? "text" : "password"}
// 			id="password"
// 			placeholder="Password"
// 			required
// 			autoComplete="new-password"
// 			value={this.state.password}
// 			onChange={(e) =>
// 				this.setState({ password: e.target.value })
// 			}
// 		/>
// 		<i onClick={this.togglePassShow}>{eye}</i>
// 	</div>

// 	<label htmlFor="email">CONFIRM PASSWORD</label>
// 	<div className="pass-wrapper">
// 		<input
// 			type={this.state.hiddenConfirm ? "text" : "password"}
// 			id="confirm-password"
// 			placeholder="Confirm Password"
// 			autoComplete="new-password"
// 			required
// 			value={this.state.confirmPassword}
// 			onChange={(e) =>
// 				this.setState({
// 					confirmPassword: e.target.value,
// 				})
// 			}
// 		/>
// 		<i onClick={this.toggleConfirmShow}>{eye}</i>
// 	</div>
// 	<label htmlFor="email">PHONE NUMBER</label>
// 	<PhoneInput
// 		placeholder="Enter phone number"
// 		country="GB"
// 		requiredS
// 		value={this.state.phone}
// 		onChange={(phone) => this.setState({ phone })}
// 	/>

// 	<button type="submit" className="btn-primary">
// 		{this.props.inProgress ? (
// 			<FontAwesomeIcon
// 				icon="sync-alt"
// 				spin
// 				style={{ width: 40, height: 40 }}
// 			/>
// 		) : (
// 			"Continue"
// 		)}
// 	</button>
// </form>
// <div className="bottom-container">
// 	<p>
// 		Already have an Account? <a href="/login"> Log In</a>
// 	</p>
// </div>
// <div className="bottom-container-web">
// 	<div className="left">
// 		<a href></a>
// 		<img src="../static/images/Sign Up ASSET WEB/Component 2 – 11.png"></img>
// 		<a href>
// 			<img src="../static/images/Sign Up ASSET WEB/Component 2 – 12.png"></img>
// 		</a>
// 	</div>
// 	<div className="right">
// 		<p style={{ fontSize: 13, marginRight: "19%" }}>
// 			<a className="link" href="/">
// 				&lt; Back to Home
// 			</a>
// 		</p>
// 	</div>
// </div>

// <style jsx>{`
// 	.right .bottom-container p,
// 	h5 {
// 		display: inline;
// 		text-align: left;
// 	}

// 	h1 {
// 		font-size: 20px;
// 		font-family: "Open Sans", sans-serif;
// 		font-weight: 500;
// 	}
// 	.form-container label {
// 		display: none;
// 	}
// 	.form-container input {
// 		margin-bottom: 10px;
// 	}
// 	.pass-wrapper {
// 		margin-bottom: 0px;
// 	}
// 	i {
// 		position: absolute;
// 		top: 30%;
// 		right: 6%;
// 		// width:10px;
// 	}
// 	p > a {
// 		margin: 0px;
// 		font-weight: 540;
// 		font-color: #5bb7de;
// 		-webkit-text-stroke: 0.5px #5bb7de;
// 	}
// 	.bottom-container {
// 		display: none;
// 	}
// 	.bottom-container-web {
// 		display: flex;
// 		flex-direction: row;
// 		// background:blue;
// 		margin: 0 auto;
// 		width: 100%;
// 		align-items: flex-start;
// 		justify-content: flex-start;
// 		align-self: flex-start;
// 	}

// 	.bottom-container-web .left {
// 		flex-basis: 26%;
// 		// background:red;
// 		display: flex;
// 		margin-top: 1%;
// 		justify-content: flex-end;
// 		align-self: flex-start;
// 	}

// 	.bottom-container-web .right {
// 		flex-basis: 60%;
// 		// background:yellow;
// 		text-align: left;
// 		margin-top: 1%;
// 		align-items: flex-start;
// 		justify-content: flex-start;
// 		align-self: flex-start;
// 		margin-top: -1%;
// 	}

// 	.bottom-container-web img {
// 		height: 25px;
// 		width: 25px;
// 		tex-align: center;
// 	}
// 	@media only screen and (max-width: 414px) {
// 		.logo img {
// 			display: none;
// 		}
// 		.box-title {
// 			margin-top: 30px;
// 		}
// 		.error-container {
// 			margin-top: 10% !important;
// 		}
// 		.form-container h1,
// 		p {
// 			display: none;
// 		}
// 		.bottom-container p {
// 			display: flex;
// 			font-size: 20px;
// 			color: #ffffff;
// 		}
// 		.bottom-container {
// 			display: block;
// 		}

// 		.form-container label {
// 			font-size: 19px;
// 			text-transform: uppercase;
// 			display: flex;
// 			// margin-bottom:-15px;
// 		}
// 		// .pass-wrapper{
// 		//   margin-top:20px;
// 		// }
// 		.form-container input {
// 			// margin-bottom:60px;
// 			font-size: 18px;
// 		}
// 		.bottom-container p > a {
// 			color: #ffffff;
// 			font-size: 20px;
// 			font-family: "Open Sans", sans-serif;
// 			font-weight: 900;
// 		}

// 		.bottom-container-web {
// 			display: none;
// 		}
// 	}
// `}</style>
