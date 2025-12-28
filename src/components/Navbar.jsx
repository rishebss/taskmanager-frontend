import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaGithub, FaUser, FaSignOutAlt, FaRocket } from 'react-icons/fa';
import { Sparkles, Layout, Menu, X, LogOut, Github, User } from 'lucide-react';
import { BiTask } from "react-icons/bi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };



  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${isScrolled
        ? 'bg-gray-950/80 backdrop-blur-xl border-b border-white/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group flex items-center gap-2">
              <div className="relative">
                <div className="relative bg-gray-900 rounded-lg p-1.5 border border-white/10">
                  <BiTask className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 group-hover:to-blue-400 transition-all duration-300">
                Taskly
              </span>
            </Link>


          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/rishebss/taskmanager-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>

            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-all"
                  >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 p-2 bg-gray-950/90 backdrop-blur-xl border border-white/10 text-gray-200 rounded-2xl shadow-2xl">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-white/5 cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 rounded-xl focus:bg-red-500/10 text-red-400 focus:text-red-400 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-6">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-6">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-4">


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl border border-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[90vw] mt-4 p-4 bg-gray-950/95 backdrop-blur-2xl border border-white/10 text-gray-200 rounded-3xl shadow-2xl space-y-2"
              >
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                      <p className="text-xs text-gray-500 mb-1">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-3 p-3 rounded-2xl focus:bg-white/5">
                        <User className="h-5 w-5 text-blue-400" />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href="https://github.com/rishebss/taskmanager-frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-2xl focus:bg-white/5"
                      >
                        <Github className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">GitHub</span>
                      </a>
                    </DropdownMenuItem>
                    <div className="h-px bg-white/5 my-2"></div>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 p-3 rounded-2xl focus:bg-red-500/10 text-red-100 focus:text-red-400 cursor-pointer"
                    >
                      <LogOut className="h-5 w-5 text-red-400" />
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div className="space-y-1">
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center gap-3 p-3 rounded-2xl focus:bg-white/5">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="flex items-center gap-3 p-3 rounded-2xl focus:bg-white/5">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        <span className="font-medium">Register</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href="https://github.com/rishebss/taskmanager-frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-2xl focus:bg-white/5"
                      >
                        <Github className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">GitHub</span>
                      </a>
                    </DropdownMenuItem>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;