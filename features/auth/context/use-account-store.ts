import { MESSAGES } from '@/shared/constants/messages'
import toast from 'react-hot-toast'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IAuth } from '../models/IAuth'
import { IUser } from '../models/IUser'
import { UserDatasourceImpl } from '../services/Datasource'

interface StoreState {
  user: IUser | undefined
  loading: boolean
  login: (credentials: IAuth) => void
  setUser: (user?: IUser) => void
  logout: () => void
}

export const DEFAULT_USER: IUser | undefined = undefined

const STORE_NAME = 'acitve-user'

export const UseAccountStore = create<StoreState>(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      loading: false,
      login: async (credentials: IAuth) => {
        set({ loading: true })
        const user = await UserDatasourceImpl.getInstance().login(credentials)
        if (!user) return
        set({ user })
        set({ loading: false })
      },
      setUser: (user?: IUser) => set({ user }),
      logout: async () => {
        await UserDatasourceImpl.getInstance().logout()
        toast.success(MESSAGES.AUTH.LOGOUT)
        set({ user: DEFAULT_USER })
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
