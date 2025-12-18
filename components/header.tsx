"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

const Header = () => {
  const [language, setLanguage] = useState<"English" | "Español">("English");
  const [flag, setFlag] = useState("/unitedstates.svg");
  const [country, setCountry] = useState<
    "United States" | "Canada" | "United Kingdom"
  >("United States");

  return (
    <header className="h-[80px] flex bg-white items-center py-2 border-b border-gray-200">
      <div className="w-full max-w-[80%] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo1.svg"
            alt="logo"
            width={120}
            height={36}
            className="h-9"
          />
        </div>

        <div className="menus flex flex-row gap-3 items-center">
          <Menu as="div" className="relative">
            <MenuButton
              className={
                "flex flex-row gap-1.5 items-center text-sm text-gray-700 hover:text-gray-900 px-2 py-1.5 rounded hover:bg-gray-50"
              }
            >
              <Image
                src={flag}
                alt="flag"
                width={30}
                height={20}
                className="h-3.5"
              />
              <ChevronDownIcon className="w-4 h-4" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-1 w-40 origin-top-right rounded-b-md bg-white shadow-b-lg border-t-0 border border-gray-200 py-1 z-50 outline-none focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setFlag("unitedstates.svg")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    United States
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setFlag("Symbols.svg")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Canada
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setFlag("Uk.svg")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    United Kingdom
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
          <Menu as="div" className="relative">
            <MenuButton
              className={
                "flex flex-row gap-1.5 items-center text-sm text-gray-700 hover:text-gray-900 px-2 py-1.5 rounded hover:bg-gray-50"
              }
            >
              {language}
              <ChevronDownIcon className="w-4 h-4" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-1 w-32 origin-top-right rounded-b-md bg-white shadow-lg border-t-0 border border-gray-200 py-1 z-0 outline-none focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage("English")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    English
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage("Español")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Español
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
