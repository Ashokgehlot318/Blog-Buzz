import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
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

        <p className='text-sm mt-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex fugit molestias molestiae magni delectus excepturi sapiente deserunt dolor eveniet maiores beatae </p>
        </div>

        {/* right part  */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div >
              <Label value='your username'></Label>
              <TextInput type='text' placeholder='username' id='username'></TextInput>
            </div>
            <div >
              <Label value='your email'></Label>
              <TextInput type='text' placeholder='Email' id='email'></TextInput>
            </div>
            <div >
              <Label value='your password'></Label>
              <TextInput type='password' placeholder='password' id='password'></TextInput>
            </div>

            <Button gradientDuoTone='purpleToPink'  type='submit'>
              Sign Up
            </Button>
          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-700 font-semibold'>Sign In</Link>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default SignUp
