import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Ticket,
  Image as ImageIcon,
  LogOut,
  X,
  MessageSquare,
  Book,
  Send,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Ingredients', path: '/ingredients', icon: Package },
    { name: 'Custom Orders', path: '/custom-orders', icon: ShoppingCart },
    { name: 'Coupons', path: '/coupons', icon: Ticket },
    { name: 'Distributors', path: '/distributors', icon: Users },
    { name: 'Sliders', path: '/sliders', icon: ImageIcon },
    { name: 'Blogs', path: '/blogs', icon: Book },
    { name: 'Contacts', path: '/contacts', icon: MessageSquare },
    { name: 'Reminders', path: '/send-emails', icon: Send },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f1115] border-r border-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="text-xl font-bold font-['Pacifico',cursive] text-green-400 tracking-wide">
            Dilkhush<span className="text-white font-sans text-sm tracking-normal ml-1 bg-gray-800 px-2 py-1 rounded-md">Admin</span>
          </div>
          <button 
            className="lg:hidden text-gray-400 hover:text-white bg-gray-800 rounded-lg p-1"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-900/40 font-semibold' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors ${location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
