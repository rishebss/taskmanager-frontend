import React from 'react';
import Hero from '@/components/Hero';
import Todo from '@/components/Todo';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="dark bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero section - always visible */}
      <Hero />
      
      {/* Todo section - only visible when user is authenticated */}
      {user ? (
        <Todo />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Please login to access your todos
            </h3>
            <p className="text-gray-400">
              Sign in or create an account to start managing your tasks
            </p>
          </div>
        </div>
      )}
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Home;