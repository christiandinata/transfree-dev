import Header from '../components/header.js';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import {useDropzone} from 'react-dropzone';
import {getCookie} from '../utils/cookie';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//Pengaturan foto
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
            <h4>Photo Preview :</h4>
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
//Untuk mengunggah foto
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

class PhotoVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadPhotoIdSrc: null,
            uploadPhotoFaceSrc: null,
        }

        this.setPhotoIdSrc = this.setPhotoIdSrc.bind(this);
        this.setPhotoFaceSrc = this.setPhotoFaceSrc.bind(this);
    }

    static async getInitialProps(ctx) {
        initialize(ctx);
        if (ctx.isServer) {
            if (ctx.req.headers.cookie) {
                await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req), 'user',ctx.req));
            }
        }
    }

    setPhotoIdSrc = src => {
        this.setState({uploadPhotoIdSrc: src})
    }
    setPhotoFaceSrc = src => {
        this.setState({uploadPhotoFaceSrc: src})
    }

    handleSubmit(e) {
        e.preventDefault();

        let photoId, photoFace = '';
        photoId = this.state.uploadPhotoIdSrc;
        photoFace = this.state.uploadPhotoFaceSrc;

        this.props.uploadPhoto(
            {
                photoId: photoId,
                photoFace: photoFace,
                email: this.props.email
            },
            'uploadPhoto'
        );
    }
//Menampilkan tulisan dibawah
    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <div className="logo">
                        <img src="../static/images/transfree-logo.png"/>
                    </div>
                    <h1>Photo ID verification</h1>
                    <p>Last step, upload photos of your ID ( KTP , Passport or SIM ) and photo of yourself with the ID / selfie with your ID.
                    Make sure we can read the ID number clearly.</p>
                    <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
                        <h4>Upload Photo of Your ID (Make sure we can read the ID number clearly)</h4>
                        <StyledDropzone docType={"photoId"} setPhotoIdSrc={this.setPhotoIdSrc}/>
                        <h4>Upload Photo of Your Selfie with your ID (Make sure we can read the ID number clearly)</h4>
                        <StyledDropzone docType={"photoFace"} setPhotoFaceSrc={this.setPhotoFaceSrc}/>
                        <div className="cta-submit">
                            <div style={{marginTop: "-15px"}}>
                                <button type="submit" className="btn-primary">
                                    Upload Photos
                                </button>
                            </div>
                            <p className="description"> * We will not, in any circumstances, share your personal
                                information irresponsibly.
                                <a className="more-privacy" href="/privacy-policy" target="_blank"> More about Privacy
                                    Policy </a></p>
                        </div>
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

//Mengirimkan photo verification
export default connect(
    mapStateToProps,
    actions
)(PhotoVerification);
