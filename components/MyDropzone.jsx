import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
const FormData = require('form-data');

function MyDropzone() {
  const [files, setFiles] = useState([]);

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      console.log('Preview function executed');
    },
    [files]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log('Files dropped:', acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      const form = new FormData();

      console.log('Uploading file:', acceptedFiles[0]);
      form.append('file', acceptedFiles[0]);
      form.append('fileName', acceptedFiles[0].name);
      form.append('handle', acceptedFiles[0].name);
      form.append('size', acceptedFiles[0].size);
      form.append('type', acceptedFiles[0].type);
      console.log('Form data:', form.getAll('file'));

      fetch('/api/upload', {
        method: 'POST',
        body: form,
      }).then((response) => {
        if (response.ok) {
          console.log('File upload successful from API');
        } else {
          console.error('File upload failed');
        }
      });
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input
        {...getInputProps()}
        className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {files.map((file, index) => (
        <div key={file.name}>
          <img
            src={file.preview}
            style={{ width: '100px', height: '100px' }}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}

export default MyDropzone;
