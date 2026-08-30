import { Menu, Search, Bell } from 'lucide-react';

const Header = ({ setIsOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 mr-4 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <div className="hidden md:flex relative text-gray-400 focus-within:text-green-600">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 bg-gray-100 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-green-500 to-green-300 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
