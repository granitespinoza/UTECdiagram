
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { authService } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);
      
      toast({
        title: "¡Bienvenido!",
        description: `Sesión iniciada como ${response.user.name}`,
      });

      // Redirigir al editor
      navigate('/editor');
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: error instanceof Error ? error.message : "Credenciales inválidas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="watercolor-bg min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-md mx-auto">
          {/* Botón de regreso */}
          <Link to="/" className="inline-flex items-center text-utec-deep hover:text-utec-cyan mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>

          {/* Formulario de Login */}
          <Card className="utec-card border-0 shadow-2xl">
            <CardHeader className="text-center space-y-2 pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">U</span>
              </div>
              <CardTitle className="text-2xl text-white">
                Iniciar Sesión
              </CardTitle>
              <CardDescription className="text-white/70">
                Accede a tu cuenta de UTEC Diagram Studio
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/60" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="utec-input pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-white/60" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="utec-input pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full utec-button-primary text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>

              {/* Demo Info */}
              <div className="mt-6 p-4 bg-utec-cyan/10 rounded-lg border border-utec-cyan/20">
                <p className="text-white/80 text-sm text-center">
                  <strong>Demo:</strong> Usa cualquier email y contraseña para probar
                </p>
              </div>

              {/* Link to Editor */}
              <div className="text-center pt-4">
                <p className="text-white/70 text-sm">
                  ¿Solo quieres probar? {' '}
                  <Link to="/editor" className="text-utec-cyan hover:text-utec-light underline">
                    Usar sin cuenta
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
