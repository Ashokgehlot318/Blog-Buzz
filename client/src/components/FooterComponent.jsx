import { Footer } from 'flowbite-react'
import {Link} from 'react-router-dom';
import {BsFacebook, BsInstagram, BsTwitter,BsGithub,BsLinkedin} from 'react-icons/bs'
import React from 'react'

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500' >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link 
             to='/'
             className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white px-4'>
              <span
              className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white italic'
              >Blog</span>
              Buzz
          </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div >
              <Footer.Title title='ABOUT' />
              <Footer.LinkGroup col>
                <Footer.Link
                href='https://www.100jsprojects.com'
                target='_blank'
                rel='noopener noreferrer'
                >
                  100 js project
                </Footer.Link>
                <Footer.Link
                href='/about'
                target='_blank'
                rel='noopener noreferrer'
                >
                  blog-buzz Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div >
              <Footer.Title title='FOLLOW US' />
              <Footer.LinkGroup col>
                <Footer.Link
                href='https://github.com/Ashokgehlot318'
                target='_blank'
                rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link
                href='#'
                rel='noopener noreferrer'
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div >
              <Footer.Title title='legal' />
              <Footer.LinkGroup col>
                <Footer.Link
                href='#'
                
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                href='#'
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />
        <div className="w-full sm:flex sm:justify-between sm:items-center">
          <Footer.Copyright href='#' by="Blog-buzz's blog" year={new Date().getFullYear()}/>

          <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent;
