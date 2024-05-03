import PostAction from '../components/PostAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex mt-28 items-center flex-col gap-6 '>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
      <PostAction />
    </div>
  )
}