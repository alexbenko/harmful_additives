//this will be the layout for the entire app proabably
//will most likely start out as a single page app

import React, { ReactNode } from 'react'
//import Link from 'next/link'
import Head from 'next/head'

import { FaRegCopyright } from 'react-icons/fa';

type Props = {
  children?: ReactNode
  title?: string
  description?: string
}

const Layout = ({ children, title = 'Is My Food Harmful?', description='Does your food contain known carcinogens ?' }: Props) =>{
  return(
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/tab.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:keywords" content="Cancer, my food,is bad for me,cause cancer"/>
        <meta name="og:description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      {children}

      <footer style={{position:'fixed',bottom:'0',width:'100%'}}>
        <hr/>
        <FaRegCopyright /> Alexander Benko
      </footer>
    </>
  )
}

export default Layout;