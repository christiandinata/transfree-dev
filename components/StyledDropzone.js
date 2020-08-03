import {useCallback, useEffect, useMemo, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import '../styles/components/StyledDropzone.css'

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

  return (
    <div className='styled-dropzone'>
      <div className='styled-dropzone-title'>
        { props.title }
      </div>
      <div className='styled-dropzone-container' { ...getRootProps({ style }) }>
        <input { ...getInputProps() } />
        <img className='styled-dropzone-placeholder' src='../static/images/dropbox_image_placeholder.svg' />
        <p className='styled-dropzone-instruction' >
          <b>Drag and Drop</b> or <b>Browse Files</b><br/>
          Max 10 MB
        </p>
      </div>
    </div>
  )
}

export default StyledDropzone
