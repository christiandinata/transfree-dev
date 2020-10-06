import { connect } from 'react-redux';
import actions from '../../../redux/actions'

class UserDetailPopUp extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.getPhoto(this.props.user._id, 'getPhoto');
  }

  render(){
    return(
      <div className="popup" onClick={this.props.closePopUp}>
        <div className="popupcontainer">
          <h2>{this.props.text}</h2>
          <div className="content">
            ID Name &#9; : {this.props.user.fullname} <br></br>
            ID Number &#9; : {this.props.user.idNumber} <br></br>
            ID Type &#9; : {this.props.user.idType} <br></br>
            Birthplace &#9; : {this.props.user.pob} <br></br>
            Birthdate &#9; : {this.props.user.dob} <br></br>
            ID Photo &#9; :<br></br>
              {this.props.photo.photoData ?
                <img className="photoId" src={this.props.photo.photoData.photoId}></img> : 'ID Photo Not Available'
              }<br></br>
            Face Photo &#9; :<br></br>
              {this.props.photo.photoData ?
                <img className="photoFace" src={this.props.photo.photoData.photoFace}></img> : 'Face Photo Not Available'
              }<br></br>
          </div>
          <button className="btn-primary closebutton" onClick={this.props.closePopUp}>Close</button>
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
          .closebutton{
            border: 0px;
            width: auto;
            color: white;
            margin: 10px auto;
            padding: 10px 16px;
            font-size: 16px;
          }
          .closebutton:hover{
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photo: state.photo,
  }
}

export default connect(mapStateToProps, actions)(UserDetailPopUp);
