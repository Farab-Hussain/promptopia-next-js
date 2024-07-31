"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const renderAuthButtons = (providersList) => (
    <>
      {providersList &&
        Object.values(providersList).map((provider) => (
          <button
            type='button'
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
          >
            Sign in
          </button>
        ))}
    </>
  );

  const renderUserMenu = (isDesktop = true) => (
    <div className={`flex ${isDesktop ? 'gap-3 md:gap-5' : ''}`}>
      {isDesktop && (
        <Link href='/create-prompt' className='black_btn'>
          Create Post
        </Link>
      )}
      {isDesktop ? (
        <button type='button' onClick={signOut} className='outline_btn'>
          Sign Out
        </button>
      ) : (
        <Image
          src={session?.user.image}
          width={37}
          height={37}
          className='rounded-full'
          alt='profile'
          onClick={() => setToggleDropdown(!toggleDropdown)}
        />
      )}
      {isDesktop && (
        <Link href='/profile'>
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className='rounded-full'
            alt='profile'
          />
        </Link>
      )}
      {!isDesktop && toggleDropdown && (
        <div className='dropdown'>
          <Link
            href='/profile'
            className='dropdown_link'
            onClick={() => setToggleDropdown(false)}
          >
            My Profile
          </Link>
          <Link
            href='/create-prompt'
            className='dropdown_link'
            onClick={() => setToggleDropdown(false)}
          >
            Create Prompt
          </Link>
          <button
            type='button'
            onClick={() => {
              setToggleDropdown(false);
              signOut();
            }}
            className='mt-5 w-full black_btn'
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? renderUserMenu() : renderAuthButtons(providers)}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? renderUserMenu(false) : renderAuthButtons(providers)}
      </div>
    </nav>
  );
};

export default Nav;