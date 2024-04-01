import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from'react-redux';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {app} from '../firebase';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart, updateSuccess, updateFailure} from '../redux/user/userSlice';


const DashboardProfile = () => {

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const profileRef = useRef();
    const {currentUser} = useSelector( (state)=> state.user);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    // console.log(imageFileUploadProgress, imageFileUploadError);
    const imageChangeHandler = (event)=>{
        const file = event.target.files[0]
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(()=>{
        imageUpload();
    },[imageFile]);

    // console.log(imageFile);

    const imageUpload = async () => {
        if(!imageFile) return;
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
            setImageFileUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageFileUploadError(
              '** File must be less than 2MB'
            );
            setUpdateUserError('** File must be less than 2MB');
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
              setFormData({ ...formData, profilePicture: downloadURL });
              setImageFileUploading(false);
            });
          }
        );
      };

// google storage rules
    // service firebase.storage {
    //     match /b/{bucket}/o {
    //       match /{allPaths=**} {
    //         allow read;
    //         allow write: if
    //         request.resource.size < 2*1024*1024 && 
    //         request.resource.contentType.matches('image/.*')
    //       }
    //     }
    //   }


    const changeHandler = (event) =>{
      setFormData({...formData,  [event.target.id]: event.target.value});
    }

    const submitHandler = async (event) =>{
      event.preventDefault();
      setUpdateUserSuccess(null);
      setUpdateUserError(null);
      if(Object.keys(formData).length===0){
        setUpdateUserError("No changes made")
        return;
      }

      if(imageFileUploading){
        setUpdateUserError("please wait for image upload")
        return;
      }

      try{
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's profile updated successfully");
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        // setUpdateUserError("Not updated, Please try again");
      }
    }


  return (
    <div className='max-w-lg mx-auto w-full min-h-screen mt-3 md:-mt-16'>
        <h1 className='pb-10 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={submitHandler}>
            <input type='file' accept='image/*' hidden onChange={imageChangeHandler} ref={profileRef}></input>

            <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => profileRef.current.click()}>

            {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
                <img src={imageFileUrl || currentUser.profilePicture} alt='user' 
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 100 &&
                    'opacity-60'
                  }`}/>
            </div>
            {
                imageFileUploadError && <p className='text-red-500 font-semibold text-center'>{imageFileUploadError}</p>
            }

            <TextInput 
            type='text'
            id='username'
            placeholder='username'
            defaultValue={currentUser.username} 
            onChange={changeHandler}/>
            <TextInput 
            type='email'
            id='email'
            placeholder='email'
            defaultValue={currentUser.email} 
            onChange={changeHandler}/>
            <TextInput 
            type='password'
            id='password'
            placeholder='password' 
            onChange={changeHandler}
            />

            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className="text-red-500 flex justify-between px-2 mt-3">
            <span className='cursor-pointer'>Delete account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
        {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}

    </div>
//     <div className='max-w-lg mx-auto w-full pl-96  '>
//         <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>    
//         <form className='flex flex-col items-center'> {/* Center the form */}
//             <div className="w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full">
//                 <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
//             </div>
//         </form>
//   </div>
  
  )
}

export default DashboardProfile
