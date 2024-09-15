import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { categories, dropdowncategories } from "../../common/categories";

export default function Categories() {
  const naviagte = useNavigate();

  return (
    <div className="hidden pt-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 md:flex z-20 ">
      <Menu as="div" className="relative inline-block">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-bold">
            ALL CATEGORIES
            <GoChevronDown className="-mr-1 h-5 w-5" aria-hidden="true" />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute w-[800px] p-4 bg-white rounded shadow-lg z-30"
        >
          <div className="py-1 flex justify-between text-start">
            {dropdowncategories.map((item) => (
              <MenuItem key={item.id}>
                {({ active }) => (
                  <div className="text-sm cursor-pointer">
                    <div className="hover:text-[#69c3ce] p-3.5 font-semibold">
                      {item.title}
                    </div>
                    <div className="ml-2">
                      {item.nested.map((item, index) => (
                        <div key={index} className="hover:text-[#69c3ce] p-1.5">
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
      <div className="flex gap-4 items-center cursor-pointer">
        {categories.map((item) => (
          <h2
            key={item.id}
            className="hover:text-[#69c3ce]"
            onClick={() => naviagte(`/category/${item.apicategory}`)}
          >
            {item.title}
          </h2>
        ))}
      </div>
    </div>
  );
}
