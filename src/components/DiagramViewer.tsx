
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Loader2, AlertCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface DiagramViewerProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onDownload: (format: string) => void;
  canDownload: boolean;
  diagramType: string;
}

const DiagramViewer: React.FC<DiagramViewerProps> = ({ 
  imageUrl, 
  isLoading, 
  error, 
  onDownload, 
  canDownload,
  diagramType 
}) => {
  const downloadFormats = [
    { format: 'PNG', label: 'Descargar PNG', extension: '.png' },
    { format: 'SVG', label: 'Descargar SVG', extension: '.svg' },
    { format: 'PDF', label: 'Descargar PDF', extension: '.pdf' }
  ];

  return (
    <Card className="diagram-viewer h-full border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-utec-graphite flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Visor de Diagramas
            {diagramType && (
              <span className="ml-2 text-sm bg-utec-cyan/20 text-utec-cyan px-2 py-1 rounded-full">
                {diagramType}
              </span>
            )}
          </div>
          {imageUrl && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className={canDownload 
                    ? "utec-button-primary text-white" 
                    : "bg-gray-400 text-white cursor-not-allowed"
                  }
                  disabled={!canDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="utec-card border-0">
                {downloadFormats.map((item) => (
                  <DropdownMenuItem
                    key={item.format}
                    onClick={() => onDownload(item.format)}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex items-center justify-center p-4">
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-utec-cyan animate-spin mx-auto mb-4" />
            <p className="text-utec-deep font-semibold">Generando diagrama...</p>
            <p className="text-gray-600 text-sm mt-1">
              Procesando {diagramType ? `diagrama de ${diagramType}` : 'diagrama'}
            </p>
          </div>
        ) : error ? (
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 font-semibold">Error al generar</p>
            <p className="text-gray-600 text-sm mt-1">{error}</p>
          </div>
        ) : imageUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt={`Diagrama ${diagramType} generado`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              style={{ minHeight: '200px' }}
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-utec-cyan/20 to-utec-deep/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-12 h-12 text-utec-cyan" />
            </div>
            <p className="text-utec-deep font-semibold">Listo para generar</p>
            <p className="text-gray-600 text-sm mt-1">
              Selecciona un tipo de diagrama, escribe código y haz clic en "Generar Diagrama"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagramViewer;
