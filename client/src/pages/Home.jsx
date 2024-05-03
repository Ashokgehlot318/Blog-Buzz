import { Link } from 'react-router-dom';
import PostAction from '../components/PostAction';
import { useEffect, useState } from 'react';
import RecentPostCard from '../components/RecentPostCard';
import { Button } from 'flowbite-react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col sm:flex-row mx-auto my-8">
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl mb-3'>Welcome to Blog-Buzz</h1>
        <p className='text-gray-500 text-xs sm:text-sm dark:text-gray-300'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, <br />software engineering, and programming languages. Explore<br></br> our library of resources and elevate your skills today.
        </p>
        <Button outline gradientDuoTone='purpleToPink' className=''>

        <Link to="/search" >
            let's get started...
          </Link>
        </Button>
      </div>

      {/* home page image */}
      <div className='sm:mt-12 sm:mr-44 pt-8 pr-5'>
          <img src="https://static-web.grammarly.com/1e6ajr2k4140/75IFN2KXay95QcYR7usTWp/b23584807f2575942964c54bfcd6dfdf/Group_625989.png?w=1280" alt="" 
          className='w-96 h-80'/>
          {/* <img src="https://urban-homes.s3.ap-south-1.amazonaws.com/svg.svg" alt="" /> */}
          

      </div>
        
      </div>
      <div className='p-3 m-3 bg-amber-100 dark:bg-slate-700'>
        <PostAction />
      </div>

      <div className='max-w-8xl mx-auto sm:ml-36 p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <RecentPostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}