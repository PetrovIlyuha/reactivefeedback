import firebase from "./firebase"
import { createContext, useContext, useState, useEffect } from "react"
import { createUser } from "./firestore"
import cookie from "js-cookie"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const handleUser = incomingUser => {
    if (incomingUser) {
      const user = formatUser(incomingUser)
      const { token, ...userWithoutToken } = user
      createUser(user.uid, userWithoutToken)
      setUser(user)
      cookie.set("react-feedback-auth", true, { expires: 1 })
      return user
    } else {
      setUser(false)
      cookie.remove("react-feedback-auth")
      return false
    }
  }

  const signInWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => {
        setUser(response.user)
        return response.user
      })
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false)
      })
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      handleUser(user)
    })
    return () => unsubscribe()
  }, [])

  return { user, signInWithGithub, signout }
}

const formatUser = user => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}
