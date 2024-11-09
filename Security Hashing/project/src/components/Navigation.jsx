import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="glass-effect shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                Student Blockchain
              </motion.h1>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              {[
                { to: '/', label: 'Add Record' },
                { to: '/records', label: 'View Records' }
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="relative group"
                >
                  <span className={`
                    inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg
                    ${location.pathname === to
                      ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500'
                      : 'text-gray-600 hover:text-gray-900'
                    }
                    transition-all duration-200 ease-in-out
                  `}>
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}