import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ReactComponent as Logo } from '../assets/logo.svg'
import LogoText from './LogoText'
import {  GoogleLogin } from "@react-oauth/google";
import AccountContext from '../contexts/AccountContext';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
/**
 * Navbar component for the site.
 * 
 */
export default function Navbar() {
  const {loggedIn, setLoggedIn} = useContext(AccountContext);
  const {userInfo, setUserInfo} = useContext(AccountContext);

  const onLogin = async (response) => {

    await axios.get(
      'https://localhost:7048/User/login',
      { headers: { Authorization: `Bearer ${response.credential}` } },
    ).then(res => {
      console.log(res);
      setLoggedIn(true);
      setUserInfo(res.data);
    }).catch(err => 
      console.log(err)
    );
  }

  const onLogout = async () => {
    setLoggedIn(false);
    setUserInfo({});
  }

  return (
    <Disclosure as="nav" className="bg-[#333533]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Logo className="block w-auto" alt="Site Logo"/>
                  <LogoText />
                </div>
              </div>
              

              {!loggedIn ? <GoogleLogin text="signin" type="icon" shape="pill" size="large" onSuccess={Response => onLogin(Response)} onError={() => console.log("failed")} />
              :
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userInfo.image}
                        alt=""
                      />
                    </Menu.Button>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={onLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                </div>
              }
            </div>
          </div>

        </>
      )}
    </Disclosure>
  )
}
