import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={ <Home />} />
          <Route path='/about' element={ <About />} />
          <Route path='/sign-in' element={ <SignIn />} />
          <Route path='/sign-up' element={ <SignUp />} />
          <Route path='/search' element={ <Search />} />

          <Route element={ <PrivateRoute />} >
            <Route path='/dashboard' element={ <Dashboard />} />
          </Route>
          <Route element={ <AdminPrivateRoute/>} >
            <Route path='/create-post' element={ <CreatePost />} />
            <Route path='/update-post/:postId' element={ <UpdatePost />} />
          </Route>
          
          <Route path='/projects' element={ <Projects />} />
          <Route path='/post/:postslug' element={ <PostPage />} />
        </Routes>

        <FooterComponent />
    </BrowserRouter>
  )
}

export default App
