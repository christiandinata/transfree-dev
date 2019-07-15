import Link from 'next/link';
import NumberFormat from 'react-number-format';

function BankOption(props) {
  return (
    <div>
      <p className="instruction">Please select the bank below:</p>
      <ul>
        <li onClick={() => props.generateVA('bni')}><img src="../static/images/bank_logos/bni.png"/> <span>Bank BNI</span></li>
        <li onClick={() => props.generateVA('mandiri')}><img src="../static/images/bank_logos/mandiri.png"/> <span>Bank Mandiri</span></li>
        <li onClick={() => props.generateVA('maybank')}><img src="../static/images/bank_logos/maybank.png"/> <span>Maybank</span></li>
        <li onClick={() => props.generateVA('permata')}><img src="../static/images/bank_logos/permata.png"/> <span>Permata Bank</span></li>
        <li onClick={() => props.generateVA('sinarmas')}><img src="../static/images/bank_logos/sinarmas.png"/> <span>Bank Sinarmas</span></li>
      </ul>
      <style jsx>{`
        p {
          text-align: center;
        }
        ul {
          padding: 0;
          list-style: none;
        }

        ul li img {
          max-width: 80px;
          margin-bottom: -3px;
          margin-right: 15px;
        }

        ul li {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eaeaea;
          padding: 15px;
          transition: all 0.2s ease;

        }

        ul li:hover {
          cursor: pointer;
          background-color: #F6F8FB;
        }

        ul li a {
          color: #15233C;
        }

        `}</style>
    </div>
  )
}

function VAGenerated(props) {
  return (
    <div>
      <p className="instruction">Please make a payment to this following Virtual Account (VA) number:</p>
      <div className="payment-details">
        <div className="list-item">
          <span className="left">VA Number:</span>
          <span className="right bold">{props.vaNumber}</span>
          <p>Please follow instruction on how to transfer money into virtual account according to your bank.</p>
        </div>
      </div>
      <style jsx>{`
        .list-item {
          display: flex;
          width: 100%;
          margin: 10px 0;
        }

        .list-item span {
          flex-basis: 50%;
        }

        .list-item .right {
          text-align: right;
          color: #15233C;
        }

        .payment-details {
          background-color: #EBF6FB;
          padding: 10px 20px;
          margin: 30px 0;
          border-radius: 8px;
        }

        .bold {
          font-family: "Campton-Bold", sans-serif;
        }
        `}</style>
    </div>
  )
}

class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVAgenerated: false
    };

    this.generateVA = this.generateVA.bind(this);
  }
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.addOrder(
      {
        uid: this.props.data.uid,
        rate: this.props.data.rate,
        fromCurrency: this.props.data.fromCurrency,
        toCurrency: this.props.data.toCurrency,
        fromAmount: this.props.data.fromAmount,
        toAmount: this.props.data.toAmount,
        email: this.props.data.email,
        name: this.props.data.name,
        bankName: this.props.data.bankName,
        bankAccountNumber: this.props.data.bankAccountNumber,
        accountNumber: this.props.data.accountNumber,
        sortcode: this.props.data.sortcode,
        iban: this.props.data.iban,
        swift: this.props.data.swift
      },
      'addOrder'
    );
    this.props.nextStep();
  }

  generateVA(bankName) {
    // console.log(bankName);
    this.props.generateVA(bankName);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.data.vaNumber)
    if (this.props.data.vaNumber != prevProps.data.vaNumber) {
      this.setState({
        isVAgenerated: true
      });
    }
  }

  render() {
    let content;

    if (this.state.isVAgenerated) {
      content = <VAGenerated vaNumber={this.props.data.vaNumber}/>;
    } else {
      content = <BankOption generateVA={this.generateVA}/>
    }
    return (
      <div>
        <h1>Payment</h1>
        <form className="form-container">
          <p className="instruction">Payment amount</p>
          <h2><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={this.props.data.fromAmount} /> {this.props.data.fromCurrency.toUpperCase()}</h2>
          {content}
          {/*
            <div className="payment-details">
              <div className="list-item">
                <span className="left">Bank name</span>
                <span className="right">Lloyds Bank</span>
              </div>

              <div className="list-item">
                <span className="left">Sort code</span>
                <span className="right">12-34-56</span>
              </div>

              <div className="list-item">
                <span className="left">Account number</span>
                <span className="right">987654321</span>
              </div>

              <div className="list-item">
                <span className="left">Account name</span>
                <span className="right">Transfree</span>
              </div>
            </div>

            <p>Please check all of the details above are correct to speed up the process.
            Once you have made a payment, please confirm by clicking the button below.
            We will notify you via email and WhatsApp once your payment has been confirmed.</p>

            <Link href="">
              <a className="btn-primary" onClick={this.saveAndContinue}>I have made a transfer</a>
            </Link>
            <Link href="/">
              <a className="btn-danger">Cancel this transaction</a>
            </Link>
            */}
        </form>
        <style jsx>{`
          .instruction {
            text-align: center;
            max-width: 60%;
            margin: 0 auto;
          }

          .btn-danger {
            background: transparent;
            border: 2px solid #DC2020;
            color: #DC2020;
            padding: 8px 18px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            border-radius: 4px;
            transition: 0.2s;
            width: 100%;
            padding: 15px 0;
            margin-top: 15px;
          }

          .btn-danger:hover {
            transform: translateY(-1px);
          }

        `}</style>
      </div>
    )
  }
}

export default Pay
