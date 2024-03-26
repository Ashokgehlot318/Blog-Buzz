import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

const SignIn = () => {

  const [formData,setFormData] = useState({});
  // const [loading,setLoading] = useState(false);
  // const [errorMessage,setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const {loading, error: errorMessage} = useSelector( state => state.user);

  const navigate = useNavigate();
  const changeHandler = (event)=>{
    setFormData({...formData,
      [event.target.id]: event.target.value.trim()
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields..."));
    }
  
    try {

      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!res.ok) {
        // If response is not ok, throw an error
        throw new Error('User not found');
      }
  
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      
      dispatch(signInSuccess(data))

      navigate('/');

    } catch (error) {
      // Handle fetch errors
      // console.error('Error signing up:', error);
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message))
    }
  };
  


  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
         {/* left part */}
        <div className="flex-1">
        <Link to='/'
        className='font-bold dark:text-white text-4xl'>
            <span
            className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white italic'
            >Blog</span>
            Buzz
        </Link>

        <p className='text-sm mt-5'>Inspire and be inspired. Dive into Blog Buzz – where minds meet and ideas spark. </p>
        </div>

        {/* right part  */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={submitHandler}>
            <div >
              <Label value='your email'></Label>
              <TextInput type='text' placeholder='Email' id='email' onChange={changeHandler}></TextInput>
            </div>
            <div >
              <Label value='your password'></Label>
              <TextInput type='password' placeholder='password' id='password' onChange={changeHandler}></TextInput>
            </div>

            <Button gradientDuoTone='purpleToPink'  type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-700 font-semibold'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>

      
    </div>
  )
}

export default SignIn
