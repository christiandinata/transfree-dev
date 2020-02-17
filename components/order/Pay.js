import Link from 'next/link';
import NumberFormat from 'react-number-format';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

function BankOption(props) {
  return (
    <div>
      {/*
       <a style={{paddingTop: "9.5px",paddingBottom: "9.5px"}} className="btn-primary"  href="https://www.transfree.co.uk/" target="_blank">Pay your transfer</a>
      */}
      <p className="instruction">Please select the bank below:</p>
      <ul>
        {
        // <li onClick={() => props.generateVA('bni')}><img src="../static/images/bank_logos/bni.png"/> <span>Bank BNI</span></li>
        // <li onClick={() => props.generateVA('mandiri')}><img src="../static/images/bank_logos/mandiri.png"/> <span>Bank Mandiri</span></li>
        // <li onClick={() => props.generateVA('maybank')}><img src="../static/images/bank_logos/maybank.png"/> <span>Maybank</span></li>
        // <li onClick={() => props.generateVA('permata')}><img src="../static/images/bank_logos/permata.png"/> <span>Permata Bank</span></li>
        // <li onClick={() => props.generateVA('sinarmas')}><img src="../static/images/bank_logos/sinarmas.png"/> <span>Bank Sinarmas</span></li>
        }
        <li onClick={() => props.transferBankBNI('bni')}><img src="../static/images/bank_logos/bni.png"/> <span>Bank BNI</span></li>
        <li onClick={() => props.transferBankBCA('bca')}><img src="../static/images/bank_logos/bca.png"/> <span>Bank BCA</span></li>
        <li onClick={() => props.transferBankMandiri('mandiri')}><img src="../static/images/bank_logos/mandiri.png"/> <span>Bank Mandiri</span></li>
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

function EmailInstruction(props) {
  return (
    <div>
    {/*
      <p className="instruction">Please check your email below:</p>
      <div className="payment-details">
        <div className="list-item">
          <span className="left">Email:</span>
          <span className="right bold">{props.data.email}</span>
        </div>
      </div>
      */}
      <div className="payment-details">
        <p style={{margin:"0px !important"}}>Transfer Reference 
      <br/>
      "Your last name + Today's date" (E.g. Adi22)
      <br/>
       Note: Please state the reference number that allows us to identify you.
      </p>
      </div>
      <p>We will send payment instruction to your email. Confirm by clicking the button below</p>
      <Accordion>   
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    Is it safe to use Transfree service?
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel id={"isItSafe"}>
                <p>
                  Yes, you are in a trusted company. We are legally incorporated as PT Pelita Transfer Nusantara, office at Innovation Room Kemnaker RI. We are the official partner of Indonesian Community in several countries and collaborating with the governement.
                  <a href="../index#row-footer" target="_blank"> See our Partners & Collaboratos </a>
                </p>
            </AccordionItemPanel>
        </AccordionItem>   
      </Accordion>
      <span style={{marginTop:"30px"}} className="btn-primary" onClick={() => props.addOrder('direct_transfer_via_email')}>Send payment instruction to email</span>
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

        .btn-primary {
          width: 100%;
          padding: 15px 0;
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
        </div>
      </div>
      <p>Please follow the instruction of your bank to transfer money into virtual account number.</p>
      <Accordion>
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    Is it safe to use Transfree service?
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel id={"isItSafe"}>
                <p>
                  Yes, you are in a trusted company. We are legally incorporated as PT Pelita Transfer Nusantara, office at Innovation Room Kemnaker RI. We are the official partner of Indonesian Community in several countries and collaborating with the governement. 
                  <a href="../index#row-footer" target="_blank"> See our Partners & Collaboratos </a>
                </p>
            </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
      <span style={{marginTop:"30px"}} className="btn-primary" onClick={() => props.addOrder('virtual_account')}>Continue</span>
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

function TransferBankBCA(props) {
  return (
    <div>
      <div className="payment-details">
        <div className="list-item">
          <span className="left">Bank name</span>
          <span className="right">BCA</span>
        </div>

        <div className="list-item">
          <span className="left">Account Name</span>
          <span className="right">Pelita Transfer Nusantara</span>
        </div>

        <div className="list-item">
          <span className="left">Account number</span>
          <span className="right">206 37 555 67</span>
        </div>
      </div>
      <div className="payment-details">
        <p style={{margin:"0px !important"}}>Transfer Reference 
      <br/>
      "Your last name + Today's date" (E.g. Adi22)
      <br/>
       Note: Please state the reference number that allows us to identify you.
      </p>
      </div>
      <p>Please check all of the details above are correct to speed up the process.
      We also email you the instruction. We will notify you via email once your payment has been confirmed.</p>

      <Accordion>
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    Is it safe to use Transfree service?
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel id={"isItSafe"}>
                <p>
                  Yes, you are in a trusted company. We are legally incorporated as PT Pelita Transfer Nusantara, office at Innovation Room Kemnaker RI. We are the official partner of Indonesian Community in several countries and collaborating with the governement.
                  <a href="../index#row-footer" target="_blank"> See our Partners & Collaboratos </a>
                </p>
            </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
      <span style={{marginTop:"30px"}} className="btn-primary" onClick={() => props.addOrder('direct_transfer_via_bca')}>Continue</span>
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

        .list-item .left {
          opacity: 0.7;
        }

        .instruction {
          text-align: center;
          max-width: 60%;
          margin: 0 auto;
        }

        h2 {
          width: 100%;
          text-align: center;
        }

        .payment-details {
          background-color: #EBF6FB;
          padding: 10px 20px;
          margin: 30px 0;
          border-radius: 8px;
        }

        .btn-primary {
          width: 100%;
          padding: 15px 0;
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

function TransferBankBNI(props) {
  return (
    <div>
      <div className="payment-details">
        <div className="list-item">
          <span className="left">Bank name</span>
          <span className="right">BNI</span>
        </div>

        <div className="list-item">
          <span className="left">Account Name</span>
          <span className="right">Pelita Transfer Nusantara</span>
        </div>

        <div className="list-item">
          <span className="left">Account number</span>
          <span className="right">07 5555 4711</span>
        </div>
      </div>
      <div className="payment-details">
        <p style={{margin:"0px !important"}}>Transfer Reference 
      <br/>
      "Your last name + Today's date" (E.g. Adi22)
      <br/>
       Note: Please state the reference number that allows us to identify you.
      </p>
      </div>
      <p>Please check all of the details above are correct to speed up the process.
      We also email you the instruction. We will notify you via email once your payment has been confirmed.</p>

      <Accordion>
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    Is it safe to use Transfree service?
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel id={"isItSafe"}>
                <p>
                  Yes, you are in a trusted company. We are legally incorporated as PT Pelita Transfer Nusantara, office at Innovation Room Kemnaker RI. We are the official partner of Indonesian Community in several countries and collaborating with the governement.
                  <a href="../index#row-footer" target="_blank"> See our Partners & Collaboratos </a>
                </p>
            </AccordionItemPanel>
        </AccordionItem>
      </Accordion>    
      <span style={{marginTop:"30px"}} className="btn-primary" onClick={() => props.addOrder('direct_transfer_via_bni')}>Continue</span>
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

        .list-item .left {
          opacity: 0.7;
        }

        .instruction {
          text-align: center;
          max-width: 60%;
          margin: 0 auto;
        }

        h2 {
          width: 100%;
          text-align: center;
        }

        .payment-details {
          background-color: #EBF6FB;
          padding: 10px 20px;
          margin: 30px 0;
          border-radius: 8px;
        }

        .btn-primary {
          width: 100%;
          padding: 15px 0;
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

function TransferBankMandiri(props) {
  return(
    <div>
    <div className="payment-details">
      <div className="list-item">
        <span className="left">Bank name</span>
        <span className="right">Mandiri</span>
      </div>

      <div className="list-item">
        <span className="left">Account Name</span>
        <span className="right">Pelita Transfer Nusantara</span>
      </div>

      <div className="list-item">
          <span className="left">Account number</span>
          <span className="right">122 00 1025188 5</span>
        </div>
    </div>
    <div className="payment-details">
    <p style={{margin:"0px !important"}}>Transfer Reference 
      <br/>
      "Your last name + Today's date" (E.g. Adi22)
      <br/>
      Note: Please state the reference number that allows us to identify you.
      </p>
      </div>
      <p>Please check all of the details above are correct to speed up the process.
      We also email you the instruction. We will notify you via email once your payment has been confirmed.</p>

      
      {/**
      <p>Please check all of the details above are correct to speed up the process.
      We also email you the instruction. We will notify you via email once your payment has been confirmed.</p>
       */}

    <Accordion>  
      <AccordionItem>
        <AccordionItemHeading>
            <AccordionItemButton>
            Is it safe to use Transfree service?
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel id={"isItSafe"}>
                <p>
                  Yes, you are in a trusted company. We are legally incorporated as PT Pelita Transfer Nusantara, office at Innovation Room Kemnaker RI. We are the official partner of Indonesian Community in several countries and collaborating with the governement.
                  <a href="../index#row-footer" target="_blank"> See our Partners & Collaboratos </a>
                </p>
            </AccordionItemPanel>
    </AccordionItem>
</Accordion>
      <span style={{marginTop:"30px"}} className="btn-primary" onClick={() => props.addOrder('direct_transfer_via_mandiri')}>Continue</span>
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

        .list-item .left {
          opacity: 0.7;
        }

        .instruction {
          text-align: center;
          max-width: 60%;
          margin: 0 auto;
        }

        h2 {
          width: 100%;
          text-align: center;
        }

        .payment-details {
          background-color: #EBF6FB;
          padding: 10px 20px;
          margin: 30px 0;
          border-radius: 8px;
        }
    
        .check{
          text-align:center;
          background-color:  #EBF6FB;
          padding: 10px 10px;
          margin-top: 30px;
          border-radius: 8px;
        
        }

        .btn-primary {
          width: 100%;
          padding: 15px 0;
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
    
        }
      `}</style>
    </div>
  )
}

class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVAgenerated: false,
      isTransferBCA: false,
      isTransferBNI: false,
      isTransferMandiri: false
    };

    this.generateVA = this.generateVA.bind(this);
    this.transferBankBNI = this.transferBankBNI.bind(this);
    this.transferBankBCA = this.transferBankBCA.bind(this);
    this.transferBankMandiri = this.transferBankMandiri.bind(this);
    this.addOrder = this.addOrder.bind(this);
  }

  generateVA(bankName) {
    // console.log(bankName);
    this.props.generateVA(bankName);
  }

  transferBankBCA(bankName) {
    this.setState({
      isTransferBCA: true
    })
  }

  transferBankBNI(bankName) {
    this.setState({
      isTransferBNI: true
    })
  }

  transferBankMandiri(bankName){
    this.setState({
      isTransferMandiri: true
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.vaNumber != prevProps.data.vaNumber) {
      this.setState({
        isVAgenerated: true
      });
    }
  }

  addOrder(method) {
    this.props.saveValues({paymentMethod: method});
    this.props.nextStep();
  }

  render() {
    let content;

    if (this.props.data.fromCurrency != 'idr') {
      content = <EmailInstruction data={this.props.data} addOrder={this.addOrder}/>;
    } else {
      if (this.state.isVAgenerated) {
        content = <VAGenerated vaNumber={this.props.data.vaNumber} addOrder={this.addOrder}/>;
      } else {
        if(this.state.isTransferMandiri){
          content = <TransferBankMandiri addOrder={this.addOrder}/>;
        }else if(this.state.isTransferBCA) {
          content = <TransferBankBCA addOrder={this.addOrder}/>;
        } else if(this.state.isTransferBNI) {
          content = <TransferBankBNI addOrder={this.addOrder}/>;
        } else {
          content = <BankOption generateVA={this.generateVA} transferBankMandiri={this.transferBankMandiri} transferBankBNI={this.transferBankBNI} transferBankBCA={this.transferBankBCA} />
        }
      }
    }
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Payment</h1>
        <form className="form-container">
          <p className="instruction">Payment amount</p>
          <h2><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={this.props.data.fromAmount} /> {this.props.data.fromCurrency.toUpperCase()}</h2>
          {content}
        </form>
        <style jsx>{`
          .div-show {
            display: block;
          }

          .div-hide {
            display: none;
          }

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



          hr {
            display: block;
            height: 1px;
            border: 0;
            border-top: 1px solid #eaeaea;
            margin: 30px 0;
            padding: 0;
          }

          .list-item .left {
            opacity: 0.7;
          }

          .instruction {
            text-align: center;
            max-width: 60%;
            margin: 0 auto;
          }

          h2 {
            width: 100%;
            text-align: center;
          }

          .payment-details {
            background-color: #EBF6FB;
            padding: 10px 20px;
            margin: 30px 0;
            border-radius: 8px;
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
