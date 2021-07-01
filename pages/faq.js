import Header from "../components/header.js";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";
import Menu from "../components/menu.js";
import Footer from "../components/footer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../utils/cookie";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
	AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { List } from "../components/FAQData";
import initialize from "../utils/initialize";
import styled, { keyframes } from "styled-components";

//Long text untuk FAQ

const FAQ = () => {
	const [listDetail, setListDetail] = useState(false);
	const [clicked, setClicked] = useState(false);
	// const [changed, setChanged] = useState(false);
	const [searchWord, setSearchWord] = useState("");

	function toggleClick(index) {
		window.scrollTo(0, 0);
		setClicked(!clicked);
		if (listDetail === index) {
			// if listDetail question is already active, then close it
			return setListDetail(null);
		} else {
			return setListDetail(index);
		}
	}

	return (
		<>
			<Header />
			{/* <NavBarWhite /> */}
			<Menu />
			<HeroContainer>
				<HeroHeading>Hello, How Can We Help You?</HeroHeading>
				<SearchForm
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}
					onSubmit={(e) => e.preventDefault()}>
					<InputContainer>
						{/* icon */}
						<img
							src="../static/images/magnifying-glass.png"
							alt=""
							width="23"
							height="23"
							style={{ marginLeft: 16, marginRight: 16 }}
						/>
						<FormInput
							type="text"
							value={searchWord}
							placeholder="Ask a question..."
							onChange={(e) => setSearchWord(e.target.value)}
						/>
					</InputContainer>
					<FormButton type="submit">Search</FormButton>
				</SearchForm>
			</HeroContainer>

			<ListContainer clicked={clicked}>
				{List.filter((filtered) => {
					if (searchWord == "") {
						return filtered;
					} else if (
						filtered.iconTitle
							.toLowerCase()
							.includes(searchWord.toLowerCase())
					) {
						return filtered;
					}
				}).map((item, index) => {
					return (
						<>
							<Card
								clicked={clicked}
								key={index}
								onClick={() => toggleClick(index)}>
								<CardIcon src={item.icon} />
								<CardTitle>{item.iconTitle}</CardTitle>
							</Card>
							{listDetail === index && (
								<>
									<Left>
										<CardIcon src={item.icon} />
										<LeftCardTitle>
											{item.iconTitle}
										</LeftCardTitle>
										<LeftCardText>
											{item.iconText}
										</LeftCardText>
										<LeftButton onClick={toggleClick}>
											Back to List
										</LeftButton>
									</Left>
									<Right>
										<StyledAccordion allowZeroExpanded>
											{item.accordion.map((items) => (
												<AccordionStyledItem
													key={items.uuid}>
													<AccordionItemHeading>
														<AccordionButton>
															{items.heading}
															<AccordionItemState>
																{({
																	expanded,
																}) =>
																	expanded ? (
																		<FontAwesomeIcon
																			icon={
																				faTimes
																			}
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
																	)
																}
															</AccordionItemState>
														</AccordionButton>
													</AccordionItemHeading>
													<AccordionPanel>
														{items.belowHeading}
													</AccordionPanel>
												</AccordionStyledItem>
											))}
										</StyledAccordion>
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
						<h1>Still have a question?</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua
						</p>
						<a
							href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree"
							target="_blank">
							<button>Contact Us</button>
						</a>
					</center>
				</QuestionInner>
			</QuestionContainer>
			<Footer />
			<style jsx global>{`
				.accordion {
					border: none;
				}
			`}</style>
		</>
	);
};

const HeroContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 289px;
	width: 100%;
	background-image: url("../static/images/batik-world-map-faq-page.png");
	background-color: #1e345b;
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
`;
const SearchForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 48px;
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
`;

const ListContainer = styled.div`
	display: ${(props) => (props.clicked ? "flex" : "grid")};
	grid-template-columns: repeat(auto-fill, 243px);
	/* grid-template-columns: repeat(auto-fill, minmax(186px, 1fr)); */
	justify-content: center;
	grid-column-gap: 24px;
	grid-row-gap: 40px;
	padding: ${(props) => (props.clicked ? "64px 108px" : "80px 108px")};
	background: #fff;
`;

const Left = styled.div`
	width: 392px;
	display: flex;
	flex-direction: column;
	margin-right: 128px;
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
`;

const StyledAccordion = styled(Accordion)``;

const AccordionStyledItem = styled(AccordionItem)`
	background: #ffffff;
	/* UI/Info */
	border: 2px solid #e9e9e9;
	box-shadow: 0px 18px 50px rgba(98, 107, 121, 0.15);
	border-radius: 4px;
	padding: 24px 16px 24px 24px;
	min-width: 560px;
	margin-bottom: 16px;
	transition: 0.1s all ease-in;

	&:hover {
		transform: scale(1.03);
	}
`;

const AccordionButton = styled(AccordionItemButton)`
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

const AccordionPanel = styled(AccordionItemPanel)`
	margin-top: 16px;
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;
	max-width: 500px;
	/* Neutral/Secondary Text */
	color: #626b79;
	animation: ${FadeIn} 0.35s ease-in;
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
	min-height: 248px;
	background: #f3f5f7;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		&&& {
			font-weight: bold;
			font-size: 32px;
			line-height: 40px;

			/* identical to box height, or 125% */
			display: flex;
			align-items: center;

			/* Neutral/Primary Text */
			color: #232933;
		}
		margin: 0;
	}

	p {
		&&& {
			font-weight: normal;
			font-size: 16px;
			line-height: 24px;

			/* or 150% */
			text-align: center;

			/* Neutral/ Slate */
			color: #626b79;
			margin: 0;
		}
	}

	button {
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
	}
`;

const QuestionInner = styled.div`
	max-width: 700px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 40px auto;
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
	return {};
};

export default connect(mapStateToProps, actions)(FAQ);
