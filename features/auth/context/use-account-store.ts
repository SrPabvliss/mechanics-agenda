import { ISubscription } from '@/features/notifications/models/ISubscription'
import { NotificationDataSourceImpl } from '@/features/notifications/services/Datasource'
import { PUSH_NOTIFICATIONS_IDENTIFIER } from '@/shared/api/api-routes'
import { getObjectFromCookie } from '@/shared/api/cookies-util'
import { MESSAGES } from '@/shared/constants/messages'
import toast from 'react-hot-toast'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { handleUserSubscription } from '@/lib/pushNotifications'

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
        if (!user) {
          throw new Error('User not found')
        }
        handleUserSubscription(user)
        set({ user })
        set({ loading: false })
      },
      setUser: (user?: IUser) => set({ user }),
      logout: async () => {
        const subscription: ISubscription | undefined = await getObjectFromCookie(PUSH_NOTIFICATIONS_IDENTIFIER)
        if (subscription) await NotificationDataSourceImpl.getInstance().updateSubscription(subscription)
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
