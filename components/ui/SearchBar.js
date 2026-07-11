'use client';
import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { debounce } from '@/lib/utils';

export default function SearchBar({ initialValue = '', onSearch }) {
  const [query, setQuery] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = debounce((value) => {
    if (onSearch) {
      onSearch(value);
    } else {
      router.push(`/?search=${encodeURIComponent(value)}`);
    }
  }, 300);

  useEffect(() => {
    if (query !== initialValue) {
      handleSearch(query);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, department, title, or email..."
          className="w-full px-6 py-4 pl-14 pr-14 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-poly-blue focus:ring-2 focus:ring-blue-200 transition-all bg-white shadow-sm"
        />
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        )}
      </div>
      {isLoading && (
        <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-poly-blue"></div>
        </div>
      )}
    </div>
  );
}