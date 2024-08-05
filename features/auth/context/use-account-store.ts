import { IUser } from '@/features/users/models/IUser'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/api/api-routes'
import { getCookie } from '@/shared/api/cookies-util'
import { MESSAGES } from '@/shared/constants/messages'
import toast from 'react-hot-toast'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IAuth } from '../models/IAuth'
import { AuthDatasourceImpl } from '../services/Datasource'

interface StoreState {
  user: IUser | undefined
  loading: boolean
  login: (credentials: IAuth) => Promise<boolean>
  setUser: (user?: IUser) => void
  logout: () => Promise<void>
}

export const DEFAULT_USER: IUser | undefined = undefined

const STORE_NAME = 'acitve-user'

export const UseAccountStore = create<StoreState>(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      loading: false,
      login: async (credentials: IAuth) => {
        if (get().loading) return false
        const token = await getCookie(ACCESS_TOKEN_COOKIE_NAME)
        if (token) return true
        set({ loading: true })
        const user = await AuthDatasourceImpl.getInstance().login(credentials)
        if (!user?.ci) {
          set({ loading: false })
          return false
        }
        set({ user })
        set({ loading: false })
        return true
      },
      setUser: (user?: IUser) => set({ user }),
      logout: async () => {
        if (get().loading) return
        const token = await getCookie(ACCESS_TOKEN_COOKIE_NAME)
        if (!token) return
        set({ loading: true })
        const isLogout = await AuthDatasourceImpl.getInstance().logout()
        if (!isLogout) {
          set({ loading: false })
          return
        }
        toast.success(MESSAGES.AUTH.LOGOUT)
        set({ loading: false })
        set({ user: DEFAULT_USER })
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => localStorage),
    },
  ) as StateCreator<StoreState>,
)
