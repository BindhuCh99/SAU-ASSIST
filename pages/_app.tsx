import '@/styles/globals.css'
import { ContextProvider } from "../pages/context/contextProvider";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )

}
