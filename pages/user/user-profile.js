import CustomDatePicker from "../../components/CustomDatePicker";
import moment from "moment";
import Header from "../../components/header";
import Menu from "../../components/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as Profile from "../../components/ProfileComponents";
import "../styles/components/new-user/CreateProfile.css";
import "../styles/new-user.css";
import "../styles/user-profile.css";
import { connect } from "react-redux";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions";
import { getCookie } from "../../utils/cookie";
import Link from "next/link";
import ENV from "../../config";
import * as axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessModal = () => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		setTimeout(() => setVisible(false), 3000);
	}, []);

	return visible ? (
		<div>
			<Profile.ModalSuccessContainer>
				<Profile.ModalSuccessWrapper>
					<Profile.ModalSuccessText>
						<Profile.ModalSuccessImg src="../static/images/profile/check.png" />

						<Profile.ModalSuccessTitle>
							Your profile has been saved
						</Profile.ModalSuccessTitle>
					</Profile.ModalSuccessText>
				</Profile.ModalSuccessWrapper>
			</Profile.ModalSuccessContainer>
		</div>
	) : null;
};

function UserProfile(props) {
	const [info, setInfo] = useState({
		emailUser: props.user.email ? props.user.email : "",
		fullName: props.user.fullname ? props.user.fullname : "",
		idNumber: props.user.idNumber ? props.user.idNumber : "",
		gender: props.user.gender ? props.user.gender : "",
		dob: props.user.dob ? moment(props.user.dob).format("LL") : "",
		pob: props.user.pob ? props.user.pob : "",
		address: props.user.address ? props.user.address : "",
		password: "",
		confirmPassword: "",
		phone: props.user.phone ? "+" + props.user.phone : "",
	});

	const [focus, setFocus] = useState({
		emailUser: false,
		fullName: false,
		idNumber: false,
		gender: false,
		dob: false,
		pob: false,
		address: false,
		password: false,
		confirmPassword: false,
		phone: false,
	});

	const [error, setError] = useState({
		emailUser: false,
		password: false,
		confirmPassword: false,
		phone: false,
	});

	const [choice, setChoice] = useState("detail");
	const [hiddenPass, setHidden] = useState(true);
	const [hiddenConfirm, setConfirm] = useState(true);
	const [space, setSpace] = useState(false);
	const [popup, setPopup] = useState(false);
	const [success, setSuccess] = useState(false);

	const validateEmailFormat = (value) => {
		let format = "^[a-zA-Z0-9+_.-]+@[a-zA-Z.-]+(?:.[a-zA-Z-]+)+$";
		if (value.match(format)) {
			return true;
		}
		return false;
	};

	const handleChoiceChange = (e) => {
		e.preventDefault();
		e.currentTarget.value == "detail"
			? setChoice("detail")
			: setChoice("edit");
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Check if the password length is less than 8 characters
		if (name == "password" || name == "confirmPassword") {
			if (value.length < 8) {
				setError({
					...error,
					[name]: true,
				});
			} else {
				setError({
					...error,
					[name]: false,
				});
			}
		}

		// Check if the email matches the standard format
		else if (name == "emailUser") {
			if (!validateEmailFormat(value)) {
				setError({
					...error,
					[name]: true,
				});
			} else {
				setError({
					...error,
					[name]: false,
				});
			}
		}

		// Set the input
		setInfo({
			...info,
			[name]: value,
		});
	};

	const handlePhoneChange = (value) => {
		// Check if the phone number length is less than 8 characters or more than 15 characters
		// The minimum 8 characters include:
		// 1 character for '+' sign and 2 characters for country code (ex: 62 for Indonesia)
		if (value.length < 8 || value.length > 15) {
			setError({
				...error,
				phone: true,
			});
		} else {
			setError({
				...error,
				phone: false,
			});
		}

		// Set the input
		setInfo({
			...info,
			phone: value,
		});
	};

	const handleFocusChange = (e) => {
		const { name, value } = e.target;
		setFocus({
			...focus,
			[name]: true,
		});
	};

	const handleBlurChange = (e) => {
		const { name, value } = e.target;
		setFocus({
			...focus,
			[name]: false,
		});
	};

	const handlePhoneFocusChange = (value) => {
		setFocus({
			...focus,
			phone: true,
		});
	};

	const handlePhoneBlurChange = (value) => {
		setFocus({
			...focus,
			phone: false,
		});
	};

	const toggleHiddenPass = () => {
		setHidden(!hiddenPass);
	};

	const toggleHiddenConfirm = () => {
		setConfirm(!hiddenConfirm);
	};

	const handleSaveClick = () => {
		setPopup(true);
	};

	const handleCancelClick = () => {
		setPopup(false);
	};

	const checkAllData = () => {
		if (
			error.emailUser == true ||
			error.password == true ||
			error.confirmPassword == true ||
			error.phone == true ||
			info.password != info.confirmPassword
		) {
			return false;
		}
		return true;
	};

	const updateUser = async () => {
		if (info.password == "" || info.confirmPassword == "") {
			alert("Password or confirm password field cannot be blank");
		} else if (checkAllData()) {
			axios
				.post(
					ENV.API + `/v1/user/checkEmail`,
					{ email: info.emailUser },
					{
						headers: {
							Authorization: `Bearer ${getCookie("token")}`,
						},
					}
				)
				.then(async (response) => {
					if (response.data.duplicate) {
						alert("Email already used");
					} else {
						let urlFetch = ENV.API + `/v1/user/editProfile`;
						let data;
						if (info.password != "") {
							data = {
								email: info.emailUser,
								gender: info.gender,
								address: info.address,
								password: info.password,
							};
						} else {
							data = {
								email: info.emailUser,
								gender: info.gender,
								address: info.address,
							};
						}

						await axios
							.post(urlFetch, data, {
								headers: {
									Authorization: `Bearer ${getCookie(
										"token"
									)}`,
								},
							})
							.then(async () => {
								let user_data = props.user;

								user_data.email = info.emailUser;
								user_data.gender = info.gender;
								user_data.address = info.address;

								setSuccess(true);
								setChoice("detail");
								toast.success("Your profile has been saved");
								setPopup(false);
							})
							.catch((error) => {
								console.log(error);
								alert("Please check your data");
							});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			alert("Please check your data");
		}
	};

	const cancelEdit = () => {
		setChoice("detail");
	};

	return (
		<Profile.MainWrapper>
			{console.log(success)}
			<Header />
			<Menu
				isAuthenticated={true}
				username={info.fullName}
				id={info.idNumber}
				scrolled_props="true"
				is_homepage="false"
				is_profile="true"
				choice={choice}
				setChoice={setChoice}
			/>

			{choice == "detail" ? (
				<Profile.Wrapper>
					<Profile.ActionSect>
						<Profile.ActionChoiceActive
							onClick={handleChoiceChange}
							value="detail">
							<Profile.ChoiceImg src="../static/images/profile/detail-profile-blue.png" />
							<Profile.AccountLinkActive>
								Detail Profile
							</Profile.AccountLinkActive>
							<Profile.ArrowRightImg src="../static/images/profile/arrow-right-blue.png" />
						</Profile.ActionChoiceActive>

						<Profile.ActionChoice
							onClick={handleChoiceChange}
							value="edit">
							<Profile.ChoiceImg src="../static/images/profile/edit-profile-white.png" />
							<Profile.AccountLink>
								Edit Profile
							</Profile.AccountLink>
							<Profile.ArrowRightImg src="../static/images/profile/arrow-right-white.png" />
						</Profile.ActionChoice>
					</Profile.ActionSect>

					<Profile.ProfileSect>
						<Profile.ProfileAction>
							<Profile.AccountText>
								Account Profile
							</Profile.AccountText>
							{success && (
								<ToastContainer
									position={"top-center"}
									autoClose={3000}
								/>
							)}
							<Link href="/logout" passHref>
								<Profile.LogOutButton>
									Log Out
								</Profile.LogOutButton>
							</Link>
						</Profile.ProfileAction>

						<div>
							<Profile.Data>
								<Profile.DataSubPersonal>
									<Profile.SectionName>
										Personal Data
									</Profile.SectionName>
									<Profile.SectionExp>
										Your personal basic information.
									</Profile.SectionExp>
								</Profile.DataSubPersonal>

								<Profile.Table>
									<tbody>
										<Profile.TableRow>
											<Profile.TableHeading>
												Full Name
											</Profile.TableHeading>
											<Profile.TableDetailPersonal>
												{info.fullName}
											</Profile.TableDetailPersonal>
										</Profile.TableRow>

										<Profile.TableRow>
											<Profile.TableHeading>
												ID Number
											</Profile.TableHeading>
											<Profile.TableDetailPersonal>
												{info.idNumber}
											</Profile.TableDetailPersonal>
										</Profile.TableRow>

										<Profile.TableRow>
											<Profile.TableHeading>
												Gender
											</Profile.TableHeading>
											<Profile.TableDetailPersonal>
												{info.gender}
											</Profile.TableDetailPersonal>
										</Profile.TableRow>

										<Profile.TableRow>
											<Profile.TableHeading>
												Place of Birth
											</Profile.TableHeading>
											<Profile.TableDetailPersonal>
												{info.pob}
											</Profile.TableDetailPersonal>
										</Profile.TableRow>

										<Profile.TableRow>
											<Profile.TableHeading>
												Date of Birth
											</Profile.TableHeading>
											<Profile.TableDetailPersonal>
												{info.dob}
											</Profile.TableDetailPersonal>
										</Profile.TableRow>

										<Profile.TableRow>
											<Profile.TableHeading>
												Address
											</Profile.TableHeading>
											<Profile.TableDetailPersonal>
												{info.address}
											</Profile.TableDetailPersonal>
										</Profile.TableRow>
									</tbody>
								</Profile.Table>
							</Profile.Data>

							<Profile.Divider></Profile.Divider>

							<Profile.Data>
								<Profile.DataSubAccount>
									<Profile.SectionName>
										Account
									</Profile.SectionName>
									<Profile.SectionExp>
										Your personal account information.
									</Profile.SectionExp>
								</Profile.DataSubAccount>

								<Profile.Table>
									<tbody>
										<Profile.TableRow>
											<Profile.TableHeading>
												Email Address
											</Profile.TableHeading>
											<Profile.TableDetail>
												{info.emailUser}
											</Profile.TableDetail>
										</Profile.TableRow>

										<Profile.TableRow>
											<Profile.TableHeading>
												Password
											</Profile.TableHeading>
											<Profile.TableDetail>
												<Profile.PasswordText
													type="password"
													value={info.password}
													disabled
												/>
											</Profile.TableDetail>
										</Profile.TableRow>

										<Profile.TableRow>
											<Profile.TableHeading>
												Phone Number
											</Profile.TableHeading>
											<Profile.TableDetail>
												{info.phone}
											</Profile.TableDetail>
										</Profile.TableRow>
									</tbody>
								</Profile.Table>
							</Profile.Data>

							<Profile.Divider></Profile.Divider>
						</div>
					</Profile.ProfileSect>
				</Profile.Wrapper>
			) : (
				<Profile.Wrapper>
					<Profile.ActionSect>
						<Profile.ActionChoice
							onClick={handleChoiceChange}
							value="detail">
							<Profile.ChoiceImg src="../static/images/profile/detail-profile-white.png" />
							<Profile.AccountLink>
								Detail Profile
							</Profile.AccountLink>
							<Profile.ArrowRightImg src="../static/images/profile/arrow-right-white.png" />
						</Profile.ActionChoice>

						<Profile.ActionChoiceActive
							onClick={handleChoiceChange}
							value="edit">
							<Profile.ChoiceImg src="../static/images/profile/edit-profile-blue.png" />
							<Profile.AccountLinkActive>
								Edit Profile
							</Profile.AccountLinkActive>
							<Profile.ArrowRightImg src="../static/images/profile/arrow-right-blue.png" />
						</Profile.ActionChoiceActive>
					</Profile.ActionSect>

					<Profile.ProfileSect>
						<Profile.ProfileAction>
							<Profile.AccountText>
								Account Profile
							</Profile.AccountText>
							<Link href="/logout" passHref>
								<Profile.LogOutButton>
									Log Out
								</Profile.LogOutButton>
							</Link>
						</Profile.ProfileAction>

						<Profile.EditWrapper>
							<div>
								<Profile.EditData>
									<Profile.SectionType>
										<Profile.SectionTitle>
											Personal Data
										</Profile.SectionTitle>
										<Profile.SectionExp>
											Your personal basic information.
										</Profile.SectionExp>
									</Profile.SectionType>

									<form>
										<Profile.FormLabel
											filled={focus.fullName}>
											Full Name
										</Profile.FormLabel>
										<Profile.FormRow>
											<Profile.InputText
												type="text"
												name="fullName"
												value={info.fullName}
												dis="true"
												disabled
												onChange={handleInputChange}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
											/>
										</Profile.FormRow>

										<Profile.FormLabel
											filled={focus.idNumber}>
											ID Number
										</Profile.FormLabel>
										<Profile.FormRow>
											<Profile.InputText
												type="text"
												name="idNumber"
												value={info.idNumber}
												dis="true"
												disabled
												onChange={handleInputChange}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
											/>
										</Profile.FormRow>

										<Profile.FormLabel filled={focus.dob}>
											Date of Birth
										</Profile.FormLabel>
										<Profile.FormRow>
											<Profile.InputText
												type="text"
												name="dob"
												value={info.dob}
												dis="true"
												disabled
												required
												onChange={handleInputChange}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
											/>
										</Profile.FormRow>

										<Profile.FormLabel filled={focus.pob}>
											Place of Birth
										</Profile.FormLabel>
										<Profile.FormRow>
											<Profile.InputText
												type="text"
												name="pob"
												value={info.pob}
												dis="true"
												disabled
												required
												onChange={handleInputChange}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
											/>
										</Profile.FormRow>

										<Profile.FormLabel
											filled={focus.gender}>
											Gender
										</Profile.FormLabel>
										<Profile.FormRow>
											<Profile.InputText
												type="text"
												name="gender"
												value={info.gender}
												dis="true"
												disabled
												required
												onChange={handleInputChange}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
											/>
										</Profile.FormRow>

										<Profile.FormRow>
											<Profile.RadioWrapper>
												<Profile.InputRadio
													type="radio"
													name="radio_gender"
													checked={
														info.gender == "male"
															? "true"
															: "false"
													}
													disabled
												/>
												<Profile.LabelRadio>
													Male
												</Profile.LabelRadio>
											</Profile.RadioWrapper>

											<Profile.RadioWrapper>
												<Profile.InputRadio
													type="radio"
													name="radio_gender"
													checked={
														info.gender == "female"
															? "true"
															: "false"
													}
													disabled
												/>
												<Profile.LabelRadio>
													Female
												</Profile.LabelRadio>
											</Profile.RadioWrapper>
										</Profile.FormRow>

										<Profile.FormLabel
											filled={focus.address}>
											Address
										</Profile.FormLabel>
										<Profile.FormRow>
											<Profile.InputText
												type="text"
												name="address"
												value={info.address}
												required
												onChange={handleInputChange}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
											/>
										</Profile.FormRow>
									</form>
								</Profile.EditData>

								<Profile.EditData>
									<Profile.SectionType>
										<Profile.SectionTitle>
											Account Data
										</Profile.SectionTitle>
										<Profile.SectionExp>
											Your personal account information.
										</Profile.SectionExp>
									</Profile.SectionType>

									<form>
										<Profile.FormLabel
											filled={focus.emailUser}>
											Email Address
										</Profile.FormLabel>
										<Profile.FormRowAccount
											filled={focus.emailUser}
											error={error.emailUser}>
											<Profile.InputTextPassword
												type="text"
												name="emailUser"
												value={info.emailUser}
												required
												onChange={handleInputChange}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
											/>
										</Profile.FormRowAccount>
										{error.emailUser ? (
											<Profile.ErrorMessage>
												The email format doesn't match
												the standard format
											</Profile.ErrorMessage>
										) : null}

										<Profile.FormLabel
											filled={focus.password}>
											Password
										</Profile.FormLabel>
										<Profile.FormRowAccount
											filled={focus.password}
											error={error.password}>
											<Profile.InputTextPassword
												type={
													hiddenPass
														? "password"
														: "text"
												}
												name="password"
												value={info.password}
												required
												onChange={
													!space && handleInputChange
												}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
												onKeyDown={(e) => {
													if (e.keyCode == 32) {
														setSpace(true);
														alert(
															"Password doesn't allow a space"
														);
													} else {
														setSpace(false);
													}
												}}
											/>
											<Profile.EyePic>
												{hiddenPass ? (
													<FontAwesomeIcon
														onClick={
															toggleHiddenPass
														}
														icon={faEyeSlash}
													/>
												) : (
													<FontAwesomeIcon
														onClick={
															toggleHiddenPass
														}
														icon={faEye}
													/>
												)}
											</Profile.EyePic>
										</Profile.FormRowAccount>
										{error.password ? (
											<Profile.ErrorMessage>
												The minimum character is 8
											</Profile.ErrorMessage>
										) : null}

										<Profile.FormLabel
											filled={focus.confirmPassword}>
											Confirm New Password
										</Profile.FormLabel>
										<Profile.FormRowAccount
											filled={focus.confirmPassword}
											error={error.confirmPassword}>
											<Profile.InputTextPassword
												type={
													hiddenConfirm
														? "password"
														: "text"
												}
												name="confirmPassword"
												value={info.confirmPassword}
												required
												onChange={
													!space && handleInputChange
												}
												onFocus={handleFocusChange}
												onBlur={handleBlurChange}
												onKeyDown={(e) => {
													if (e.keyCode == 32) {
														setSpace(true);
														alert(
															"Password doesn't allow a space"
														);
													} else {
														setSpace(false);
													}
												}}
											/>
											<Profile.EyePic>
												{hiddenConfirm ? (
													<FontAwesomeIcon
														onClick={
															toggleHiddenConfirm
														}
														icon={faEyeSlash}
													/>
												) : (
													<FontAwesomeIcon
														onClick={
															toggleHiddenConfirm
														}
														icon={faEye}
													/>
												)}
											</Profile.EyePic>
										</Profile.FormRowAccount>
										{error.confirmPassword ? (
											<Profile.ErrorMessage>
												The minimum character is 8
											</Profile.ErrorMessage>
										) : null}

										<Profile.FormLabel filled={focus.phone}>
											Phone Number
										</Profile.FormLabel>
										<Profile.FormRowPhone
											filled={focus.phone}
											error={error.phone}>
											<Profile.PhoneInput
												country="ID"
												value={info.phone}
												name="phone"
												onChange={(value) =>
													handlePhoneChange(value)
												}
												onFocus={(value) =>
													handlePhoneFocusChange(
														value
													)
												}
												onBlur={(value) =>
													handlePhoneBlurChange(value)
												}
											/>
										</Profile.FormRowPhone>
										{error.phone ? (
											<Profile.ErrorMessage>
												The minimum character is 8 and
												the maximum character is 15,
												include the '+' sign and the
												country code
											</Profile.ErrorMessage>
										) : null}
									</form>
								</Profile.EditData>

								<Profile.ButtonSection>
									<Profile.SaveEditButton
										type="submit"
										onClick={handleSaveClick}>
										Save
									</Profile.SaveEditButton>
									<Profile.CancelEditButton
										onClick={cancelEdit}>
										Cancel
									</Profile.CancelEditButton>
								</Profile.ButtonSection>
							</div>
						</Profile.EditWrapper>

						{popup ? (
							<Profile.ModalContainer pop={popup}>
								<Profile.ModalWrapper>
									<Profile.ModalTitle>
										Save the information you have changed?
									</Profile.ModalTitle>

									<Profile.ModalText>
										<Profile.ModalExp>
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore
											et dolore magna aliqua
										</Profile.ModalExp>
									</Profile.ModalText>

									<Profile.ModalButtonSect>
										<Profile.CancelActionButton
											onClick={handleCancelClick}>
											No, Cancel
										</Profile.CancelActionButton>
										<Profile.SaveActionButton
											onClick={updateUser}>
											Yes, Change
										</Profile.SaveActionButton>
									</Profile.ModalButtonSect>
								</Profile.ModalWrapper>
							</Profile.ModalContainer>
						) : null}
					</Profile.ProfileSect>

					<style jsx global>
						{`
							.react-phone-number-input {
								width: 100%;
							}

							.react-phone-number-input__input {
								padding: 5px;
								height: 35px;
								border: none;
								font-family: "Avenir LT Pro", sans-serif;
								font-size: 16px;
								color: #626b79;
							}

							.react-phone-number-input__country {
								margin-left: 0.5em;
							}
						`}
					</style>
				</Profile.Wrapper>
			)}
		</Profile.MainWrapper>
	);
}

UserProfile.getInitialProps = async (ctx) => {
	initialize(ctx);
	await ctx.store.dispatch(
		actions.getUser(getCookie("_id", ctx.req), "user", ctx.req)
	);
	return {};
};

const mapStateToProps = (state) => ({
	user: state.user.user_data,
});
//Mengirimkan user profile
export default connect(mapStateToProps)(UserProfile);
