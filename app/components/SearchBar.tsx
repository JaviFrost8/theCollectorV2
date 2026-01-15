'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SearchBarProps {
  initialSearch?: string;
}

export const SearchBar = ({ initialSearch = '' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/search?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center w-full mx-20 py-6"
    >
      <input
        type="text"
        value={searchTerm}
        placeholder="Buscar película por título"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[80%] px-5 py-2 mr-8 bg-[#232F48] rounded-md focus:outline-none"
      />

      <button
        className="cursor-pointer py-3 px-8 rounded-md bg-[#232F48]"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
};
