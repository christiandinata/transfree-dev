import { connect } from 'react-redux';
import actions from '../../../redux/actions'

class UserFillPopUp extends React.Component{
  constructor(props){
    // Menerima argumen dari luar
    super(props);
    // Deklarasi state
    this.state = {
        id : this.props.user._id,
        fullname : this.props.user.fullname,
        email : this.props.user.email,
        idType : this.props.user.idType,
        idNumber : this.props.user.idNumber,
        idName : this.props.user.idName,
        gender : this.props.user.gender,
        pob : this.props.user.pob,
        dob : this.props.user.dob,
        address : this.props.user.address,
    }
    
    this.updateUser = this.updateUser.bind(this);
    this.upgradeUser = this.upgradeUser.bind(this);
    this.validasiData = this.validasiData.bind(this);
  }

  componentWillMount() {
    this.props.getPhoto(this.props.user._id, 'getPhoto');
  }

  handleChange(event){
    if(event.target.name === 'gender'){
        this.setState({
            [event.target.name] : event.target.value
        })
    }  
    else{
        this.setState({
            [event.target.id] : event.target.value
        })
    }
  }
  //Periksa apakah user sudah memasukkan semua data yang diperlukan
  validasiData(){
    if (this.state.idNumber === undefined  && this.state.gender === undefined && this.state.pob === undefined && this.state.dob === undefined && this.state.address === undefined) {
      return false
    } else {
      return true;
    }
  }

  //Memasukkan data user ke DB
  updateUser(){
    let id = this.state.id;
    let fullname = this.state.fullname;
    let email = this.state.email;
    let idType = this.state.idType;
    let idNumber = this.state.idNumber;
    let idName = this.state.idName;
    let gender = this.state.gender;
    let pob = this.state.pob;
    let dob = this.state.dob;
    let address = this.state.address;
    // alert(address);
    this.props.updateUser(id, { fullname, email, idType, idNumber, idName, gender, dob, pob, address }, 'user');
    this.props.closePopUp();
  }

  //Mengubah status user menjadi approved
  upgradeUser(){
    let uid = this.state.id;

    this.updateUser();
    this.props.approveUser({uid}, 'approveUser');
    this.props.closePopUp();
  }

  render(){
    console.log(this.props.user)
    return(
      <div className="popup" >
        <div className="popupcontainer">
          <h2>{this.props.text}</h2>
          <div className="content">
            {this.props.photo.photoData ?
                <img className="photoId" src={this.props.photo.photoData.photoId}></img> : 'ID Photo Not Available'
            }<br></br>
          {/* Memasukkan data diri  */}
           <form>
           <h4>ID Type</h4>
            <input
                type="text"
                id="idType"
                placeholder="Insert the ID Type (KTP/KTM/KK)"
                required
                value={this.state.idType}
                onChange={this.handleChange.bind(this)}
            />
            
            <h4>ID Number</h4>
            <input
                type="text"
                id="idNumber"
                placeholder="Insert the ID Number"
                required
                value={this.state.idNumber}
                onChange={this.handleChange.bind(this)}
            />
            
            <h4>Gender</h4>
            <input
                type="radio"
                id="gender-male"
                name="gender"
                value='male'
                required
                onClick={this.handleChange.bind(this)}
                checked={this.state.gender === 'male'}
            />
            <label htmlFor="gender-male">Male</label><br/>
            <input
                type="radio"
                id="gender-female"
                name="gender"
                value='female'
                onClick={this.handleChange.bind(this)}
                checked={this.state.gender === 'female'}
            />
            <label htmlFor="gender-female">Female</label><br/>

            <h4>Place of Birth</h4>
            <input
                type="text"
                id="pob"
                placeholder="Insert City/Place of Birth"
                required
                value={this.state.pob}
                onChange={this.handleChange.bind(this)}
            />

            <h4>Date of Birth</h4>
            <input
                type="date"
                id="dob"
                required
                value={this.state.dob}
                onChange={this.handleChange.bind(this)}
            />  

            <h4>Address</h4>
              <input
                type="text"
                id="address"
                required
                value={this.state.address}
                onChange={this.handleChange.bind(this)}
            />  
          <button type="submit" className="btn-popup closebutton" onClick={this.props.closePopUp}>Close without Saving</button>
          <button type = "submit" className="btn-popup draftbutton" onClick={this.updateUser}>Save Draft</button>
          <button type="submit" className="btn-popup submitbutton" onClick={this.upgradeUser}>Submit and Approve</button>
           </form>
          </div>
         
        </div>
         

        <style jsx>{`
         .photoId, .photoFace{
          max-height:50%;
          max-width:50%;
          min-width:50%;
          min-height:50%;
        }
          hr{
            border : 5px solid gray;
            border-radius : 0px;
          }
          .content{
            text-align : left;
            margin-bottom:20px;
          }
          .popup{
            position: fixed;
            width: 100%;
            max-height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-color: rgba(0,0,0, 0.5);
            z-index: 100;
          }
          h2{
              text-align: center;
          }
          h4{
              margin-top: 10px;
              margin-bottom: 0px;
          }
          input[type=text], input[type=password] {
            border: 1px solid #EAEDF2;
            font-size: 14px;
            padding: 8px 8px 8px 30px;
            border-bottom: 1px solid #eaeaea;
            background-color: #EAEDF2;
            border-radius: 8px;
            transition: all 0.4s ease-in-out;
            width: 85%;
          }

          input[type=text]:focus, input[type=password]:focus {
            outline: none;
            border: 1px solid #469DDD;
            background-color: #ECF3FA;
            width: 90%;
          }

          input[type=date]{
            border: 1px solid #EAEDF2;
            font-size: 14px;
            padding: 8px 8px 8px 30px;
            border-bottom: 1px solid #eaeaea;
            background-color: #EAEDF2;
            border-radius: 8px;
            width: 85%;
            background-position: 8px 8px;
            display: inline;
          }


          .popupcontainer{
            display: flex;
            flex-direction: column;
            position: absolute;
            left: 25%;
            right: 25%;
            top: 10%;
            bottom: 10%;
            margin: auto;
            border-radius: 20px;
            overflow: auto;
            max-height: calc(100vh-210px);  
            background: white;
            padding: 8px;
          }
          .btn-popup{
            border:  3px #46B2E0;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            border-radius: 4px;
            transition: all 0.2s ease-in-out;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
            max-width: 50%;
          }
          .submitbutton{
            background-color: #46B2E0;
          }
          .draftbutton{
            background-color: #666666;
          }
          .closebutton{
            background-color: #ff2513;
          }
          .closebutton,
          .draftbutton,
          .submitbutton{
            border: 0px;
            width: auto;
            color: white;
            margin: 20px 25% 0 25%;
            padding: 10px 16px;
            font-size: 16px;
          }
          .closebutton:hover, .draftbutton:hover, .submitbutton:hover{
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

//Memunculkan foto yang diupload user
const mapStateToProps = (state) => {
  return {
    photo: state.photo,
  }
}

//Memunculkan pop up foto yang diupload user
export default connect(mapStateToProps, actions)(UserFillPopUp);
