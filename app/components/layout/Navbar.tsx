'use client';

import { useEffect, useState } from 'react';
import { useContextAuth } from '@/context/AuthContext';
import Link from 'next/link';

export const Navbar = () => {
  const { login, logout, user } = useContextAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsOpen(false);
    }
  }, [user]);

  return (
    <nav className="w-full md:flex md:justify-between border-b border-[#232f48] px-6 py-5 select-none focus:outline-none">
      <div className="flex justify-between items-center">
        <Link href={user ? '/dashboard' : '/search'}>
          <div className="flex items-center">
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
            <h2 className="pt-0.5 px-2 text-lg font-semibold">El Colector</h2>
          </div>
        </Link>

        {user ? (
          <button
            type="button"
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        ) : (
          <li
            className="flex md:hidden justify-end cursor-pointer"
            onClick={login}
          >
            Iniciar sesión
          </li>
        )}
      </div>

      {/* Menú */}
      <ul
        className={`flex-col md:flex-row md:flex gap-4 mt-4 md:mt-1 ${
          isOpen ? 'flex' : 'hidden md:flex'
        }`}
      >
        {!user ? (
          <li className="flex justify-end cursor-pointer" onClick={login}>
            Iniciar sesión
          </li>
        ) : (
          <>
            <li>
              <Link href={'/'} onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href={'/collection'} onClick={() => setIsOpen(false)}>
                Mi Colección
              </Link>
            </li>
            <li>
              <Link href={'/random'} onClick={() => setIsOpen(false)}>
                Que Veo
              </Link>
            </li>
            <li>
              <Link href={'/search'} onClick={() => setIsOpen(false)}>
                Buscar
              </Link>
            </li>
            <li>
              <button onClick={logout} className="cursor-pointer">
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
