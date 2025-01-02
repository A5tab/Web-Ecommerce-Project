import React, { useState } from 'react'

function FileUpload() {

    const MAX_COUNT = 5;
    const [images, setImages] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        if (images.length === 0) {
            setError('Please upload at least one image before submitting.');
            return;
        }
        e.preventDefault();
        console.log("uploading images", images);

    }

    const handleUploadedFiles = (uploadedImages) => {
        const uploaded = [...images];
        let limitExceeded = false;

        uploadedImages.some((image) => {
            if (uploaded.findIndex((img) => img.name === image.name) === -1) {
                uploaded.push(image);
                if (uploaded.length === MAX_COUNT) {
                    setFileLimit(true);
                }
                if (uploaded.length > MAX_COUNT) {
                    setError(`You can only upload a maximum of ${MAX_COUNT} images.`);
                    setFileLimit(false)
                    limitExceeded = true
                    return true
                }
            }
            else {
                setError('You have already uploaded this image.');
            }
        })
        if (!limitExceeded) {
            setImages(uploaded);
            setError('');
        }
    }
    const handleFileEvent = (e) => {
        setError('');
        console.log(e.target.files);

        const uploadedImages = Array.from(e.target.files);
        console.log(uploadedImages);

        handleUploadedFiles(uploadedImages);

    }
    return (

        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">File Upload</h1>
                <label htmlFor="upload" className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center space-x-2 w-1/3 bg-red-500 h-32 ">
                        <span>Upload up to 5 images</span>
                        <div className='flex gap-1'>

                            {images.map((image, index) => (
                                <img className='h-12 w-12 object-cover' key={index} src={URL.createObjectURL(image)} alt={image.name} />
                            ))}
                        </div>
                    </div>
                    <div>{error}</div>
                </label>
                <input id="upload" type="file" accept='image/*' multiple className="hidden" onChange={handleFileEvent} />

                <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
            </form>


        </div>

    )
}

export default FileUpload