
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Zap, Download, Shield, Sparkles, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

const LandingPage = () => {
  return (
    <div className="watercolor-bg min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-utec-graphite mb-6">
              Crea Diagramas
              <span className="block bg-gradient-to-r from-utec-cyan to-utec-deep bg-clip-text text-transparent">
                Mediante Código
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              UTEC Diagram Studio transforma tu código en diagramas profesionales. 
              Una herramienta potente y elegante para desarrolladores y diseñadores.
            </p>
          </div>

          {/* Botones Principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 fade-in-up">
            <Link to="/editor">
              <Button size="lg" className="utec-button-primary text-white px-8 py-3 text-lg">
                <Code className="w-5 h-5 mr-2" />
                Crear Diagrama Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-utec-cyan text-utec-deep hover:bg-utec-cyan hover:text-white px-8 py-3 text-lg"
              >
                <Shield className="w-5 h-5 mr-2" />
                Iniciar Sesión
              </Button>
            </Link>
          </div>

          {/* Vista Previa del Editor */}
          <div className="utec-card p-8 max-w-4xl mx-auto mb-16 fade-in-up">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="code-editor p-4">
                <div className="flex items-center mb-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-white/60 ml-4 text-sm">editor.utec</span>
                </div>
                <pre className="text-utec-light text-sm leading-relaxed">
{`// Ejemplo de diagrama
graph TD
    A[Usuario] --> B[Login]
    B --> C{¿Autenticado?}
    C -->|Sí| D[Editor]
    C -->|No| E[Registro]
    D --> F[Generar]
    F --> G[Descargar]`}
                </pre>
              </div>
              <div className="diagram-viewer p-4 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-utec-cyan mx-auto mb-3 float-animation" />
                  <p className="text-utec-deep font-semibold">Tu diagrama aparecerá aquí</p>
                  <p className="text-gray-600 text-sm mt-1">Genera visualizaciones profesionales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-utec-graphite mb-4">
            ¿Por qué elegir UTEC Diagram Studio?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Combina la potencia del código con la elegancia del diseño visual
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-utec-cyan to-utec-deep rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-utec-graphite mb-3">
                Diagram as Code
              </h3>
              <p className="text-gray-600">
                Escribe código intuitivo y genera diagramas profesionales automáticamente
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-utec-deep to-utec-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-utec-graphite mb-3">
                Generación Instantánea
              </h3>
              <p className="text-gray-600">
                Visualiza tus diagramas en tiempo real con nuestra tecnología avanzada
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-utec-light to-utec-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-utec-graphite mb-3">
                Descarga Protegida
              </h3>
              <p className="text-gray-600">
                Guarda tus trabajos de forma segura con autenticación integrada
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="bg-utec-graphite/90 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">
            © 2024 UTEC Diagram Studio. Herramienta de diagramas profesional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
