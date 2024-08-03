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

export function getMenuList(pathname: string, role?: UserRoleType): Group[] {
  if (!role) return []
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
          roles: [UserRole.ADMIN],
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

export function isRoleAllowed(path: string, role?: UserRoleType): boolean {
  console.log('path', path)
  if (!role) return false
  const menuList = getMenuList(path, role)
  for (const group of menuList) {
    for (const menu of group.menus) {
      if (menu.href === path) {
        return menu.roles.includes(role)
      }
      for (const submenu of menu.submenus) {
        if (submenu.href === path) {
          return menu.roles.includes(role)
        }
      }
    }
  }
  return true
}
