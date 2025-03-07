import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import uploadIcon from '../../assets/icons/uploadIcon.png'
import { ToastContainer, toast } from 'react-toastify';

function FileInput({
    componentId,
    label = "Upload files",
    multiple = false,
    required = true,
    accept = "image/*",
    maxFiles = 1,
    name,
    errorMessage,
    className = "",
    onChange,
    value = [],
    ...props
}) {
    const [uploadedFiles, setUploadedFiles] = useState(value || []);
    const [fileLimit, setFileLimit] = useState(uploadedFiles.length >= maxFiles);

    useEffect(() => {
        const filesArray = Array.isArray(value) ? value : [];
        setUploadedFiles(filesArray);
    }, [value]);
    const notify = (message) => toast.warn(message);

    const verifyFileType = (file) => file instanceof File && file.type.startsWith("image/");

    const handleUploadFile = (e) => {
        const files = Array.from(e.target.files);
        let uploaded = multiple ? [...uploadedFiles] : [];

        files.some((file) => {
            if (!verifyFileType(file)) {
                notify(`Only image files are allowed.`);
                return;
            }

            if (!uploaded.some((img) => img.name === file.name)) {
                if (uploaded.length < maxFiles) {
                    uploaded.push(file);
                } else {
                    notify(`You can only upload a maximum of ${maxFiles} files.`);
                    return true;
                }
            }
        });

        setUploadedFiles(uploaded.slice(0, maxFiles));
        onChange(uploaded.slice(0, maxFiles)); // Send value to React Hook Form
        setFileLimit(uploaded.length >= maxFiles);
    };

    const handleRemoveImage = (index) => {
        const filteredFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(filteredFiles);
        setFileLimit(filteredFiles.length >= maxFiles);
        onChange(filteredFiles); // Update React Hook Form
    };

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={componentId}>
                    {label}
                    <div className={`${className} flex items-center gap-2`}>
                        <img src={uploadIcon} alt="image uploader" />
                        {label}
                        {uploadedFiles.map((file, index) => {
                            const fileSrc = file instanceof File ? URL.createObjectURL(file) : file;
                            return (
                                <div key={index} className="relative w-12 h-12 rounded-lg overflow-visible">
                                    <img src={fileSrc} alt="uploaded image" className="w-full h-full object-cover" />
                                    <div>
                                        <X
                                            className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full p-1 cursor-pointer hover:bg-pink-800 transition duration-200"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRemoveImage(index);
                                            }}
                                        />
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </label>
            )}
            <input
                type="file"
                id={componentId}
                accept={accept}
                multiple={multiple}
                required={required}
                name={name}
                onChange={handleUploadFile}
                {...props}
                className="hidden"
                disabled={fileLimit}
            />
            <ToastContainer />
        </div>
    );
}

export default FileInput;
