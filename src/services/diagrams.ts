import { authService } from './auth';

// Las interfaces para las peticiones y respuestas se mantienen.
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
  // --- ACTUALIZACIÓN #1: Usamos la URL base real de tu API ---
  private readonly API_BASE = 'https://nyzvqsqlp5.execute-api.us-east-1.amazonaws.com/dev';

  /**
   * MÉTODO ACTUALIZADO: Llama al endpoint real /diagrams/generate para
   * iniciar la creación del diagrama. Requiere un token de autorización.
   */
  async generateDiagram(request: GenerateDiagramRequest): Promise<GenerateDiagramResponse> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('Debes iniciar sesión para generar diagramas.');
      }

      const endpoint = `${this.API_BASE}/diagrams/generate`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeaders(), // Incluye el 'Authorization: Bearer <token>'
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al generar el diagrama en el backend.');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en DiagramService.generateDiagram:', error);
      throw error; // Relanzamos el error para que la UI lo maneje.
    }
  }

  /**
   * MÉTODO ACTUALIZADO: Llama al endpoint /diagrams/download para obtener el archivo.
   * Requiere un token y el ID del diagrama que se quiere descargar.
   */
  async downloadDiagram(diagramId: string, format: string, filename: string = 'diagram'): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('Debes iniciar sesión para descargar diagramas.');
    }

    try {
      const endpoint = `${this.API_BASE}/diagrams/download`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.getAuthHeaders(),
        },
        // Enviamos los datos necesarios para que el backend sepa qué archivo buscar.
        body: JSON.stringify({ diagramId, format }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo descargar el archivo.');
      }

      // El backend responde con los datos del archivo (blob).
      const blob = await response.blob();
      
      // Creamos un enlace temporal en el navegador para iniciar la descarga.
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      
      // Limpiamos el enlace temporal.
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error en DiagramService.downloadDiagram:', error);
      throw new Error(`Error al descargar el diagrama en formato ${format}`);
    }
  }

  // --- MÉTODOS ELIMINADOS ---
  // Las funciones generateMockDiagramUrl y createMockSVG han sido eliminadas
  // porque ya no se necesita la simulación.
}

export const diagramService = new DiagramService();
export type { GenerateDiagramRequest, GenerateDiagramResponse };
