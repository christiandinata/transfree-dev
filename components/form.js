import { connect } from 'react-redux';
import actions from '../redux/actions';

class ComplaintForm extends React.Component{
    //Menerima argumen dari luar
    constructor(props){
        super(props);
    //Mendeklarasikan state
        this.state = {
            fullname : '',
            problemType : '',
            otherDetail : '',
            detail : '',
            contact : ''
        };
    }
    //Memperbarui state react
    handleChange(event){
        event.preventDefault();

        this.setState({
            [event.target.name] : event.target.value
        });
    }
    //Mengumpulkan state react
    handleSubmit(event){
        event.preventDefault();
    //Akan ditampilkan state saat ini pada console
        console.log(this.state);
    //Mengumpulkan feedback yang pilihan other
        if(this.state.problemType === 'Other'){
            console.log("1");
            this.props.submitFeedback(
                {
                    name : this.state.fullname,
                    service : this.state.otherDetail,
                    details : this.state.detail,
                    contact : this.state.contact
                },
                'submitFeedback'
            );
        }
    //Mengumpulkan feedback yang pilihan selain other
        else{
            console.log("2");
            this.props.submitFeedback(
                {
                    name : this.state.fullname,
                    service : this.state.problemType,
                    details : this.state.detail,
                    contact : this.state.contact
                },
                'submitFeedback'
            );
        }
    }

    //Menampilkan tulisan dibawah
    render(){
        return(
            <div>
                <div className='form-holder'>
                    {this.props.successMessage !== null ? <div className='feedback-success'>Your feedback has been recorded and sent to our email</div> : null}
                    <div className='required'>*Required</div>
                    
                    <label htmlFor='fullname'>Full Name<span className='required' >*</span> : <br></br></label>
                    <input type='text' className='text-form' name='fullname' onChange={this.handleChange.bind(this)} placeholder='Full Name' required/>
                    <br></br>

                    <label htmlFor='services'>Please specify what you want to tell us<span className='required' >*</span> : <br></br></label>
                    <div className='radio-holder' name='services' onChange={this.handleChange.bind(this)}>
                        <input type='radio' className='radio-form' name='problemType' value='Account' checked={this.state.problemType === 'Account'} />
                        <label className='radio-label'>Account</label>
                        <br></br>
                        <input type='radio' className='radio-form' name='problemType' value='Transaction' checked={this.state.problemType === 'Transaction'}/>
                        <label className='radio-label'>Transaction</label>
                        <br></br>
                        <input type='radio' className='radio-form' name='problemType' value='Other' checked={this.state.problemType === 'Other'}/>
                        <label className='radio-label'>Other : </label>
                        <input type='text' className='other-text-form' name='otherDetail' onChange={this.handleChange.bind(this)} required={this.state.problemType === 'Other'} placeholder='Other reason'/>
                    </div>
                    <br></br>

                    <label htmlFor='detail'>Please tell us the detail about that<span className='required' >*</span> : <br></br></label>
                    <input type='text' className='text-form' name='detail' onChange={this.handleChange.bind(this)} placeholder='Problem Detail' required/>
                    <br></br>

                    <label htmlFor='contact'>Please give us your Email or Whatsapp number<span className='required' >*</span> : <br></br></label>
                    <input type='text' className='text-form' name='contact' onChange={this.handleChange.bind(this)} placeholder='Contact Email/Whatsapp' required/>
                    <br></br>

                    <div className='btn-holder'>
                        <div className='btn-primary btn-submit' onClick={this.handleSubmit.bind(this)}>Submit</div>
                    </div>
                </div>

                <style jsx>{`
                    .form-holder{
                        text-align:left;
                        background-color: white;
                        border-radius: 5px;
                    }

                    .text-form{
                        width: 80%;
                        border-top: 0px;
                        border-left: 0px;
                        border-right: 0px;
                        border-bottom: 2px solid black;
                    }

                    .other-text-form{
                        width: 50%;
                        border-top: 0px;
                        border-left: 0px;
                        border-right: 0px;
                        border-bottom: 2px solid black;
                    }

                    .required{
                        color: red;
                    }

                    .btn-holder{
                        text-align : center
                    }

                    .btn-submit{
                        margin: 5% auto;
                        max-width: 30%;
                        max-height: 20px;
                    }

                    .btn-submit:hover{
                        cursor: pointer
                    }
                `}</style>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      successMessage: state.complaint.successMessage
    }
  };

//Mengirimkan complaint form
export default connect(mapStateToProps,actions)(ComplaintForm);