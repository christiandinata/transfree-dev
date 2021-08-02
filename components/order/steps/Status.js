import styled from "styled-components";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { getCookie } from "../../../utils/cookie";

const ContentContainer = styled.div`
	padding: 0px 20px 0px 20px;
	align-items: center;
	text-align: center;
	display: flex;
	flex-direction: column;
	max-width: 600px;

	p {
		text-align: center;
		margin-top: -10px;
		margin-bottom: 35px;
	}

	h2 {
		font-size: 32px;
	}
`;

const IconContainer = styled.div`
	margin-top: 30px;
	margin-bottom: -20px;

	> .icon {
		max-width: 96px;
	}
`;

const Button = styled.button`
	border: 1px solid #009fe3;
	border-radius: 4px;

	max-width: 212px;
	height: 40px;
	font-size: 16px;

	left: 50%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 24px;
	margin-bottom: 10px;
	transition: 0.2s;

	background-color: ${(props) => (props.secondary ? "white" : "#009FE3")};
	color: ${(props) => (props.secondary ? "#009FE3" : "white")};
`;

function StatusTemplate(props) {
	return (
		<div>
			<ContentContainer>
				<IconContainer>
					<img className="icon" src={props.icon} alt="checked" />
				</IconContainer>
				<h2>{props.title}</h2>
				<p>{props.desc}</p>

				<Button
					onClick={(e) => {
						e.preventDefault();
						window.location.href = props.buttonAction;
					}}>
					{props.buttonText}
				</Button>
			</ContentContainer>
		</div>
	);
}

class Status extends React.Component {
	constructor({ props }) {
		super(props);
		this.state = {
			finish: false,
		};
		this.timer = this.timer.bind(this);
	}

	timer() {
		this.props.getOrderByUid(getCookie("_id", null), "getOrderByUid", null);

		if (this.props.orderArray) {
			if (this.props.orderArray[0].receivedAt > 0) {
				this.setState({ finish: true });
				clearInterval(this.intervalId);
			}
		}
	}

	componentDidMount() {
		this.props.getOrderByUid(getCookie("_id", null), "getOrderByUid", null);
		this.intervalId = setInterval(this.timer.bind(this), 15000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	render() {
		return !this.state.finish ? (
			<div>
				<StatusTemplate
					icon={"../static/images/Asset Web/send money/ic-check.svg"}
					title={"Awaiting Payment Confirmation"}
					desc={
						"Thank you, we are now reviewing your order details. We will send you an email regarding your payment instruction. Please check your email."
					}
					buttonAction={"/user/account"}
					buttonText={"Check Transactions"}
				/>
			</div>
		) : (
			<div>
				<StatusTemplate
					icon={
						"../static/images/Asset Web/send money/ic-check-green.svg"
					}
					title={"Transaction Success"}
					desc={
						"Thank you lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
					}
					buttonAction={"/user/home"}
					buttonText={"Back to Homepage"}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		orderArray: state.order.orders,
	};
};

export default connect(mapStateToProps, actions)(Status);
