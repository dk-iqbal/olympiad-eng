// ** React Imports
// ** Axios
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import authConfig from 'src/configs/auth'
import { AuthValuesType, ErrCallbackType, LoginParams, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        const userData = localStorage?.getItem('userData') || ''
        const parseUserData = JSON.parse(userData)
        await axios
          .get(`http://localhost:4321/users/get-me?id=${parseUserData.id}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data, id: response.data?._id })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
  //   axios
  //     .post(authConfig.loginEndpoint, params)
  //     .then(async response => {
  //       params.rememberMe
  //         ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
  //         : null
  //       const returnUrl = router.query.returnUrl

  //       setUser({ ...response.data.userData })
  //       params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

  //       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

  //       router.replace(redirectURL as string)
  //     })

  //     .catch(err => {
  //       if (errorCallback) errorCallback(err)
  //     })
  // }

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post('http://localhost:4321/users/login', params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        const userData = {
          id: response.data.user._id,
          email: response.data.user.email,
          fullName: response.data.user.name,
          role: response.data.user.role,
          username: response.data.user.username,
          avatar: response.data.user.image,
          password: response.data.user.password,
          organizationId: response.data.user.organizationId,

          // password: 'demo@123'
        }

        setUser({ ...userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
