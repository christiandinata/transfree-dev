import Link from 'next/link';
import ReactGA from 'react-ga';

export const InitGA = ( ) => {
  console.log('GA init')
  ReactGA.initialize('UA-152856412-1');
}

export const logPageView = () => {
  ReactGA.set({page: window.location.pathname})
  ReactGA.pageview(window.location.pathname)
}

class Status extends React.Component {
  componentWillMount() {
    this.props.addOrder();
  }
  componentDidMount(){
    InitGA()
    logPageView()
  }
  render() {
    return (
      <div>
        <div className="content">
          <div className="big-icon">
            <img src="../static/images/checked.png"/>
          </div>
          <h1>Awaiting Payment confirmation</h1>
          <p>Thank you, we are now reviewing your order details. We will send you an email regarding your payment instruction. Please check your email.</p>

          <Link href="/account">
            <a className="btn-primary">Back to my account</a>
          </Link>
        </div>

        <style jsx>{`
          .container-fluid {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            align-items: center;
          }

          .content img {
            width: 35%;
            margin-bottom: 20px !important;

          }

          p{
            margin : 0px 0px 40px 0px !important;
          }

          h1 {
            margin: 0;
            text-align: center;
          }

          li {
            font-family: "Campton-Book", sans-serif;
          }

          // Progress Bar
          .header-progress-container {
            width: 550px;
            padding: 30px 10px 0;
            margin: 50px auto;
          }

          .header-progress-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          .header-progress-item {
            position: relative;
            display: inline-block;
            width: 135px;
            text-align: center;
            line-height: 3em;
          }
            //Lines
          .header-progress-item:after {
            position: absolute;
            display: block;
            z-index: 1;
            top: -2px;
            left: -65px;
            height: 2px;
            width: 135px;
            content: "";
            background-color: #469DDD;
          }

          // Bullets/Balls
          .header-progress-item:before {
            position: absolute;
            z-index: 2;
            top: -6px;
            left: 65px;
            height: 10px;
            width: 10px;
            border-radius: 1.2em;
            border: none;
            line-height: 1.2em;
            content: " ";
            background-color: #469DDD;
          }

          .header-progress-item:first-child:after {
            display: none;
          }

          .header-progress-item.done {
            color: #469DDD;
          }

          .header-progress-item.todo {
            color: #DDDADD;
          }

          //Lines
          .header-progress-item.todo:after {
            background: #F1F1F1;
          }

          // Bullets/Balls
          .header-progress-item.todo:before {
            background-color: #DADADA;
          }

          p {
            max-width: 600px;
            text-align: center;
          }

          h1 {
            margin: 0;
          }

          .content {
            text-align: center;
          }



        `}</style>
      </div>
    )
  }
}

export default Status
