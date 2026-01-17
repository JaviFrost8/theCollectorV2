'use client';

import { useContextAuth } from '@/context/AuthContext';
import Link from 'next/link';

export const Navbar = () => {
  const { login, logout, user } = useContextAuth();

  return (
    <nav className="flex w-full justify-between px-20 py-5 border-b border-[#232f48]">
      <Link href="/">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#135BEC"
            className="icon icon-tabler icons-tabler-filled icon-tabler-device-tv-old"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8.707 2.293l3.293 3.292l3.293 -3.292a1 1 0 0 1 1.32 -.083l.094 .083a1 1 0 0 1 0 1.414l-2.293 2.293h4.586a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h4.585l-2.292 -2.293a1 1 0 0 1 1.414 -1.414m10.293 5.707h-2a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-9a1 1 0 0 0 -1 -1" />
            <path d="M18 14a1 1 0 0 1 .993 .883l.007 .127a1 1 0 0 1 -1.993 .117l-.007 -.127a1 1 0 0 1 1 -1" />
            <path d="M18 11a1 1 0 0 1 .993 .883l.007 .127a1 1 0 0 1 -1.993 .117l-.007 -.127a1 1 0 0 1 1 -1" />
          </svg>
          <h2 className="pt-0.5 px-2">El Colector</h2>
        </div>
      </Link>
      {!user ? (
        <ul className="flex gap-4">
          <li className="cursor-pointer" onClick={login}>
            Login
          </li>
          <li>
            <Link href={'/search'}>Buscar</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-4">
          <li>
            <Link href={'/'}>Dashboard</Link>
          </li>
          <li>
            <Link href={'/collection'}>Mi Colección</Link>
          </li>
          <li>
            <Link href={'/favorites'}>Favoritos</Link>
          </li>
          <li>
            <Link href={'/search'}>Buscar</Link>
          </li>
          <li onClick={logout}>
            <button className="cursor-pointer">Logout</button>
          </li>
        </ul>
      )}
    </nav>
  );
};
