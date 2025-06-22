
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, AlertCircle } from 'lucide-react';
import { diagramService } from '@/services/diagrams';
import { authService } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import DiagramViewer from '@/components/DiagramViewer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

const EditorPage = () => {
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [diagramType, setDiagramType] = useState('AWS');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isAuthenticated = authService.isAuthenticated();

  const handleGenerateDiagram = async () => {
    if (!code.trim()) {
      toast({
        title: "Código requerido",
        description: "Por favor escribe algo de código antes de generar",
        variant: "destructive"
      });
      return;
    }

    if (!diagramType) {
      toast({
        title: "Tipo requerido",
        description: "Por favor selecciona un tipo de diagrama",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await diagramService.generateDiagram({
        code: code.trim(),
        type: diagramType
      });

      if (response.success) {
        setImageUrl(response.imageUrl);
        toast({
          title: "¡Diagrama generado!",
          description: isAuthenticated 
            ? `Tu diagrama ${diagramType} ha sido guardado en tu cuenta` 
            : `Diagrama ${diagramType} generado. Inicia sesión para guardarlo`,
        });
      } else {
        throw new Error('Error en la generación del diagrama');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      toast({
        title: "Error al generar",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!imageUrl) {
      toast({
        title: "No hay diagrama",
        description: "Primero genera un diagrama",
        variant: "destructive"
      });
      return;
    }

    try {
      const filename = `diagrama-${diagramType.toLowerCase()}-${Date.now()}`;
      await diagramService.downloadDiagram(imageUrl, format, filename);
      toast({
        title: "¡Descarga exitosa!",
        description: `Tu diagrama ha sido descargado en formato ${format}`,
      });
    } catch (err) {
      toast({
        title: "Error en descarga",
        description: err instanceof Error ? err.message : 'Error desconocido',
        variant: "destructive"
      });
    }
  };

  return (
    <div className="watercolor-bg min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header del Editor */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-utec-graphite mb-2">
              Editor de Diagramas as Code
            </h1>
            <p className="text-gray-600">
              {isAuthenticated 
                ? "Crea y guarda tus diagramas de forma segura" 
                : "Modo anónimo - Inicia sesión para guardar tu trabajo"
              }
            </p>
          </div>
          
          <Button
            onClick={handleGenerateDiagram}
            disabled={isLoading}
            size="lg"
            className="utec-button-primary text-white"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generando...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Generar Diagrama
              </>
            )}
          </Button>
        </div>

        {/* Panel Principal */}
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Panel Izquierdo - Editor */}
          <div className="h-full">
            <CodeEditor
              code={code}
              onChange={setCode}
              diagramType={diagramType}
              onDiagramTypeChange={setDiagramType}
              disabled={isLoading}
            />
          </div>

          {/* Panel Derecho - Visor */}
          <div className="h-full">
            <DiagramViewer
              imageUrl={imageUrl}
              isLoading={isLoading}
              error={error}
              onDownload={handleDownload}
              canDownload={isAuthenticated && !!imageUrl}
              diagramType={diagramType}
            />
          </div>
        </div>

        {/* Banner de Autenticación */}
        {!isAuthenticated && (
          <div className="mt-6 bg-gradient-to-r from-utec-cyan/10 to-utec-deep/10 border border-utec-cyan/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-utec-cyan mr-3" />
                <div>
                  <p className="text-utec-deep font-semibold">
                    ¿Quieres guardar tu trabajo?
                  </p>
                  <p className="text-gray-600 text-sm">
                    Inicia sesión para descargar y guardar tus diagramas
                  </p>
                </div>
              </div>
              <Link to="/login">
                <Button className="utec-button-primary text-white">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Login Requerido */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="utec-card border-0">
          <DialogHeader>
            <DialogTitle className="text-white text-center">
              Iniciar Sesión Requerido
            </DialogTitle>
            <DialogDescription className="text-white/70 text-center">
              Necesitas iniciar sesión para descargar diagramas
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link to="/login" className="flex-1">
              <Button className="w-full utec-button-primary text-white">
                Ir a Iniciar Sesión
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => setShowLoginModal(false)}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorPage;
