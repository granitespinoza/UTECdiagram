
import { authService } from './auth';

interface GenerateDiagramRequest {
  code: string;
  type: string;
}

interface GenerateDiagramResponse {
  imageUrl: string;
  id?: string;
  success: boolean;
}

class DiagramService {
  private readonly API_BASE = '/api';

  async generateDiagram(request: GenerateDiagramRequest): Promise<GenerateDiagramResponse> {
    try {
      console.log('Generando diagrama...', request);
      
      // Simular llamada al backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Headers condicionales según autenticación
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...authService.getAuthHeaders()
      };

      console.log('Headers enviados:', headers);

      // Simular respuesta exitosa con imagen mock específica por tipo
      const mockResponse: GenerateDiagramResponse = {
        imageUrl: this.generateMockDiagramUrl(request.code, request.type),
        id: authService.isAuthenticated() ? `diagram_${Date.now()}` : undefined,
        success: true
      };

      return mockResponse;
    } catch (error) {
      console.error('Error generando diagrama:', error);
      throw new Error('Error al generar el diagrama');
    }
  }

  private generateMockDiagramUrl(code: string, type: string): string {
    // Generar una imagen SVG específica basada en el tipo y código
    const svg = this.createMockSVG(code, type);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }

  private createMockSVG(code: string, type: string): string {
    const lines = code.split('\n').filter(line => line.trim());
    const height = Math.max(250, lines.length * 40 + 100);
    
    // Colores y estilos específicos por tipo
    const typeConfig = {
      'AWS': { color: '#FF9900', icon: '☁️', label: 'Arquitectura AWS' },
      'ER': { color: '#336791', icon: '🛢️', label: 'Diagrama ER' },
      'JSON': { color: '#F7DF1E', icon: '{}', label: 'Estructura JSON' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.AWS;
    
    return `
      <svg width="450" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${config.color};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#0073B1;stop-opacity:0.6" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" rx="16" filter="url(#shadow)"/>
        
        <!-- Header -->
        <rect x="20" y="20" width="410" height="50" fill="rgba(255,255,255,0.15)" rx="8"/>
        <text x="35" y="35" font-family="IBM Plex Mono, monospace" font-size="12" fill="white" opacity="0.8">
          UTEC Diagram Studio
        </text>
        <text x="35" y="55" font-family="IBM Plex Mono, monospace" font-size="16" fill="white" font-weight="bold">
          ${config.icon} ${config.label}
        </text>
        
        <!-- Code representation -->
        ${lines.slice(0, 8).map((line, index) => 
          `<rect x="30" y="${90 + index * 30}" width="${Math.min(390, line.length * 7 + 30)}" height="22" 
                 fill="rgba(255,255,255,0.1)" rx="4"/>
           <text x="40" y="${105 + index * 30}" font-family="IBM Plex Mono, monospace" font-size="10" 
                 fill="white" opacity="0.9">${line.substring(0, 50)}${line.length > 50 ? '...' : ''}</text>`
        ).join('')}
        
        <!-- Status -->
        <text x="30" y="${height - 30}" font-family="IBM Plex Mono, monospace" font-size="10" 
              fill="rgba(255,255,255,0.7)">
          ${authService.isAuthenticated() ? '🔐 Usuario autenticado' : '👤 Usuario anónimo'} | Generado: ${new Date().toLocaleTimeString()}
        </text>
        
        <!-- Mock diagram elements -->
        <g transform="translate(300, 100)">
          <circle cx="30" cy="30" r="15" fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="2"/>
          <circle cx="80" cy="60" r="15" fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="2"/>
          <circle cx="30" cy="90" r="15" fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="2"/>
          <line x1="45" y1="30" x2="65" y2="60" stroke="white" stroke-width="2" opacity="0.8"/>
          <line x1="30" y1="75" x2="30" y2="45" stroke="white" stroke-width="2" opacity="0.8"/>
        </g>
      </svg>
    `;
  }

  async downloadDiagram(imageUrl: string, format: string, filename: string = 'diagram'): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('Debes iniciar sesión para descargar diagramas');
    }

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error descargando diagrama:', error);
      throw new Error(`Error al descargar el diagrama en formato ${format}`);
    }
  }
}

export const diagramService = new DiagramService();
export type { GenerateDiagramRequest, GenerateDiagramResponse };
