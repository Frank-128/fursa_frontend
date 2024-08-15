import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ title, files, setFiles, fileType='image' }) => {
    const [uploadStatus, setUploadStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const maxFileSize = 60 * 1024;

    // 1. Update `accept` to be conditional based on `fileType`
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: fileType === 'pdf' ? { 'application/pdf': ['.pdf'] } : {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles, rejectedFiles) => {
            const validFiles = acceptedFiles.filter(file => {
                console.log(file.size);
                return file.size >= maxFileSize;
            });

            if (validFiles.length < acceptedFiles.length) {
                setErrorMessage(`${fileType === 'pdf' ? 'PDF file' : 'Image'} is too small. Upload with over 60KB.`);
            } else if (rejectedFiles.length > 0) {
                setErrorMessage(`Some files were rejected due to invalid file type.`);
            } else {
                setErrorMessage('');
            }

            setFiles(validFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
        },
    });

    const handleRemoveFile = (file) => {
        setFiles(files.filter(f => f !== file));
    };

    return (
        <div>
            {
                files.length === 0 ? <>
                        <div
                            {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}
                            style={{
                                border: '2px dashed #cccccc',
                                borderRadius: '4px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? <p>Drop the {title} here...</p> :
                                <p>Drag 'n' drop {title} here, or click to select {title}</p>}
                        </div>
                        {
                            errorMessage && <p className={'text-red-500'}>{errorMessage}</p>
                        }
                    </>
                    :
                    <div>
                        {uploadStatus && <p>Uploading...</p>}
                        <div className="preview-container" style={{ marginTop: '20px' }}>
                            {files.map(file => (
                                <div key={file.name}
                                     style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                    {
                                        // 2. Conditional rendering based on `fileType`
                                        fileType === 'pdf' ? (
                                            <p>{file.name}</p>
                                        ) : (
                                            <img
                                                src={file.preview}
                                                alt={file.name}
                                                style={{ width: '500px', height: '200px', objectFit: 'cover' }}
                                            />
                                        )
                                    }
                                    <button
                                        onClick={() => handleRemoveFile(file)}
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
            }
        </div>
    );
};

export default FileUpload;
