import Header from "../../components/header";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { connect } from "react-redux";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions";
import { getCookie } from "../../utils/cookie";
import { AwaitingConfirmation } from "../../components/order/Pending";
import {
	EmptyTransaction,
	EmptySearch,
} from "../../components/transactions/EmptyTransaction";
import { NavBarWhite } from "../../components/MenuComponents";
import Menu from "../../components/menu.js";
import Footer from "../../components/footer";
import moment from "moment";

const ContainerFluid = styled.div`
	min-height: 100vh;
	align-items: center;
	margin-top: -20px;
	margin-bottom: 40px;
	padding-bottom: 20px;
	background: white;
`;

const ContentContainer = styled.div`
	margin: 10px;
`;

const BackgroundContainer = styled.div`
	margin-top: 73px;
	width: 100%;
	height: 290px;
	background: #1e345b;
	position: relative;
	text-align: center;

	> .image {
		width: 100%;
		height: 290px;
		object-fit: cover;
		object-position: bottom;
	}

	> .title {
		font-size: 40px;
		color: white;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		line-height: 55px;
	}

	@media only screen and (max-width: 768px) {
		> .title {
			min-width: 400px;
			font-size: 32px;
		}

		> .image {
			display: none;
		}
	}
`;

const SearchContainer = styled.div`
	display: flex;
	width: 600px;
	justify-content: center;

	position: absolute;
	top: 65%;
	left: 50%;
	transform: translate(-50%, -35%);

	@media only screen and (max-width: 640px) {
		width: auto;
		margin-left: 2px;
	}
`;

const SearchBar = styled.input`
	font-size: 16px;
	background: #ffffff;
	border: 1px solid #e2e2e2;
	border-radius: 4px;

	flex-basis: 70%;
	height: 42px;
	padding-left: 50px;
	margin-right: 20px;

	background-image: url("../static/images/Asset Web/transaction/search.svg");
	background-position: 12px 10px;
	background-repeat: no-repeat;

	transition: all 0.3s linear;

	::placeholder {
		color: #232933;
	}

	&:focus {
		box-shadow: 0 0 0 2px #068ec8;
		outline: none;
		background-image: url("../static/images/Asset Web/transaction/search-blue.svg");
	}

	@media only screen and (max-width: 640px) {
		margin-right: 8px;
	}
`;

const Button = styled.button`
	border: 1px solid #009fe3;
	border-radius: 4px;

	height: 45px;
	font-size: 16px;
	flex-basis: 30%;

	align-items: center;
	padding: 8px 24px;
	margin-bottom: 10px;
	transition: 0.2s;

	background-color: #009fe3;
	color: white;
`;

const AllItemContainer = styled.div`
	max-width: 1020px;
	height: auto;
	margin: 20px auto;
`;

const ItemContainer = styled.div`
	background: white;
	padding: 20px 40px 20px 40px;
	border: 1px solid #e9e9e9;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
	cursor: pointer;

	transition: 0.4s;

	&:hover {
		box-shadow: 0px 18px 50px rgba(98, 107, 121, 0.15);
	}

	${({ open }) =>
		open &&
		`
    box-shadow: 0px 18px 50px rgba(98, 107, 121, 0.15);
    border-color: #009FE3;
  `}

	@media only screen and (max-width: 768px) {
		padding: 15px;
	}
`;

const ItemRow = styled.div`
	display: flex;
	padding: 2.5px 0px 2.5px;
`;

const ItemColumn = styled.span`
	flex-basis: ${(props) => (props.left ? "50%" : "50%")};
	text-align: ${(props) => (props.left ? "left" : "right")};
	font-size: ${(props) => (props.left ? "16px" : "20px")};
	padding-top: ${(props) => (props.left ? "2.5px" : "0px")};
`;

const Date = styled.span`
	> .processing {
		color: #ff9800;
	}

	> .completed {
		color: #00a000;
	}

	> .canceled {
		color: #ff0000;
	}
`;

const ItemDetail = styled.div`
	height: 0;
	overflow: hidden;
	text-align: left;
	transition: all 0.5s ease-in-out;

	${({ open }) =>
		open &&
		`
    height: auto;
    margin-top: 25px;
    margin-bottom: 10px;
  `}
`;

const Bullet = styled.div`
	border-radius: 50%;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	width: 16px;
	height: 16px;
	display: inline-block;
	position: relative;

	> .smallBullet {
		width: 8px;
		height: 8px;
		background: #626b79;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	${({ blue }) =>
		blue &&
		`
    >.smallBullet{
      background: #009FE3;
    }
  `}
`;

const Divider = styled.div`
	height: 40px;
	width: 2px;
	margin: -10px 11px -5px;
	background: #f2f4f7;

	@media only screen and (max-width: 768px) {
		margin-left: 9px;
	}

	${({ hide }) =>
		hide &&
		`
    display: none;
  `}
`;

const ListItem = styled.li`
	list-style: none;
	line-height: 1px;
	padding-left: 4px;

	> .textItem {
		font-size: 14px;
		display: inline-block;
		margin-left: 20px;
	}

	@media only screen and (max-width: 768px) {
		padding-left: 2px;

		> .textItem {
			font-size: 13.5px;
			margin-left: 10px;
			margin-right: -5px;
		}
	}

	${({ hide }) =>
		hide &&
		`
    display: none;
  `}
`;

/* Displays order item list and each details */
class OrderItem extends React.Component {
	constructor({ props }) {
		super(props);
		this.state = {
			key: null,
		};
		this.toggleDetail = this.toggleDetail.bind(this);
	}

	toggleDetail(key) {
		if (this.state.key == key) {
			this.setState({
				key: null,
			});
		} else {
			this.setState({
				key: key,
			});
		}
	}

	render() {
		return this.props.ordersList.map((order, key) => {
			return (
				<div>
					<ItemContainer
						key={key}
						open={this.state.key == key}
						onClick={() => this.toggleDetail(key)}>
						<ItemRow>
							<ItemColumn left>
								Transfer to{" "}
								<span style={{ fontWeight: "bolder" }}>
									{order.name}
								</span>
							</ItemColumn>
							<ItemColumn right>
								<NumberFormat
									displayType={"text"}
									thousandSeparator={true}
									decimalScale={2}
									value={order.fromAmount}
								/>{" "}
								{order.fromCurrency.toUpperCase()}
							</ItemColumn>
						</ItemRow>
						<ItemRow>
							<ItemColumn left>
								<Date>
									<span
										className={
											order.canceledAt
												? "canceled"
												: order.completedAt == 0.0
												? "processing"
												: "completed"
										}>
										{order.canceledAt
											? "Canceled on " +
											  moment(order.canceledAt).format(
													"DD/MM/YYYY HH:mm"
											  )
											: order.completedAt == 0.0
											? "Processing"
											: "Completed on " +
											  moment(order.completedAt).format(
													"DD/MM/YYYY HH:mm"
											  )}
									</span>
								</Date>
							</ItemColumn>
							<ItemColumn right>
								<span className="bold">
									<NumberFormat
										displayType={"text"}
										thousandSeparator={true}
										decimalScale={2}
										value={order.toAmount}
									/>{" "}
									{order.toCurrency.toUpperCase()}
								</span>
							</ItemColumn>
						</ItemRow>
						<ItemDetail open={this.state.key == key}>
							<ListItem>
								<Bullet blue={true}>
									<div className="smallBullet" />
								</Bullet>
								<p className="textItem">
									Created on{" "}
									<span style={{ fontWeight: "bolder" }}>
										{moment(order.createdAt).format(
											"DD/MM/YYYY HH:mm"
										)}
									</span>
								</p>
							</ListItem>
							<Divider />
							<ListItem>
								<Bullet
									blue={
										moment(
											moment().format("DD/MM/YYYY HH:mm")
										).isAfter(
											moment(order.createdAt)
												.add("hours", 1)
												.format("DD/MM/YYYY HH:mm")
										) ||
										order.receivedAt != 0.0 ||
										order.canceledAt
									}>
									<div className="smallBullet" />
								</Bullet>
								<p className="textItem">
									{moment(
										moment().format("DD/MM/YYYY HH:mm")
									).isAfter(
										moment(order.createdAt)
											.add("hours", 1)
											.format("DD/MM/YYYY HH:mm")
									) || order.receivedAt != 0.0
										? "We are processing your " +
										  order.toCurrency.toUpperCase() +
										  " booking"
										: order.canceledAt
										? "Canceled on " +
										  moment(order.canceledAt).format(
												"DD/MM/YYYY HH:mm"
										  )
										: "We are waiting to process your " +
										  order.toCurrency.toUpperCase() +
										  " booking"}
								</p>
							</ListItem>
							<Divider
								hide={
									order.canceledAt &&
									!(
										moment(
											moment().format("DD/MM/YYYY HH:mm")
										).isAfter(
											moment(order.createdAt)
												.add("hours", 1)
												.format("DD/MM/YYYY HH:mm")
										) || order.receivedAt != 0
									)
								}
							/>
							<ListItem
								hide={
									order.canceledAt &&
									!(
										moment(
											moment().format("DD/MM/YYYY HH:mm")
										).isAfter(
											moment(order.createdAt)
												.add("hours", 1)
												.format("DD/MM/YYYY HH:mm")
										) || order.receivedAt != 0
									)
								}>
								<Bullet
									blue={
										order.completedAt != 0.0 ||
										order.canceledAt
									}>
									<div className="smallBullet" />
								</Bullet>
								<p className="textItem">
									{order.canceledAt
										? "Canceled on "
										: order.completedAt == 0.0
										? "We will complete your transfer"
										: "Completed on "}
									{order.canceledAt ? (
										<span style={{ fontWeight: "bolder" }}>
											{moment(order.canceledAt).format(
												"DD/MM/YYYY HH:mm"
											)}{" "}
										</span>
									) : order.completedAt == 0.0 ? (
										""
									) : (
										<span style={{ fontWeight: "bolder" }}>
											{moment(order.completedAt).format(
												"DD/MM/YYYY HH:mm"
											)}
										</span>
									)}
								</p>
							</ListItem>
						</ItemDetail>
					</ItemContainer>
				</div>
			);
		});
	}
}

/* Account transaction icludes header, searchbar, and order list */
class Account extends React.Component {
	constructor({ props }) {
		super(props);
		this.state = {
			orders: undefined,
		};

		this.searchInput = React.createRef();
		this.resetTransaction = this.resetTransaction.bind(this);
	}

	static async getInitialProps(ctx) {
		initialize(ctx);
		await ctx.store.dispatch(
			actions.getUser(getCookie("_id", ctx.req), "user", ctx.req)
		);
		await ctx.store.dispatch(
			actions.getOrderByUid(
				getCookie("_id", ctx.req),
				"getOrderByUid",
				ctx.req
			)
		);
		return {};
	}

	componentDidMount() {
		this.setState({ orders: this.props.orderArray });
	}

	navbarTransaction() {
		return (
			// <NavBarWhite
			//   isAuthenticated={true}
			//   username={this.props.username}
			//   id={this.props.id}
			//   current={"transactions"}/>
			<Menu
				isAuthenticated={true}
				username={this.props.username}
				id={this.props.id}
				scrolled_props="true"
				is_homepage="false"
				current={"transactions"}
			/>
		);
	}

	/* Resets transaction order items (display all order items after search)*/
	resetTransaction() {
		if (this.searchInput.current.value == "") {
			this.setState({ orders: this.props.orderArray });
		}
	}

	/* Function to search transaction from order name or order clompeted date */
	searchTransaction() {
		let searchResult = [];
		let words = this.searchInput.current.value.toLowerCase().split(" ");
		for (const order in this.props.orderArray) {
			let count = 0;
			for (const word in words) {
				if (
					this.props.orderArray[order].name
						.toLowerCase()
						.indexOf(words[word]) > -1 ||
					this.props.orderArray[order].toCurrency
						.toLowerCase()
						.indexOf(words[word]) > -1 ||
					this.props.orderArray[order].fromCurrency
						.toLowerCase()
						.indexOf(words[word]) > -1 ||
					String(this.props.orderArray[order].fromAmount).indexOf(
						words[word]
					) > -1 ||
					String(this.props.orderArray[order].toAmount).indexOf(
						words[word]
					) > -1 ||
					moment(this.props.orderArray[order].completedAt)
						.format("DD/MM/YYYY HH:mm")
						.indexOf(words[word]) > -1 ||
					(this.props.orderArray[order].canceledAt &&
						moment(this.props.orderArray[order].canceledAt)
							.format("DD/MM/YYYY HH:mm")
							.indexOf(words[word]) > -1) ||
					("processing".indexOf(words[word]) > -1 &&
						this.props.orderArray[order].completedAt == 0 &&
						!this.props.orderArray[order].canceledAt) ||
					("completed".indexOf(words[word]) > -1 &&
						this.props.orderArray[order].completedAt > 0 &&
						!this.props.orderArray[order].canceledAt) ||
					("canceled".indexOf(words[word]) > -1 &&
						this.props.orderArray[order].canceledAt)
				) {
					count++;
				} else {
					break;
				}
			}
			if (count == words.length) {
				searchResult.push(this.props.orderArray[order]);
			}
		}
		this.setState({ orders: searchResult });
	}

	/* Header includes banner and searchbar */
	headerTransaction() {
		return (
			<BackgroundContainer>
				<img
					className="image"
					src="../static/images/Asset Web/transaction/Batik_World_Map_cut.png"
				/>
				<h1 className="title">History Transactions</h1>
				<SearchContainer>
					<SearchBar
						type="text"
						ref={this.searchInput}
						onChange={this.resetTransaction}
						placeholder="Search transactions..."
					/>
					<Button onClick={() => this.searchTransaction()}>
						Search
					</Button>
				</SearchContainer>
			</BackgroundContainer>
		);
	}

	/* Render page content based on condition */
	renderContent() {
		if (this.props.isApproved) {
			// Account has been approved
			if (this.props.orderArray.length > 0) {
				// Transaction is not empty
				return (
					<div>
						{this.navbarTransaction()}
						{this.headerTransaction()}
						<ContentContainer>
							<AllItemContainer>
								<div
									style={{
										display:
											this.state.orders.length == 0
												? "block"
												: "none",
									}}>
									<EmptySearch
										style={{
											display:
												this.state.orders.length == 0
													? "block"
													: "none",
										}}
									/>
								</div>
								<OrderItem ordersList={this.state.orders} />
							</AllItemContainer>
						</ContentContainer>
						<Footer />
					</div>
				);
			} else {
				return (
					<div>
						{this.navbarTransaction()}
						{this.headerTransaction()}
						<EmptyTransaction />
						<Footer />
					</div>
				);
			}
		} else {
			return (
				<div>
					{this.navbarTransaction()}
					<AwaitingConfirmation />
					<Footer />
				</div>
			);
		}
	}

	render() {
		if (this.state.orders != undefined) {
			return (
				<div>
					<Header />
					<ContainerFluid>{this.renderContent()}</ContainerFluid>
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isApproved: !!state.user.user_data.isApproved,
		userData: state.user.user_data,
		orderArray: state.order.orders,
		username: state.user.user_data ? state.user.user_data.fullname : "",
		id: state.user.user_data ? state.user.user_data.idNumber : "",
	};
};

export default connect(mapStateToProps, actions)(Account);
