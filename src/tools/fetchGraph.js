import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import fetchGraph from "./tools/fetchGraph";

function FetchGraph() {

  const [files, setFiles] = useState([]);
  

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );

  
      let form = new FormData()
      form.FetchGraphend("fileUpload", acceptedFiles[0])

      fetch("https://api-us-east-1.hygraph.com/v2/clb4nsf6o0a6c01ui8xjqgg4l/master/upload", {
      method: 'POST',
      body: form,
    })
      .then((res) => res.json())
      .then((data) => console.log(JSON.stringify(data, null, 2)))
      .catch((err) => console.log(err));

    },
    [setFiles]
  );
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  //-------------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      {files.map((file, index) => (
        <div key={file.name}>
          <img
            src={file.preview}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        </div>
      ))}
      <input type="file" name="file" id="file" onChange={(e)=>fetchGraph(e)} />
      <button onClick={()=> fetchGraph()} >click me</button>
    </>
  )
}

export default FetchGraph;
