import { Alert, Button, TextInput,Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from'react-redux';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {app} from '../firebase';
import {Link} from 'react-router-dom'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess} from '../redux/user/userSlice';


const DashboardProfile = () => {

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const profileRef = useRef();
    const {currentUser, error, loading} = useSelector( (state)=> state.user);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

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

const deleteHandler = async () =>{
  setShowModal(false);
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) {
      dispatch(deleteUserFailure(data.message));
    } else {
      dispatch(deleteUserSuccess(data));
    }
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
}


const signoutHandler = async () =>{
  try {
    const res = await fetch('/api/user/signout', {
      method: 'POST',
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      dispatch(signoutSuccess());
    }
  } catch (error) {
    console.log(error.message);
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

            <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUrl}>
                {loading ? "loading..." : 'Update'}
            </Button>
            {
              currentUser.isAdmin && (
                <Link to='/create-post'>
                  <Button type='button' gradientDuoTone='purpleToPink' className='w-full'>
                    Create a post
                  </Button>
                </Link>
              )
            }
        </form>
        <div className="text-red-500 flex justify-between px-2 mt-3">
            <span className='cursor-pointer' onClick={() => setShowModal(true)}
            >Delete account</span>
            <span onClick={signoutHandler} className='cursor-pointer'>Sign Out</span>
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

      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

    <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
        >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={deleteHandler}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>  
  )
}

export default DashboardProfile
