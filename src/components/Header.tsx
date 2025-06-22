
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Home, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    navigate('/');
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-utec-graphite/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo y Navegación */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h1 className="text-white font-bold text-xl">
              UTEC Diagram Studio
            </h1>
          </Link>

          {/* Navegación */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-white hover:text-utec-cyan hover:bg-white/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </Link>
            <Link to="/editor">
              <Button 
                variant={location.pathname === '/editor' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-white hover:text-utec-cyan hover:bg-white/10"
              >
                <Code className="w-4 h-4 mr-2" />
                Editor
              </Button>
            </Link>
          </nav>
        </div>

        {/* Acciones de Usuario */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && currentUser && (
            <div className="hidden sm:flex items-center space-x-2 text-white/80">
              <User className="w-4 h-4" />
              <span className="text-sm">{currentUser.name}</span>
            </div>
          )}
          
          <Button
            onClick={handleAuthAction}
            className={isAuthenticated 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "utec-button-primary text-white"
            }
            size="sm"
          >
            {isAuthenticated ? (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </>
            ) : (
              <>
                <User className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
