'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'

const Header = () => {

    const [language, setLanguage] = useState<'English'| 'Français'>('English')

  return (
    <header className='min-h-14 flex bg-zinc-50 items-center p-4 justify-between border-b border-b-slate-950'>
      <div>
        <Image src={'/logo1.svg'} alt='logo' width={100} height={100} /> 
      </div>

      <div className="menus flex flex-row gap-4">
        <Menu>
          <MenuButton className={'flex flex-row gap-1'}> <Image src={'/Symbols.svg'} alt='logo' width={20} height={50} /> <ChevronDownIcon className="w-5 h-5" /> </MenuButton>

        </Menu>
        <Menu>
          <MenuButton className={'flex flex-row gap-1'}> {language}  <ChevronDownIcon className="w-5 h-5" />  </MenuButton>

        </Menu>
      </div>
    </header>
  )
}

export default Header