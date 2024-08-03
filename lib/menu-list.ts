import { UserRole, UserRoleType } from '@/features/users/models/IApiUser'
import { Tag, Bookmark, SquarePen, LucideIcon } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active: boolean
  roles: UserRoleType[]
}

type Menu = {
  href: string
  label: string
  active: boolean
  roles: UserRoleType[]
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

const getAllMenuList = (pathname: string) => {
  const allMenus: Group[] = [
    {
      groupLabel: 'Módulos',
      menus: [
        {
          href: '/quotes',
          label: 'Citas',
          active: pathname.includes('/quotes'),
          icon: SquarePen,
          roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.MECHANIC],
          submenus: [],
        },
        {
          href: '/admin-quotes',
          label: 'Citas Administrativas',
          active: pathname.includes('/admin-quotes'),
          icon: Bookmark,
          roles: [UserRole.ADMIN, UserRole.SECRETARY],
          submenus: [],
        },
        {
          href: '/reviews',
          label: 'Revisiones',
          active: pathname.includes('/reviews'),
          icon: Tag,
          roles: [UserRole.ADMIN, UserRole.SECRETARY, UserRole.MECHANIC],
          submenus: [],
        },
      ],
    },
  ]
  return allMenus
}

export function getMenuList(pathname: string, role?: UserRoleType): Group[] {
  if (!role) return []

  const allMenus = getAllMenuList(pathname)

  return allMenus
    .map((group) => ({
      ...group,
      menus: group.menus
        .filter((menu) => menu.roles.includes(role))
        .map((menu) => ({
          ...menu,
          submenus: menu.submenus.filter((submenu) => submenu.roles.includes(role)),
        })),
    }))
    .filter((group) => group.menus.length > 0) // Filtrar grupos vacíos
}

interface RoutePermission {
  path: RegExp
  roles: UserRoleType[]
}
export const permissionRoutes: RoutePermission[] = [
  { path: /^\/quotes(?:\/edit\/[^/]+|\/create)?$/, roles: ['ADMIN', 'MECHANIC', 'SECRETARY'] },
  { path: /^\/admin-quotes(?:\/edit\/[^/]+|\/create)?$/, roles: ['ADMIN', 'SECRETARY'] },
  { path: /^\/reviews(?:\/edit\/[^/]+|\/create)?$/, roles: ['ADMIN', 'MECHANIC', 'SECRETARY'] },
]

export function isRoleAllowed(path: string, role?: UserRoleType): boolean {
  if (!role) return false
  const route = permissionRoutes.find((route) => route.path.test(path))
  return route ? route.roles.includes(role) : false
}
