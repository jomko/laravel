import { useState } from 'react'
import { Icon } from '@iconify/react'
import { cn } from './lib/utils'

interface MenuItem {
  label: string
  icon: string
  children?: MenuItem[]
}

const menuData: MenuItem[] = [
  {
    label: 'Inventory',
    icon: 'mdi:warehouse',
    children: [
      { label: 'Products', icon: 'mdi:package-variant' },
      { label: 'Stocktake', icon: 'mdi:clipboard-list-outline' }
    ]
  },
  {
    label: 'Sales',
    icon: 'mdi:cart-outline',
    children: [
      { label: 'Orders', icon: 'mdi:format-list-bulleted' },
      { label: 'Customers', icon: 'mdi:account-outline' }
    ]
  }
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState<Record<number, boolean>>({})

  function toggleItem(idx: number) {
    setOpen(o => ({ ...o, [idx]: !o[idx] }))
  }

  return (
    <aside
      className={cn(
        'h-screen border-r bg-muted transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className="flex items-center justify-between p-2">
        {!collapsed && <span className="font-bold">Menu</span>}
        <button onClick={() => setCollapsed(c => !c)} className="p-1">
          <Icon
            icon={collapsed ? 'radix-icons:chevron-right' : 'radix-icons:chevron-left'}
            className="h-5 w-5"
          />
        </button>
      </div>
      <nav className="mt-2 space-y-1">
        {menuData.map((item, idx) => (
          <div key={item.label} className="px-1">
            <button
              onClick={() => toggleItem(idx)}
              className={cn(
                'flex w-full items-center gap-2 rounded px-2 py-2 text-left hover:bg-accent',
                open[idx] && !collapsed && 'bg-accent'
              )}
            >
              <Icon icon={item.icon} className="h-5 w-5" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.children && (
                <Icon
                  icon={open[idx] ? 'radix-icons:chevron-down' : 'radix-icons:chevron-right'}
                  className="h-4 w-4"
                />
              )}
            </button>
            {!collapsed && item.children && open[idx] && (
              <ul className="ml-6 mt-1 space-y-1">
                {item.children.map(child => (
                  <li key={child.label}>
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent"
                    >
                      <Icon icon={child.icon} className="h-4 w-4" />
                      <span>{child.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
