import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { FaRegCopyright } from 'react-icons/fa';

type Props = {
  children?: ReactNode
  title?: string
  description?: string
}
const useStyles = makeStyles({
  span: {
    paddingRight:'10px'
  },
  footer: {
    position:'fixed',
    bottom:'0',
    width:'100%'
  }
});

const Layout = ({ children, title = 'What Is In my food?', description='Does your food contain known carcinogens ?' }: Props) =>{
  const styles = useStyles();

  return(
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:keywords" content="Cancer, my food,is bad for me,cause cancer,what is in,my food,what is in my food,what is"/>
        <meta name="og:description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      {children}
      <footer className={styles.footer} style={{position:'fixed',bottom:'0',width:'100%'}}>
        <hr/>
        <span className={styles.span}>
          <span className={styles.span}><FaRegCopyright/></span>{new Date().getFullYear()}
        </span>
        <span className={styles.span}>
          Made By:
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/alexander-benko-06b99a1a4/">
            Alexander Benko
          </a>
        </span>

      </footer>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          style: {
            margin: '40px',
            background: '#363636',
            color: '#fff',
            zIndex: 1,
          },
          duration: 5000,
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error:{
            duration:3000,
            theme:{
              primary:'red',
              secondary:'black'
            }
          }
        }}
      />
    </>
  )
}

export default Layout;