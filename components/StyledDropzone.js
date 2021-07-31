import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import Compressor from 'compressorjs'

const DropzoneDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media only screen and (max-width: 1100px) {
    width: 95%;
  }
`

const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 240px;
  margin: 0 auto 24px auto;
  border: 1px solid #B4B4B4;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  outline: none;
  cursor: pointer;
  position: relative;
  &:hover {
    border: none;
  }
  @media only screen and (max-width: 1100px) {
    width: 100%;
  }
`

const StyledTitle = styled.div`
  font-size: 1.4rem;
  font-family: "Avenir Next LT Pro Bold", sans-serif;
  font-weight: 100;
  text-align: center;
`

const OverlayDiv = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 360px;
  height: 240px;
  background: rgba(35, 41, 51, 0.6);
  border: 2px solid #009FE3;
  border-radius: 4px;
  flex-direction: column;
  display: ${ props => props.isOverlay ? "flex" : "none" };
  p {
    color: #FFFFFF;
    width: 65%;
    margin: 0 auto;
  }
  @media only screen and (max-width: 1100px) {
    width: 100%;
  }
`

// Styling
const thumbsContainer = {
  display: 'flex',
  flexWrap: "wrap"
}

const thumb = {
  maxWidth: "100%",
  maxHeight: "235px",
  margin: "auto",
  overflow: "hidden"
}

const img = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "cover",
  borderRadius: "4px"
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

function HoverOverlay({ isOverlay }) {
  return (
    <OverlayDiv isOverlay={isOverlay}>
      <img src="../static/images/new-ui/ic-plus.svg" alt="plus"/>
      <p>Choose or drop your ID-Card</p>
    </OverlayDiv>
  )
}

function StyledDropzone (props) {

  const [files, setFiles] = useState([])
  const [isOverlay, setIsOverlay] = useState(false)

  //Menerima file yang diupload user
  const onDrop = useCallback(acceptedFiles => {
    var file = acceptedFiles[0]

    // Handle file size more than 2MB
    new Compressor(file, {
      quality: 0.8,
      convertSize: 2000000,
      success(result) {
        file = new File([result], result.name, { lastModified: new Date() })
        
        if (file.size / (1024*1024) > 2) {
          // Image size too big after compression
          props.onError("Your photo is too large! (More than 2MB)")
        
        } else {
          // Image size is less than 2MB
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (event) => {
            props.onDrop(event.target.result)
          }

          // Membuat file yang diupload menjadi suatu variabel
          setFiles([
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          ])
        }
      },
      error(e) {
        props.onError("There is an error in compressing your photo")
      }
    })
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
  }

  return (
    <DropzoneDiv>
      <StyledTitle>
        { props.file }{ props.title }
      </StyledTitle>
      <DropzoneContainer 
        { ...getRootProps({ style }) }
        onMouseEnter={() => setIsOverlay(true)}
        onMouseLeave={() => setIsOverlay(false)}
        >
        <HoverOverlay isOverlay={isOverlay}/>
        <input { ...getInputProps() }/>
        <div id={props.id} style={{ textAlign: "center" }}>
          <div className="styled-dropzone-placeholder">
            <img src={props.image}></img>
          </div>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </DropzoneContainer>
    </DropzoneDiv>
  )
}

export default StyledDropzone
