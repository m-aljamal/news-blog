import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown() {
  const [session, loading] = useSession();
  const router = useRouter();
  const handleClick = () => {
    if (!session) {
      router.push("/login");
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-right">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="">
              <i
                className="far fa-user-circle   text-gray-500"
                onClick={handleClick}
              ></i>
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {session && (
                <div className="py-1">
                  {session.role === "ADMINISTRATOR" && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/dashboard">
                          <a
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            لوحة التحكم
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => signOut()}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        تسجيل الخروج
                      </p>
                    )}
                  </Menu.Item>
                </div>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
