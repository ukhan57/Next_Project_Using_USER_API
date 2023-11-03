import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';

import { SWRConfig } from 'swr';

const fetcher = async url => {
  const res = await fetch(url);

  // if the status code is not in the range 200-299,
  // we still can get the response but it indicates an error
  if (!res.ok){
    const error = new Error('An error occured while fetching the data.');
    // Attach extra info to the error object
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
      <Component {...pageProps} /> 
      </Layout>
    </SWRConfig>
    )  
}
