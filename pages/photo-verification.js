import Header from '../components/header.js';
import React, {useMemo, useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import {useDropzone} from 'react-dropzone';
import { getCookie } from '../utils/cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Webcam from 'react-webcam';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  width: '400px',
  height: '300px',
};

const img = {
  maxWidth: '400px',
  maxHeight: '300px'
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '360px',
  padding: '50px 20px',
  margin: '10px 0 30px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const tes = {
  width: '40px'
}

function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    var file = acceptedFiles[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      //console.log(event.target.result);
      if (props.docType == 'photoId')
        props.setPhotoIdSrc(event.target.result);
      else
        props.setPhotoFaceSrc(event.target.result);
    };

    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, [])

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <img
        src={file.preview}
        style={img}
      />
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*', onDrop, multiple: false});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  return (
    <div className='container'>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <FontAwesomeIcon style={tes} icon="file-image"/>
        <p>Drag or click to upload photo</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  );
}

<StyledDropzone />

class PhotoVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadPhotoIdSrc: null,
      uploadPhotoFaceSrc: null,
      webcamPhotoIdSrc: null,
      webcamPhotoFaceSrc: null,
      photoIdMode: null,
      photoFaceMode: null,
      submitViaWhatsapp: true
    }

    this.setPhotoIdSrc = this.setPhotoIdSrc.bind(this);
    this.setPhotoFaceSrc = this.setPhotoFaceSrc.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    if (ctx.isServer) {
      if(ctx.req.headers.cookie) {
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
      }
    }
  }

  setSubmitViaWhatsapp = src => {
    this.setState({submitViaWhatsapp: src})
  }
  setPhotoIdSrc = src => {
    this.setState({uploadPhotoIdSrc: src})
  }

  setPhotoFaceSrc = src => {
    this.setState({uploadPhotoFaceSrc: src})
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capturePhotoId = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({webcamPhotoIdSrc: imageSrc, photoIdMode: null})
  };

  capturePhotoFace = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({webcamPhotoFaceSrc: imageSrc, photoFaceMode: null})
  };

  retakePhotoFace = () => {
    this.setState({webcamPhotoFaceSrc: null, photoFaceMode: 'camera'})
  };

  setPhotoIdMode = (selectedMode) => {
    if (selectedMode == 'upload')
      this.setState({webcamPhotoIdSrc: null})
    this.setState({photoIdMode: selectedMode})
  }

  setPhotoFaceMode = (selectedMode) => {
    if (selectedMode == 'upload')
      this.setState({webcamPhotoFaceSrc: null})
    this.setState({photoFaceMode: selectedMode})
  }

  handleSubmit(e) {
    e.preventDefault();

    let photoId, photoFace = '';
    if(this.state.submitViaWhatsapp == true){
          window.open('https://api.whatsapp.com/send?phone=447490090659&text=Please%20upload%20your%20ID%20photos%20to%20this%20Whatsapp%20%3A%0A1.%20Upload%20or%20Take%20a%20photo%20of%20your%20ID%20Card%0A2.%20Upload%20or%20Take%20a%20photo%20of%20your%20face%20while%20holding%20the%20ID%20Card', "_blank")
    }
    if (this.state.uploadPhotoIdSrc != null)
      photoId = this.state.uploadPhotoIdSrc;
    else
      photoId = this.state.webcamPhotoIdSrc;

    if (this.state.uploadPhotoFaceSrc != null)
      photoFace = this.state.uploadPhotoFaceSrc;
    else
      photoFace = this.state.webcamPhotoFaceSrc;

    console.log(this.props.email);
    this.props.uploadPhoto(
      { photoId: photoId, photoFace: photoFace, email: this.props.email },
      'uploadPhoto'
    );
  }

  render() {
    const videoConstraints = {
      width: 720,
      height: 720,
      facingMode: "user"
    };

    const hideWebcam = {
      display: 'none'
    }

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="logo">
            <img src="../static/images/transfree-logo.png"/>
          </div>
          <h1>Photo ID verification</h1>
          <p>Last step, upload photos of your ID ( KTP , Passport or SIM ) according to the intruction below to verify your identity.</p>
          <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>

            {/* {this.state.submitViaWhatsapp == true ?  */}

                <div className="cta-submit">
                  <div style={{marginTop: "-15px"}}>       

                    <button type="submit" className="btn-primary" >           
                      <span style={{paddingRight: "7px"}} ><i class="fa fa-whatsapp"  style={{fontSize: "22px"}}  aria-hidden="true"></i></span> Upload Photos Via Whatsapp
                    </button>

                  </div>


              {/** 
                <h3 style={{textAlign: "center"}}>OR</h3>

                  <div style={{marginTop: "10px"}}>                
                    <button 
                      onClick={() => this.setSubmitViaWhatsapp(false)}
                      type="submit" className={'btn-primary'}>
                      Upload later, Start Transfer Now !
                      </button>
                </div>
                */}
                
                <p className="description"> * We will not, in any circumstances, share your personal information irresponsibly.
                <a className="more-privacy" href="/privacy-policy" target="_blank"> More about Privacy Policy </a></p>
              </div>             
{/*

              : 


              <div>
                <p>1. Upload or take a photo  of your ID Card</p>
                <div className="cta">
                  <Link href=""><a className="btn-primary btn-small" onClick={() => this.setPhotoIdMode('upload')}>Upload photo</a></Link>
                  <Link href=""><a className="btn-primary btn-small" onClick={() => this.setPhotoIdMode('camera')}>Take photo</a></Link>
                </div>
                {this.state.photoIdMode == 'upload' ? <StyledDropzone docType={'photoId'} setPhotoIdSrc={this.setPhotoIdSrc}/> : null}


                {this.state.webcamPhotoIdSrc != null ? (
                  <div>
                    <img src={this.state.webcamPhotoIdSrc} />
                    <Link href=""><button className="btn-secondary" onClick={this.retakePhotoId}>Retake photo</button></Link>
                  </div>
                ) : null}

                <div className="divider"></div>
                <p>2. Upload or take a photo of your face while holding the ID card</p>
                <div className="cta">
                  <Link href=""><a className="btn-primary btn-small" onClick={() => this.setPhotoFaceMode('upload')}>Upload photo</a></Link>
                  <Link href=""><a className="btn-primary btn-small" onClick={() => this.setPhotoFaceMode('camera')}>Take photo</a></Link>
                </div>

                {this.state.photoFaceMode == 'upload' ? <StyledDropzone docType={'photoFace'} setPhotoFaceSrc={this.setPhotoFaceSrc}/> : null}

                {this.state.webcamPhotoFaceSrc != null ? (
                  <div>
                    <img src={this.state.webcamPhotoFaceSrc} />
                    <Link href=""><button className="btn-secondary" onClick={this.retakePhotoFace}>Retake photo</button></Link>
                  </div>
                ) : null}
                {this.state.photoFaceMode == 'camera' ?
                  (
                    <div>
                      <Webcam
                        audio={false}
                        height={400}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        width={400}
                        videoConstraints={videoConstraints}
                        style={this.state.photoFaceMode == 'camera' ? null : hideWebcam}
                      />
                      <Link href=""><button className="btn-secondary" onClick={this.capturePhotoFace}>Capture photo</button></Link>
                    </div>
                  ) : (null)
                }
                {
                // <div className="photo-file">
                //   <span>1) Upload or take a photo of your ID Card</span>
                //   <input type="file" onChange={this.onPhotoIdChangeHandler} className="inputfile"/>
                //   <label htmlFor="photo-face">Upload</label><br/>
                // </div>
                //
                // <div className="photo-file">
                //   <span>2) Upload or take a photo of your face while holding the ID card</span>
                //   <input type="file" onChange={this.onPhotoFaceChangeHandler} className="inputfile"/>
                //   <label htmlFor="photo-face">Upload</label><br/>
                // </div>
                }
                <p className="description"> * We will not, in any circumstances, share your personal information irresponsibly.
                <a className="more-privacy" href="/privacy-policy" target="_blank"> More about Privacy Policy </a></p>

                {(this.state.uploadPhotoIdSrc != null && this.state.uploadPhotoFaceSrc != null)?
                  (
                  <div className="cta-submit">
                    <button type="submit" className={'btn-primary'}>{this.props.inProgress ? (
                      <FontAwesomeIcon icon="sync-alt" spin/>
                    ) : 'Continue'}</button>
                  </div>
                  ) : 
                  <div className="cta-submit">
                    <button disabled={"disabled"} className={'btn-disabled'}>Continue</button>
                  </div>
                }

                  </div>


                }
*/}
          </form>

        </div>
        <style jsx>{`
          .container-fluid {
            flex-direction: column;
          }
          .no-show {
            display: none
          }

          .btn-primary,
          .btn-secondary,
          .btn-disabled {
            width: 100%;
            padding: 15px 0;
          }

          .btn-small {
            width: 50%;
            padding: 10px 0;
            margin: 10px;
            font-size: 14px;
          }

          .btn-big {
            margin-top: 50px;
          }

          .cta {
            display: flex;
            justify-content: space-between;

          }

          .divider {
            border: 1px solid #eaeaea;
            margin: 30px auto;
          }

          .cta-submit {
            margin-top: 20px;
          }

           .description{
            color:#e79635;
            font-size: 14px;
            margin: 30px 0px 0px 0px !important; //40px
          }
          .more-privacy{
            color:#e79635;
          }

        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.user_data.email,
    inProgress: state.photo.inProgress,
  }
};

export default connect(
  mapStateToProps,
  actions
)(PhotoVerification);
