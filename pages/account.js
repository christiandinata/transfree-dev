import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Link from 'next/link';
import AccountLayout from '../components/AccountLayout';
import NumberFormat from 'react-number-format';
import styled from "styled-components";
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';
import moment from 'moment';

//Setelah diapprove
const ApprovedLayout = () => {
  return (
    <div className="content">
      <div className="big-icon">
        <img src="../static/images/happy.svg" alt="Happy"/>
      </div>
      <h1>No transactions</h1>
      <p>You haven’t sent money using Transfree. Get started now and enjoy fast and cheap international money transfer. </p>

      <Link href="/order">
        <a className="btn-primary">Send money now</a>
      </Link>
      <style jsx>{`
        .logo {
          width: 100%;
          text-align: center;
        }
        .big-icon img {
          height: 300px;
          margin: 0px auto 50px;
        }

        p {
          max-width: 600px;
          text-align: center;
          margin-bottom: 10px;
        }

        h1 {
          margin: 0;
        }

        .content {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          margin-top:30px;
        }
      `}</style>
    </div>
  )

}

//Waiting Approve
const PendingLayout = () => {
  return (
    <div className="content">
      <div className="big-icon">
        <img src="../static/images/document.svg" alt="Document"/>
      </div>
      <h1>Awaiting confirmation</h1>
      <p>We are now reviewing your account details. We will send you an email & WhatsApp message once the verification process is completed.</p>
      <p>Please contact us by email (admin@transfree.id) or WhatsApp (+44 7490 090659) for faster process.</p>
      <style jsx>{`
        .logo {
          width: 100%;
          text-align: center;
        }
        .big-icon img {
          margin: 50px auto;
        }
        p {
          max-width: 600px;
          text-align: justify;
          margin-bottom: 10px;
        }
        h1 {
          margin: 0;
        }
        .content {
          display: flex;
          flex-direction: column;
          min-height: 70vh;
          align-items: center;
          justify-content: center;
          margin-top:30px;
          padding:15px;
        }
      `}</style>
    </div>
  )
}


const ContainerFluid = styled.div`
  min-height: 100vh;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 40px;
  padding-bottom: 20px;
`;

const ContentContainer = styled.div`
  margin-top: 10px;
`;

const BackgroundContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 290px;
  background: #1E345B;
  position: relative;
  text-align: center;

  >.image{
    width: 100%;
    height: 290px;
    object-fit: cover;
    object-position: bottom;
  }

  >.title{
    size: 40px;
    color: white;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  // flex-direction: column;

  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SearchBar = styled.input`
  // position: absolute;
  // top: 70%;
  // left: 40%;
  // transform: translate(-50%, -50%);
  font-size: 16px;

  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  border-radius: 4px;
  height: 48px;
  padding-left: 50px;
  width: 350px;

  background-image: url('../static/images/Asset Web/transaction/search.svg');
  background-position: 12px 13px;
  background-repeat: no-repeat;
`;

const Button = styled.button`
  // position: absolute;
  // top: 70%;
  // left: 65%;
  // transform: translate(-50%, -50%);

  border: 1px solid #009FE3;
  border-radius: 4px;

  width: 184px;
  height: 50px;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  margin-bottom: 10px;
  transition: 0.2s;

  background-color: #009FE3;
  color: white;
`;

const AllItemContainer = styled.div`
  max-width: 1020px;
  height: auto;
  margin: 20px auto;

  @media only screen and (max-width: 800px) {
    padding: 0px 10px 0px 10px;
  }
`;

const ItemContainer = styled.div`
  background: white;
  padding: 20px 40px 20px 40px ;
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  cursor: pointer;

  transition: 0.4s;

  &:hover{
    box-shadow: 0px 18px 50px rgba(98, 107, 121, 0.15);
  }

  ${({ open }) => open && `
    box-shadow: 0px 18px 50px rgba(98, 107, 121, 0.15);
    border-color: #009FE3;
  `}

  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
  
`;

const ItemRow = styled.div`
  display: flex;
  padding: 2.5px 0px 2.5px;
`;

const ItemColumn = styled.span`
  flex-basis: ${props => props.left ? '60%' : '40%'};
  text-align: ${props => props.left ? 'left' : 'right'};
  font-size: ${props => props.left ? '16px' : '20px'};
  padding-top: ${props => props.left ? '2.5px' : '0px'};
`;

const Date = styled.span`
  >.processing{
    color: #FF9800;
  }

  >.completed{
    color: #00A000;
  }
`;

const ItemDetail = styled.div`
  height: 0;
  overflow: hidden;
  text-align: left;
  transition: all 0.5s ease-in-out;

  ${({ open }) => open && `
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

  >.smallBullet{
    width: 8px;
    height: 8px;
    background: #626B79;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ blue }) => blue && `
    >.smallBullet{
      background: #009FE3;
    }
  `}
`;

const Divider = styled.div`
  height: 40px;
  width: 2px;
  margin: -10px 11px -5px;
  background: #F2F4F7;
`;

const ListItem = styled.li`
  list-style: none;
  line-height: 1px;
  padding-left: 4px;

  >.textItem{
    font-size: 14px;
    display: inline-block;
    margin-left: 20px;
  }

  @media only screen and (max-width: 400px) {
    >.textItem{
      font-size: 12.5px;
      margin-left: 10px;
    }
  }
`;

class OrderItem extends React.Component {
  constructor({props}) {
    super(props);
    this.state = {
      key: null
    }
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail(key) {
    if(this.state.key == key) {
      this.setState({
        key: null
      });
    } else {
      this.setState({
        key: key
      });
    }
  }

  render() {
    return (
      this.props.ordersList.map((order, key) => {
        return (
          <div>
            <ItemContainer key={key} open={this.state.key == key} onClick={()=>this.toggleDetail(key)}>
              <ItemRow>
                <ItemColumn left>
                  Transfer to <span style={{fontWeight: "bolder"}}>{order.name}</span>
                </ItemColumn>
                <ItemColumn right>
                  <NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={order.fromAmount} /> {order.fromCurrency.toUpperCase()}
                </ItemColumn>
              </ItemRow>
              <ItemRow>
                <ItemColumn left>
                  <Date>
                    <span className={order.completedAt == 0.0 ? 'processing' : 'completed'}>
                      {order.completedAt == 0.0 ? 'Processing' : 'Completed on '+moment(order.completedAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </Date>
                </ItemColumn>
                <ItemColumn right>
                  <span className="bold"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={order.toAmount} /> {order.toCurrency.toUpperCase()}</span>
                </ItemColumn>
              </ItemRow>
              <ItemDetail open={this.state.key == key}>
                <ListItem>
                  <Bullet blue={true}><div className="smallBullet"/></Bullet>
                  <p className="textItem">
                    Created on <span style={{fontWeight: "bolder"}}>{moment(order.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                  </p>
                </ListItem>
                <Divider/>
                <ListItem>
                  <Bullet blue={moment(moment().format("DD/MM/YYYY HH:mm")).isAfter(moment(order.createdAt).add('hours', 1).format("DD/MM/YYYY HH:mm")) || order.receivedAt != 0.0}><div className="smallBullet"/></Bullet>
                  <p className="textItem">
                    {(moment(moment().format("DD/MM/YYYY HH:mm"))
                    .isAfter
                    (moment(order.createdAt).add('hours', 1).format("DD/MM/YYYY HH:mm")) )
                    ||
                    (order.receivedAt != 0.0)
                    ?
                    ('We are processing your ' + order.toCurrency.toUpperCase() +' booking')
                    :
                    ('We are waiting to process your ' + order.toCurrency.toUpperCase() +' booking') }
                  </p>
                </ListItem>
                <Divider/>
                <ListItem>
                  <Bullet blue={order.completedAt != 0.0}><div className="smallBullet"/></Bullet>
                  <p className="textItem">
                    {order.completedAt == 0.0 ? ('We will complete your transfer') :  ('Completed on ')}
                    {order.completedAt == 0.0 ? '' : <span style={{fontWeight: "bolder"}}>{moment(order.completedAt).format("DD/MM/YYYY HH:mm")}</span>}
                  </p>
                </ListItem>
              </ItemDetail>
            </ItemContainer>
          </div>
        )
      })
    )
  }
}

//Account Layout
class Account extends React.Component {
  constructor({props}) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    await ctx.store.dispatch(actions.getOrderByUid(getCookie('_id', ctx.req),'getOrderByUid',ctx.req));
    return {};
  };

  renderContent() {
    if(this.props.isApproved) {
      if(this.props.orderArray.length > 0) {
        return <OrderItem ordersList={this.props.orderArray}/>
      } else {
        return <ApprovedLayout />
      }
    } else {
      return <PendingLayout />
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <ContainerFluid>
          <BackgroundContainer>
            <img className="image" src = '../static/images/Asset Web/transaction/Batik_World_Map_cut.png'/>
            <h1 className="title">History Transactions</h1>
            <SearchContainer>
              <SearchBar type="text" placeholder="Search transactions"/>
              <Button>Search</Button>
            </SearchContainer>
          </BackgroundContainer>
          <ContentContainer>
            <AllItemContainer>
              {this.renderContent()}
            </AllItemContainer>          
          </ContentContainer>
        </ContainerFluid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isApproved: !!state.user.user_data.isApproved,
    userData: state.user.user_data,
    orderArray: state.order.orders
  }
}

export default connect(mapStateToProps, actions)(Account);
