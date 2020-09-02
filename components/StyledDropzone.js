import {useCallback, useEffect, useMemo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import '../styles/components/StyledDropzone.css'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};
const thumb = {
  width: '250px',
  height: '250px',
};

const img = {
  minWidth: '250px',
  minHeight: '250px',
  maxWidth: '250px',
  maxHeight: '250px',
};

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

function StyledDropzone (props) {
  const [files, setFiles] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      props.onDrop(event.target.result)
    }

    setFiles([
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ])
  }, [])

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])




  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
        <img
            src={file.preview}
            style={img}
        />  
        {hideInstruction()}     
    </div>
    
));


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*', onDrop, multiple: false})

  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ])

  function hideInstruction () {
    document.querySelector(`#${props.id}`).style.display = 'none';
    // alert("deadeabnil")
  }


  return (
    <div className='styled-dropzone'>
      <div className='styled-dropzone-title'>
        { props.file }{props.title}
      </div>
      <div className='styled-dropzone-container' { ...getRootProps({ style }) } style={{textAlign:"center"}}>
        <input { ...getInputProps() }/>
        <div id={props.id} style={{textAlign:"center"}}>
            <img className='styled-dropzone-placeholder' src='../static/images/dropbox_image_placeholder.svg' />
            <p className='styled-dropzone-instruction' >
              <b>Drag and Drop</b> or <b>Browse Files</b><br/>
              Max 10 MB
            </p>
        </div>
         <aside style={thumbsContainer}>
                {thumbs}
          </aside>
      </div>
     
    </div>
  )
}

export default StyledDropzone
