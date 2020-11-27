import { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header.js';
import MenuAdmin from '../../components/menuAdmin.js';
import StyledDropzone from '../../components/StyledDropzone.js';
import actions from '../../redux/actions';

function Notification (props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [icon, setIcon] = useState('')
  const [image, setImage] = useState('')
  const [redirectLink, setRedirectLink] = useState('')
  

  function handleSubmitButton(e) {
    e.preventDefault()

    props.createNotification({
      title: title,
      content: content,
      icon: icon,
      image: image,
      redirectLink: redirectLink,
    }, 'create')
  }

  return (
    <div>
      <Header/>
      <MenuAdmin/>

      <div className="container-fluid">
          <h1>Create a notification</h1>
          <form className="form-container" id="notificationForm">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={ title }
                onChange={ (e) => setTitle(e.target.value) }
              />

              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                placeholder="Content"
                value={ content }
                onChange={ (e) => setContent(e.target.value) }
                form="notificationForm"
              />

              <label htmlFor="icon">Icon</label>
              <StyledDropzone
                id='icon'
                onDrop={ setIcon }
              />

              <label htmlFor="image">Image (thumbnail)</label>
              <StyledDropzone
                id='image'
                onDrop={ setImage }
              />

              <label htmlFor="redirectLink">Redirect Link</label>
              <input
                type="text"
                id="redirectLink"
                placeholder="Redirect Link"
                value={ redirectLink }
                onChange={ (e) => setRedirectLink(e.target.value) }
              />

              <button type="submit" className="btn-primary" onClick={ handleSubmitButton}>Create</button>
          </form>
      </div>

      <style jsx>{`
        .container-fluid {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
        }

        p {
          max-width: 500px;
          text-align: center;
        }

        textarea {
          height: 100px;
          margin-bottom:10px;
        }
        
        .select-style {
          border: 1px solid #ccc;
          width: 120px;
          border-radius: 3px;
          overflow: hidden;
          background: #fafafa url("img/icon-select.png") no-repeat 90% 50%;
          margin-bottom: 40px;
      }
      
      .select-style select {
          padding: 5px 8px;
          width: 130%;
          border: none;
          box-shadow: none;
          background: transparent;
          background-image: none;
          -webkit-appearance: none;
      }
      
      .select-style select:focus {
          outline: none;
      }

        h1 {
          margin: 100px auto 0;
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

        .error-container {
          width: 400px;
          height: auto;
          padding: 20px;
          background-color: #FF3A43;
          color: #FFF;
          border-radius: 8px;
          display: none;
        }

        .error-show {
          display: block;
        }

      `}</style>
    </div>
  )
}

const mapStateToProps = (state) => {
    // console.log("NOTIFICATION INITIALIZE state ", state)
    if (state.notification.global_notification_data_array != null) {
        return {
            notifications: state.notification.global_notification_data_array.docs,
            totalDocs: state.notification.global_notification_data_array.totalDocs
        }
    } else {
        return {
            inProgress: state.notification.inProgress
        }
    }
}

export default connect(mapStateToProps, actions)(Notification);