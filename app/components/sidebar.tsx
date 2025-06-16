"use client"

import { CookingPot, LayoutDashboard, Menu, PackageSearch, ShoppingCart, StickyNote } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"

interface Props {
  children: React.ReactNode
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const sidebarMenu = [
    {
      icon: <LayoutDashboard className="w-5"/>,
      textMenu: 'Dashboard',
      route: '/'
    },
    {
      icon: <PackageSearch className="w-5"/>,
      textMenu: 'Products',
      route: '/products'
    },
    {
      icon: <CookingPot className="w-5"/>,
      textMenu: 'Recipes',
      route: '/recipes'
    },
    {
      icon: <ShoppingCart className="w-5"/>,
      textMenu: 'Carts',
      route: '/carts'
    },
    {
      icon: <StickyNote className="w-5"/>,
      textMenu: 'Posts',
      route: '/posts'
    }
  ]
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSideBarOpen(false);
    }
  }

  useEffect(() => {
    if (isSideBarOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSideBarOpen])

  return (
    <>
      <div className="fixed w-[100vw]">
        <button
          onClick={toggleSidebar}
          type="button" 
          className="inline-flex bg-white shadow-md items-center p-2 mt-2 ms-3 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <Menu className="w-6 h-6"/>
        </button>
      </div>
      <aside 
        id="default-sidebar" 
        ref={sidebarRef} 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSideBarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-8 overflow-y-auto bg-slate-900">
          <ul className="space-y-2 font-medium mt-5">
            {
              sidebarMenu.map((item, id) => {
                return (
                  <li key={id}>
                    <Link
                      href={item.route}
                      className="flex items-center p-2 text-slate-300 rounded-lg hover:bg-slate-800 group"
                      onClick={toggleSidebar}
                    >
                      {item.icon}
                      <span className="ms-3">{item.textMenu}</span>
                    </Link>
                  </li> 
                )
              })
            }
          </ul>
        </div>
      </aside>
      <div className="p-4 min-h-[100vh] pt-12 sm:ml-64 sm:pt-4">
        {children}
      </div>
    </>
  )
}

export default Sidebar