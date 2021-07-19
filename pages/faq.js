import latinize from "latinize";
import Header from "../components/header.js";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";
import Footer from "../components/footer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../utils/cookie";
import Highlighter from "react-highlight-words";
import { List } from "../components/FAQData";
import initialize from "../utils/initialize";
import styled, { keyframes } from "styled-components";
import { NavBarWhite } from "../components/MenuComponents.js";

//Long text untuk FAQ

const FAQ = (props) => {
	const [listDetail, setListDetail] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const searchWords = searchText.split(/\s/).filter((word) => word);

	// click function for card's onClick
	function toggleClick(index) {
		window.scrollTo(0, 0);
		setClicked(true);
		if (listDetail === index) {
			// if listDetail question is already active, then close it
			return setListDetail(null);
		} else {
			return setListDetail(index);
		}
	}

	// click function for "Back to List" button
	function returningClick(index) {
		window.scrollTo(0, 0);
		setClicked(false);
		setActiveIndex(0);
		if (listDetail === index) {
			// if listDetail question is already active, then close it
			return setListDetail(null);
		} else {
			return setListDetail(index);
		}
	}

	// function to get index of list and index of accordion based on searchWords
	function getIndex(listItems, searchWords) {
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < listItems[i].accordion.length; j++) {
				if (
					listItems[i].accordion[j].heading
						.toLowerCase()
						.includes(searchWords.toLowerCase()) ||
					listItems[i].accordion[j].belowHeading
						.toLowerCase()
						.includes(searchWords.toLowerCase())
				) {
					return [i, j];
				}
			}
		}
		return -1; //to handle the case where the value doesn't exist
	}

	var ListItems = List;
	var searchedID = getIndex(ListItems, searchText);

	// change index based on search input text
	useEffect(() => {
		if (searchText == "" || searchText == undefined) {
			setListDetail(null);
			setClicked(false);
		} else {
			var searchedID = getIndex(ListItems, searchText);
			if (searchedID[0] !== -1 || searchedID[1] !== -1) {
				setListDetail(searchedID[0]);
				setActiveIndex(searchedID[1]);
				setClicked(true);
			}
		}
	}, [searchText]);

	console.log(props.username);

	return (
		<>
			<Header />
			<NavBarWhite
				username={props.username}
				id={props.id}
				isAuthenticated={true}
			/>
			<HeroContainer>
				<HeroHeading className="bold">
					Hello, How Can We Help You?
				</HeroHeading>
				<SearchForm
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}
					onSubmit={(e) => e.preventDefault()}>
					<InputContainer>
						{/* icon */}
						<MagnifyingIcon
							src="../static/images/magnifying-glass.png"
							alt=""
							style={{ marginLeft: 16, marginRight: 16 }}
						/>
						<FormInput
							type="text"
							value={searchText}
							placeholder="Ask a question..."
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</InputContainer>
					<FormButton>Search</FormButton>
				</SearchForm>
			</HeroContainer>
			<ListContainer
				clicked={clicked}
				notFound={searchedID == -1 && true}>
				{searchedID == -1 ? (
					<center>
						<IconNotFound src="../static/images/file_2.png" />
						<QuestionInner>
							<center>
								<Heading className="bold">
									Your Search is Not Found
								</Heading>
								<BelowHeading notFound={true}>
									We’ve searched every keyword that you
									typing, but did not match any keyword. If
									you still can't find it, you can contact us
									directly
								</BelowHeading>
								<a
									href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree"
									target="_blank">
									<Button>Contact Us</Button>
								</a>
							</center>
						</QuestionInner>
					</center>
				) : null}
				{List.map((item, index) => {
					return (
						<>
							<Card
								clicked={clicked}
								key={item.id}
								onClick={() => toggleClick(item.id)}>
								<CardIcon
									src={item.icon}
									className={item.autoSize}
								/>
								<CardTitle>{item.iconTitle}</CardTitle>
							</Card>
							{listDetail === item.id && clicked && (
								<>
									<Left>
										<CardIcon
											src={item.icon}
											className={item.autoSize}
										/>
										<LeftCardTitle className="bold">
											{item.iconTitle}
										</LeftCardTitle>
										<LeftCardText>
											{item.iconText}
										</LeftCardText>
										<LeftButton onClick={returningClick}>
											Back to List
										</LeftButton>
									</Left>
									<Right>
										{item.accordion.map((items, id) => {
											const boxShadowed =
												id === activeIndex
													? "box-shadowed"
													: "";

											const headingToHighlight =
												items.heading;

											const textToHighlight =
												items.belowHeading;

											return (
												<AccordionContainer
													key={id}
													boxShadowed={boxShadowed}>
													<AccordionButton
														onClick={() =>
															setActiveIndex(id)
														}>
														<Highlighter
															highlightClassName="Highlight"
															sanitize={latinize}
															searchWords={
																searchWords
															}
															autoEscape={true}
															caseSensitive={
																false
															}
															textToHighlight={
																headingToHighlight
															}
														/>
														{activeIndex === id ? (
															<FontAwesomeIcon
																icon={faTimes}
																width="24"
																height="24"
															/>
														) : (
															<FontAwesomeIcon
																icon={
																	faChevronRight
																}
																width="24"
																height="24"
															/>
														)}
													</AccordionButton>
													{activeIndex === id ? (
														<AccordionPanel>
															<Highlighter
																highlightClassName="Highlight"
																sanitize={
																	latinize
																}
																autoEscape={
																	true
																}
																caseSensitive={
																	false
																}
																searchWords={
																	searchWords
																}
																textToHighlight={
																	textToHighlight
																}
															/>
														</AccordionPanel>
													) : null}
												</AccordionContainer>
											);
										})}
									</Right>
								</>
							)}
						</>
					);
				})}
			</ListContainer>

			<QuestionContainer>
				<QuestionInner>
					<center>
						<Heading className="bold">
							Still have a question?
						</Heading>
						<BelowHeading>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua
						</BelowHeading>
						<a
							href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree"
							target="_blank">
							<Button>Contact Us</Button>
						</a>
					</center>
				</QuestionInner>
			</QuestionContainer>
			<Footer />
			<style jsx global>{`
				.accordion {
					border: none;
				}

				.Highlight {
					background-color: rgba(0, 159, 227, 0.4);
				}

				.box-Shadowed {
					border: 2px solid #e9e9e9;
					box-shadow: 0px 18px 50px rgba(98, 107, 121, 0.15);
				}

				.autoSize {
					width: 64px;
					height: auto !important;
				}
			`}</style>
		</>
	);
};

const IconNotFound = styled.img`
	width: 96px;
	height: 120px;
	margin-bottom: 24px;
`;

const HeroContainer = styled.div`
	margin-top: 72px;
	padding-top: 80px;
	padding-bottom: 80px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* min-height: 289px; */
	width: 100%;
	background-image: url("../static/images/batik-world-map-faq-page.png");
	background-color: #1e345b;

	@media (max-width: 670px) {
		padding-top: 40px;
		padding-bottom: 80px;
		background-image: none;
	}
`;

const HeroHeading = styled.div`
	font-weight: bold;
	font-size: 40px;
	line-height: 48px;
	text-align: center;
	letter-spacing: -0.02em;

	/* Neutral/White */
	color: #fff;
	margin-bottom: 32px;
	transition: 0.4s ease all;

	@media (max-width: 670px) {
		font-size: 32px;
		line-height: 40px;
	}
`;
const SearchForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 48px;
	margin: 0 16px;
`;
const InputContainer = styled.div`
	background: #ffffff;

	/* Neutral/ Smoke */
	border: 1px solid #e2e2e2;
	border-radius: 4px;
	margin-right: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 391px;
	height: 48px;
	transition: 0.4s ease all;

	@media (max-width: 670px) {
		width: 224px;
		height: 42px;
		margin-right: 16px;
	}
`;

const MagnifyingIcon = styled.img`
	width: 23px;
	height: 23px;

	@media (max-width: 670px) {
		width: 21px;
		height: 21px;
	}
`;

const FormInput = styled.input`
	outline: none;
	border: none;
	font-size: 16px;
	line-height: 24px;
	flex: 1;
	margin-right: 16px;

	::placeholder {
		color: #232933;
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

	@media (max-width: 670px) {
		font-size: 14px;
		line-height: 21px;
	}
`;
const FormButton = styled.button`
	height: 48px;
	width: 184px;
	background: #009fe3;
	border: 1px solid #009fe3;
	border-radius: 4px;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	padding: 8px 24px;
	text-align: center;
	letter-spacing: 0.2px;

	/* Neutral/ White */
	color: #ffffff;

	transition: 0.4s ease all;

	&:hover {
		background-color: #068ec8;
	}

	@media (max-width: 670px) {
		width: 104px;
		height: 42px;
		font-size: 14px;
		line-height: 21px;
	}
`;

const ListContainer = styled.div`
	display: ${(props) => (props.clicked ? "flex" : "grid")};
	grid-template-columns: repeat(auto-fill, 240px);
	/* grid-template-columns: repeat(auto-fill, minmax(186px, 1fr)); */
	flex-direction: ${(props) => (props.notFound ? "column" : "row")};
	justify-content: center;
	grid-column-gap: ${(props) => (props.clicked ? "null" : "24px")};
	grid-row-gap: ${(props) => (props.clicked ? "null" : "40px")};
	padding: ${({ clicked, notFound }) => {
		if (clicked) {
			if (notFound) {
				return "80px 120px 120px 120px";
			}
			return "64px 108px";
		} else {
			return "80px 108px";
		}
	}};
	background: #fff;
	transition: 0.4s all ease-in;

	@media (min-width: 480px) and (max-width: 660px) {
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 660px) {
		grid-template-columns: repeat(auto-fill, 288px);
		flex-direction: column;

		padding: 40px 16px 120px 16px;
	}
`;

const Left = styled.div`
	width: 392px;
	display: flex;
	flex-direction: column;
	margin-right: 128px;

	@media (max-width: 660px) {
		margin-right: 0;
		width: 344px;
	}

	@media (min-width: 660px) and (max-width: 932px) {
		margin-right: 64px;
	}
`;

const LeftCardTitle = styled.div`
	font-weight: bold;
	font-size: 32px;
	line-height: 40px;
	margin-top: 24px;
	margin-bottom: 16px;

	/* Neutral/Primary Text */
	color: #232933;
`;

const LeftCardText = styled.div`
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;

	display: flex;
	align-items: center;

	/* Neutral/ Slate */
	color: #626b79;
	margin-bottom: 32px;
`;

const LeftButton = styled.button`
	padding: 8px 24px;
	background: #ffffff;
	width: fit-content;
	/* Primary/Blue */
	border: 1px solid #009fe3;
	border-radius: 4px;

	font-weight: normal;
	font-size: 16px;
	line-height: 24px;
	transition: 0.1s all ease-in;
	text-align: center;

	/* Primary/Blue */
	color: #009fe3;

	&:hover {
		background: #009fe3;
		color: #fff;
	}
`;

const Right = styled.div`
	max-width: 704px;
	display: flex;
	flex-direction: column;

	@media (max-width: 660px) {
		width: 344px;
		margin-top: 40px;
	}
`;

// const StyledAccordion = styled(Accordion)``;

const AccordionContainer = styled.div`
	background: #ffffff;
	/* UI/Info */
	border: ${({ boxShadowed }) =>
		boxShadowed ? "2px solid #e9e9e9" : "1px solid #e9e9e9"};
	box-shadow: ${({ boxShadowed }) =>
		boxShadowed ? "0px 18px 50px rgba(98, 107, 121, 0.15)" : null};
	border-radius: 4px;
	padding: 24px 16px 24px 24px;
	width: 560px;
	margin-bottom: 16px;
	transition: 0.4s all ease-in;

	&:hover {
		transform: scale(1.02);
	}

	@media (max-width: 932px) {
		padding: 24px 24px 24px 24px;
		width: 344px;
	}
`;

const AccordionButton = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	cursor: pointer;
	/* Neutral/Primary Text */
	color: #232933;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const FadeIn = keyframes`
	0% {
    opacity: 0;
	}
	100% {
    opacity: 1;
	}
`;

const AccordionPanel = styled.div`
	margin-top: 16px;
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;
	max-width: 504px;
	/* Neutral/Secondary Text */
	color: #626b79;
	animation: ${FadeIn} 0.35s ease-in;

	@media (max-width: 932px) {
		max-width: none;
	}
`;

const Card = styled.div`
	height: 152px;
	display: ${(props) => (props.clicked ? "none" : "flex")};
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24px 48px;
	background: #ffffff;
	transition: 0.2s all ease-in;
	border: 1px solid #e9e9e9;

	/* Shadow/ Front */
	box-shadow: 0px 18px 50px rgba(98, 107, 121, 0.15);
	border-radius: 4px;

	&:hover {
		border: 2px solid #009fe3;
		cursor: pointer;
		transform: scale(1.1);
	}
`;

const CardIcon = styled.img`
	width: 64px;
	height: 64px;
`;
const CardTitle = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;

	display: flex;
	align-items: center;
	text-align: center;
	width: fit-content;
	/* Neutral/Primary Text */
	color: #232933;
	margin-top: 16px;
`;

const QuestionContainer = styled.div`
	background: #f3f5f7;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 40px;
`;

const QuestionInner = styled.div`
	max-width: 700px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Heading = styled.div`
	font-weight: bold;
	font-size: 32px;
	line-height: 40px;

	/* identical to box height, or 125% */

	color: #232933;
	margin-bottom: 16px;
`;

const BelowHeading = styled.div`
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;

	/* or 150% */
	text-align: center;

	/* Neutral/ Slate */
	color: #626b79;
	margin-bottom: ${({ notFound }) => (notFound ? "40px" : "24px")};
`;

const Button = styled.button`
	background: #009fe3;

	/* Brand/ Primary */
	border: 1px solid #009fe3;
	border-radius: 4px;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	padding: 8px 24px;
	/* identical to box height, or 150% */
	text-align: center;
	letter-spacing: 0.2px;

	/* Neutral/ White */
	color: #ffffff;
	margin: 0;
	transition: 0.4s ease all;

	&:hover {
		background-color: #068ec8;
	}
`;

FAQ.getInitialProps = async (ctx) => {
	initialize(ctx);
	if (getCookie("_id", ctx.req)) {
		await ctx.store.dispatch(
			actions.getUser(getCookie("_id", ctx.req), "user", ctx.req)
		);
	}
	return {};
};

const mapStateToProps = (state) => {
	return {
		username: state.user.user_data ? state.user.user_data.fullname : "",
		id: state.user.user_data ? state.user.user_data.idNumber : "",
	};
};

export default connect(mapStateToProps, actions)(FAQ);
