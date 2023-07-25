import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import "../styles/info.css"
import { getTimeHelper } from "../components/helper/getTimerAlert"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}