// Definimos los tipos de datos que esperamos del backend.
// Estos no cambian.
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
}

class AuthService {
  // Las llaves para guardar en el almacenamiento local se mantienen.
  private readonly TOKEN_KEY = 'utec_diagram_token';
  private readonly USER_KEY = 'utec_diagram_user';

  // ACTUALIZACIÓN 1: Usamos la URL base real de tu API desplegada.
  private readonly API_BASE = 'https://nyzvqsqlp5.execute-api.us-east-1.amazonaws.com/dev';

  // NUEVO MÉTODO: Implementamos la llamada al endpoint de registro.
  async register(email: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${this.API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Si la respuesta no es exitosa, leemos el error y lo lanzamos.
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error durante el registro.');
      }

      // Devolvemos la respuesta exitosa del backend.
      return await response.json();
    } catch (error) {
      console.error('Error en AuthService.register:', error);
      throw error; // Relanzamos el error para que la UI pueda manejarlo.
    }
  }
  
  // ACTUALIZACIÓN 2: Reemplazamos la simulación del login con la llamada real.
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales inválidas.');
      }
      
      const responseData: LoginResponse = await response.json();

      // Si la respuesta del backend es exitosa y contiene el token/usuario, los guardamos.
      if (responseData.token && responseData.user) {
        localStorage.setItem(this.TOKEN_KEY, responseData.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(responseData.user));
      }

      return responseData;
    } catch (error) {
      console.error('Error en AuthService.login:', error);
      throw error;
    }
  }

  // --- No se necesitan cambios en los siguientes métodos ---

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();
export type { User, LoginResponse };
