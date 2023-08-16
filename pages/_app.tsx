import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'

export type UserContextType = {
  loggedUser: string,
  setLoggedUser: (user: string) => void
};

export const UserContext = React.createContext<UserContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [loggedUser, setLoggedUser] = useState<string>('');
  return (
    <>
      <Head>
        <title>Tealfeed</title>
        <meta name='description' content='A knowledge sharing blog platform' />
      </Head>
      {/* <CacheProvider> */}
        <SessionProvider session={pageProps.session}>
          <ChakraProvider>
            <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
              <Component {...pageProps} />
            </UserContext.Provider>
          </ChakraProvider>
        </SessionProvider>
      {/* </CacheProvider> */}
    </>
  )
}
