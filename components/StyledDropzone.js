import {useCallback, useEffect, useMemo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import '../styles/components/StyledDropzone.css'

//Untuk styling saat user memasukkan foto

//Styling
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};
const thumb = {
  maxWidth: '150px',
  height: '150px',
};

const img = {
  minWidth: '150px',
  minHeight: '150px',
  maxWidth: '150px',
  maxHeight: '150px',
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

  //Menerima file yang diupload user
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      props.onDrop(event.target.result)
    }

    //Membuat file yang diupload menjadi suatu variabel
    setFiles([
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ])
  }, [])

  //membuat preview untuk file yang diupload
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
            <div className="styled-dropzone-placeholder">
                <img src={props.image}></img>
            </div>

            <p className='styled-dropzone-instruction' >
              {/* <b>Drag and Drop</b> or <b>Browse Files</b><br/>
              Max 10 MB */}
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
