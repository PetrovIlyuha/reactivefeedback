import Head from "next/head"
import styles from "../styles/Home.module.css"
import { useAuth } from "../lib/auth"

export default function Home() {
  const auth = useAuth()
  console.log(auth.user)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Reactive Feedback</h1>
        {!auth.user && <button onClick={auth.signInWithGithub}>Sign In</button>}
        <div>{auth.user?.displayName}</div>
        {auth.user && <button onClick={auth.signout}>Sign Out</button>}
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by{" "}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
