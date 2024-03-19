/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import axios from 'axios';
import ok from '../assets/icon1.png'
import ok1 from '../assets/icon2.png'
import './FileUpload.css';
import { useNavigate } from "react-router-dom";


function FileUpload() {
  const [imageSelected, setImageSelected] = useState(null);
  const [videoSelected, setVideoSelected] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
 
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check file size
      if (selectedFile.size > 20 * 1024 * 1024) {
        alert('File size exceeds 20MB. Please select a smaller file.');
        e.target.value = null; // Reset the input field
        return;
      }

      setImageSelected(selectedFile);
    }
  };
  const handleVideoChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check file size
      if (selectedFile.size > 20 * 1024 * 1024) {
        alert('File size exceeds 20MB. Please select a smaller file.');
        e.target.value = null; // Reset the input field
        return;
      }

      setVideoSelected(selectedFile);
    }
  };

  const uploadImage = () => {
    if (imageSelected) {
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', 'skemmmdj');
      formData.append('folder', 'project');
      setUploading(true);
      axios
        .post('https://api.cloudinary.com/v1_1/dsbedoio5/image/upload', formData)
        .then((response) => {
          console.log('Image uploaded successfully:');
          setImageUrl(response.data.secure_url);
          setUploading(false);
          setUploaded(true);
          const imageurlll = response.data.secure_url;
          sessionStorage.setItem('imageUrl',imageurlll);
              setTimeout(() => {
                navigate('/checkout')
              }, 1000);
  
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setUploading(false);
        });
    } else {
      alert('Please select an image before uploading.');
    }
  };

  const uploadVideo = () => {
    if (videoSelected) {
      const formData = new FormData();
      formData.append('file', videoSelected);
      formData.append('upload_preset', 'dpz99ijf');
      formData.append('folder', 'project');
      setUploading(true);
      axios
        .post('https://api.cloudinary.com/v1_1/dsbedoio5/video/upload', formData)
        .then((response) => {
          console.log('Video uploaded successfully:');
          setVideoUrl(response.data.secure_url);
          setUploading(false);
          setUploaded(true);
          const videourlll = response.data.secure_url;
          sessionStorage.setItem('videoUrl',videourlll)

              uploadImage();
         
        });
    } else {
      alert('Please select a video before uploading.');
    }
  };
  return (
    <div className="ck w-full h-screen flex flex-col justify-center bg-black items-center">
        <ul className="steps font-sans text-white mt-4">
          <li className="step step-primary">Product</li>
          <li className="step step-primary">File Upload</li>
          <li className="step">Checkout</li>
          <li className="step">Payment</li>
          <li className="step">Thanking You</li>
        </ul>
      <div className=" p-4 h-[26rem] w-auto rounded max-w-xl mx-auto my-16 space-y-4 bg-[#ffffff]">

        <div className="text-2xl font-bold text-center text-black">Upload Your Product</div>
        <div className="space-y-4">
          <div className="flex items-center justify-center flex-col  border-solid ">
            <label htmlFor="imageInput" className="file-button cursor-pointer ${imageSelected ? 'disabled' : ''}`}" >
              <img src={ok} alt="Upload Image" className="file-button-image h-20 w-20" />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="imageInput"
              className="hidden"
              required
              disabled={imageSelected}
            />
            {imageSelected && <p className='text-black font-bold'>Image is selected</p>}
          </div>
          <div className="text-center text-black font-bold">
            <b>And</b>
          </div>
          <div className="flex items-center justify-center flex-col">
            <label htmlFor="videoInput" className="file-button cursor-pointer">
              <img src={ok1} alt="Upload Video" className="file-button-image h-20 w-20  ${videoSelected ? 'disabled' : ''}`}" />
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              disabled={videoSelected}
              required
              id="videoInput"
              className="hidden"
            />
           {videoSelected && <p className='text-black font-bold'>video is selected</p>}
          </div>
          <button onClick={()=>{
            uploadVideo();
          }} className="btnn">
              Upload 
            </button>
            <br />  
        </div>
      {uploading && (
        <div>
          <div className="loading-container flex flex-col">
            <div
              aria-label="Orange and tan hamster running in a metal wheel"
              role="img"
              className="wheel-and-hamster "
            >
              <div className="wheel"></div>
              <div className="hamster">
                <div className="hamster__body">
                  <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                  </div>
                  <div className="hamster__limb hamster__limb--fr"></div>
                  <div className="hamster__limb hamster__limb--fl"></div>
                  <div className="hamster__limb hamster__limb--br"></div>
                  <div className="hamster__limb hamster__limb--bl"></div>
                  <div className="hamster__tail"></div>
                </div>
              </div>
              <div className="spoke"></div>
            </div>
            <br />
              <h1 className='z-900 text-black font-bold text-xl'>uploading...</h1>
          </div>
              </div>
        )}
        {uploaded && (
          <div className="uploaded-overlay text-center">
            <div className="uploaded-text">
              <p>File uploaded successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default FileUpload;