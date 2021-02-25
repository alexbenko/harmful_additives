import { useEffect } from 'react';
import Layout from '../components/Layout'
import '../styles/index.css';
import Head from 'next/head';



function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[])

  return (
    <>
      <Head>
        <title>What Is In my food?</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:keywords" content="Cancer, my food,is bad for me,cause cancer,what is in,my food,what is in my food,what is"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="A tool used to see if your food contains any harmful ingredients. Simply upload a picture of the ingredient list/manually type out the suspicious ingredients and hit search."/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>


  )
}

export default MyApp
