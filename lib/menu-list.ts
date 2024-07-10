import { Tag, Settings, Bookmark, SquarePen, LucideIcon } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: 'Módulos',
      menus: [
        {
          href: '/quotes',
          label: 'Citas',
          active: pathname.includes('/quotes'),
          icon: SquarePen,
          submenus: [],
        },
        {
          href: '/admin-quotes',
          label: 'Citas Administrativas',
          active: pathname.includes('/admin-quotes'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: '/reviews',
          label: 'Revisiones',
          active: pathname.includes('/reviews'),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Ajustes',
      menus: [
        {
          href: '/account',
          label: 'Cuenta',
          active: pathname.includes('/account'),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ]
}
