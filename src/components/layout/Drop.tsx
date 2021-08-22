import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
export default function Example({ icon, ...props }) {
  return (
    <div className="  text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-gray-600">{icon}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 left-0 w-56 mt-2 origin-top-right bg-white  rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {props.children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export const MenuItem = ({ text, icon, onClick }) => {
  return (
    <div className="px-1 py-1 hover:bg-gray-200">
      <Menu.Item>
        <button
          onClick={onClick}
          type="button"
          className={
            "  text-gray-600 group flex rounded-md items-center w-full px-2 py-2"
          }
        >
          {icon}
          {text}
        </button>
      </Menu.Item>
    </div>
  );
};
