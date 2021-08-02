import Router from "next/router";
import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCookie } from "../../utils/cookie";
import Menu from "../../components/menu.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledDropzone from "../../components/StyledDropzone";
import initialize from "../../utils/initialize";
import Header from "../../components/header";
import styled from "styled-components";
import CreateProfile from "../../components/new-user/CreateProfile";
import UploadPhoto from "../../components/new-user/UploadPhoto";
import * as Profile from "../../components/ProfileComponents";
import userActions from "../../redux/actions/userActions";
import photoActions from "../../redux/actions/photoActions";
import { PrButton } from "../../components/landing-page/Buttons.js";

// Component yang menampilkan opsi pengisian detail dari user baru
function CurrentStepWindow(props) {
	switch (props.currentStep) {
		case 1:
			return (
				<CreateProfile
					userData={props.userData}
					nextStep={props.onNextStep}
				/>
			);
		case 2:
			return (
				<UploadPhoto
					userData={props.userData}
					nextStep={props.onNextStep}
				/>
			);
		default:
			return "";
	}
}

const SectionTitle = styled.h2`
	color: white;
	text-align: center;
	margin: 24px auto;
`;

const Actions = styled.section`
	background: #1687e5;
	padding-top: 38px;
	@media only screen and (max-width: 800px) {
		display: none;
	}
`;

function NewUser(props) {
	const [currentStep, setCurrentStep] = useState(
		props.userData.registrationStep - 1
	);

	useEffect(() => {
		switch (currentStep) {
			case 1:
				break;
			case 2:
				break;
			default:
				Router.replace("/");
		}
	});

	return (
		<Fragment>
			<Header />
			<Menu
				isAuthenticated={props.isAuthenticated}
				username={props.username}
				scrolled_props="true"
				is_homepage="false"
			/>
			<Profile.Wrapper>
				{/* Blue BG Sidebar */}
				<Actions>
					<Profile.ActionChoiceActive>
						<Profile.ChoiceImg src="../static/images/profile/detail-profile-blue.png" />
						<Profile.AccountLinkActive>
							Detail Profile
						</Profile.AccountLinkActive>
						<Profile.ArrowRightImg src="../static/images/profile/arrow-right-blue.png" />
					</Profile.ActionChoiceActive>
					<Profile.ActionChoice>
						<Profile.ChoiceImg src="../static/images/profile/edit-profile-white.png" />
						<Profile.AccountLink>Edit Profile</Profile.AccountLink>
						<Profile.ArrowRightImg src="../static/images/profile/arrow-right-white.png" />
					</Profile.ActionChoice>
				</Actions>
				{/* Profile */}
				<Profile.ProfileSect>
					<Profile.ProfileAction>
						<SectionTitle>Information Detail</SectionTitle>
					</Profile.ProfileAction>
					<CurrentStepWindow
						userData={props.userData}
						currentStep={
							props.currentStep ? props.currentStep : currentStep
						}
						onNextStep={() => setCurrentStep(currentStep + 1)}
					/>
				</Profile.ProfileSect>
			</Profile.Wrapper>
		</Fragment>
	);
}

NewUser.getInitialProps = async (ctx) => {
	initialize(ctx);
	await ctx.store.dispatch(
		userActions.getUser(getCookie("_id", ctx.req), "user", ctx.req)
	);
	return {};
};

const mapStateToProps = (state) => {
	if (state.user.user_data != null) {
		return {
			userData: state.user.user_data,
			isAuthenticated: true,
			username: state.user.user_data.fullname,
			id: state.user.user_data.idNumber,
			isInProgress: state.photo.inProgress,
			errorMessage: state.photo.errorMessage,
		};
	} else {
		return {
			userData: state.user.user_data,
			isAuthenticated: false,
			isInProgress: state.photo.inProgress,
			errorMessage: state.photo.errorMessage,
		};
	}
};

export default connect(mapStateToProps, photoActions)(NewUser);
