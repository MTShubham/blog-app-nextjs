import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tealfeed</title>
        <meta name='description' content='A knowledge sharing blog platform' />
      </Head>
      <CacheProvider>
        <SessionProvider session={pageProps.session}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </SessionProvider>
      </CacheProvider>
    </>
  )
}
