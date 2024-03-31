import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector} from'react-redux'

const DashboardProfile = () => {
    const {currentUser} = useSelector( (state)=> state.user);
  return (
    <div className='max-w-lg mx-auto w-full min-h-screen '>
        <h1 className='pb-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                
                <img src={currentUser.profilePicture} alt='user' 
                className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
            </div>

            <TextInput 
            type='text'
            id='username'
            placeholder='username'
            defaultValue={currentUser.username}/>
            <TextInput 
            type='email'
            id='email'
            placeholder='email'
            defaultValue={currentUser.email}/>
            <TextInput 
            type='password'
            id='password'
            placeholder='password'
            />

            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update
            </Button>
        </form>
        <div className="text-red-500 flex justify-between px-2 mt-3">
            <span className='cursor-pointer'>Delete account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
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
