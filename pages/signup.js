import Link from "next/link";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";
import initialize from "../utils/initialize";
import PhoneInput from "react-phone-number-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBullseye,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/header";
import { Form, FormContainer } from "../components/FormComponents";
import styled from "styled-components";
import Footer from "../components/footer";
import { NavBarBlue } from "../components/MenuComponents";

//Menerima Argumen dari luar
function Signup(props) {
	// state declaration
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

	const [error, setError] = useState({
		name: false,
		email: false,
		password: false,
		confirmPassword: false,
		phone: false,
	});

	const [spaceEntered, setSpaceEntered] = useState(false);
	const [shortPassword, setShortPassword] = useState(false);
	const [shortPhone, setShortPhone] = useState(false);
	const [hiddenPass, setHiddenPass] = useState(true);
	const [hiddenConfirmPass, setHiddenConfirmPass] = useState(true);
	const [verifyPassword, setVerifyPassword] = useState(true);
	const [isInvalidFullName, setIsInvalidFullName] = useState(false);

	// functions used on this page
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
		console.log(value);
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

	function handlePhoneOnFocus(e) {
		e.target.placeholder = "";
		if (props.errorMessage?.includes("phone") || shortPhone) {
			e.target.placeholder = "";
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

	function handleSubmit(e) {
		e.preventDefault();
		setShortPassword(false);
		setShortPhone(false);
		if (values.password != values.confirmPassword) {
			if (values.password.length < 8) {
				setVerifyPassword(false);
				setShortPassword(true);
				setError({
					...error,
					password: true,
					confirmPassword: true,
				});
			} else {
				setVerifyPassword(false);
				setError({
					...error,
					password: true,
					confirmPassword: true,
				});
			}
		} else if (values.password.length < 8) {
			setVerifyPassword(false);
			setShortPassword(true);
			setError({
				...error,
				password: true,
				confirmPassword: true,
			});
		} else if (values.phone?.length < 8) {
			// min length 8 includes (2 from country code and 1 from "+" sign)
			setError({
				...error,
				phone: true,
			});
			setShortPhone(true);
		} else {
			e.preventDefault();
			setVerifyPassword(true);
			setShortPassword(false);
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

	// triggered when there is an error(s)
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

	return (
		<>
			<Header />
			<NavBarBlue
				navChildColor="#fff"
				navText="Homepage"
				endpoint="/index"
			/>
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<FormInner>
						<center>
							<Heading className="bold">
								Welcome to Transfree
							</Heading>
							<BelowHeading>
								Already have an account ?{" "}
								<Link href="/login">
									<a>Login</a>
								</Link>
							</BelowHeading>
						</center>
						{selected.name || (filled.name && !error.name) ? (
							<FormLabel
								filled={filled.name}
								selectedName={selected.name}>
								Name
							</FormLabel>
						) : null}
						<InputContainer
							selectedName={selected.name}
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
								onKeyDown={(e) => {
									if (e.keyCode == 32) {
										setSpaceEntered(true);
										alert("Password doens't allow a space");
									} else {
										setSpaceEntered(false);
									}
								}}
								onChange={!spaceEntered && handleChange}
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
						(!filled.password &&
							(!verifyPassword || shortPassword)) ? (
							<ErrorText>
								{!verifyPassword &&
								!selected.password &&
								filled.password
									? shortPassword
										? "Password minimum length is 8"
										: "Password and confirmation password do not match"
									: "Password cannot be blank"}
							</ErrorText>
						) : null}
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
								onKeyDown={(e) => {
									if (e.keyCode == 32) {
										setSpaceEntered(true);
										alert("Password doens't allow a space");
									} else {
										setSpaceEntered(false);
									}
								}}
								onChange={!spaceEntered && handleChange}
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
						(!filled.confirmPassword &&
							(!verifyPassword || shortPassword)) ? (
							<ErrorText>
								{!verifyPassword &&
								!selected.confirmPassword &&
								filled.confirmPassword
									? shortPassword
										? "Password minimum length is 8"
										: "Password and confirmation password do not match"
									: "Confirmation password cannot be blank"}
							</ErrorText>
						) : null}
						{selected.phone || (filled.phone && !error.phone) ? (
							<FormLabel
								errorMessage={
									props.errorMessage?.includes("phone") ||
									shortPhone
								}
								filled={filled.phone}
								selectedPhone={selected.phone}>
								Phone
							</FormLabel>
						) : null}
						<InputContainer
							selectedPhone={selected.phone}
							error={error.phone}
							errorMessage={
								props.errorMessage?.includes("phone") ||
								shortPhone
							}
							filled={filled.phone}>
							<InputPhone
								placeholder="Phone"
								autoComplete="new-phone"
								// country="ID"
								className={error.phone ? "phone-error" : null}
								required
								value={values.phone}
								onChange={(value) => handlePhoneChange(value)}
								onFocus={(e) => handlePhoneOnFocus(e)}
								onBlur={(value, e) => handlePhoneOnBlur(value)}
							/>
						</InputContainer>
						{error.phone ||
						(!filled.phone &&
							(props.errorMessage?.includes("phone") ||
								shortPhone)) ? (
							<ErrorText>
								{error.phone &&
								!selected.phone &&
								(props.errorMessage?.includes("phone") ||
									shortPhone)
									? shortPhone
										? "Phone number minimum length is 5"
										: "Phone number is already registered"
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
					font-family: "Avenir Next LT Pro", sans-serif;
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
	width: 470px;
	margin: 0 4px;
	display: flex;
	flex-direction: column;
	transition: 0.4s all ease-in;

	@media (max-width: 620px) {
		width: 312px;
	}

	@media (max-width: 375px) {
		width: 80vw;
	}
`;

const Heading = styled.p`
	font-weight: bold;
	font-size: 32px;
	line-height: 40px;
	margin-bottom: 16px;
	color: #009fe3;
	word-wrap: break-word;
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

		:focus ::placeholder {
			color: transparent;
		}
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
