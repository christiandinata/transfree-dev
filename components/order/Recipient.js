import Link from 'next/link';

class Recipient extends React.Component {
  constructor({props}) {
    super(props);

    this.name = React.createRef();
    this.email = React.createRef();
    this.bankName = React.createRef();
    this.bankAccount = React.createRef();
  }
  saveAndContinue = (e) => {
    e.preventDefault();
    var data = {
      email: this.email.current.value,
      name: this.name.current.value,
      bankName: this.bankName.current.value,
      bankAccount: this.bankAccount.current.value
    }

    this.props.saveValues(data);
    this.props.nextStep();
  }

  render() {
    return (
      <div>
        <h1>Recipient details</h1>
        <form className="form-container">
          <label htmlFor="email">Recipient's email address</label><br/>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            ref={this.email}
            defaultValue={this.props.data.email}/>

          <label htmlFor="fullname">Recipient's name</label><br/>
          <input
            type="text"
            id="fullname"
            placeholder="enter recipient's full name"
            ref={this.name}
            defaultValue={this.props.data.name}/>

          <label htmlFor="bank">Bank Name</label><br/>
          <input
            type="text"
            id="bank"
            placeholder="enter recipient's bank name"
            ref={this.bankName}
            defaultValue={this.props.data.bankName}/>

          <label htmlFor="account">Bank Account Number</label><br/>
          <input
            type="tel"
            id="account"
            placeholder="enter recipient's bank account number"
            ref={this.bankAccount}
            defaultValue={this.props.data.bankAccount}/>

          <Link href="">
            <a className="btn-primary" onClick={this.saveAndContinue}>Continue</a>
          </Link>
        </form>
        <style jsx>{`
          p {
            max-width: 500px;
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

          .form-container {
            width: 400px;
            height: auto;
            padding: 30px;
            margin: 30px auto;
            background: #FFFFFF;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
            border-radius: 8px;
          }

          .form-container label {
            font-size: 14px;
            text-transform: uppercase;
          }

          .form-container input {
            width: 100%;
            margin-bottom: 30px;
            border: none;
            font-size: 16px;
            padding: 15px 0;
            border-bottom: 1px solid #eaeaea;
            font-family: "Campton-Book", sans-serif;
          }

          .form-container input:focus {
            outline: none;
            border-bottom: 1px solid #469DDD;
          }

          ::placeholder {
            color: #CACACA;
          }

          .btn-primary {
            width: 100%;
            padding: 15px 0;
          }
        `}</style>
      </div>
    )
  }
}

export default Recipient;