// Interfaces para tipar los datos que esperamos del backend.
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
  // Las llaves para el almacenamiento local no cambian.
  private readonly TOKEN_KEY = 'utec_diagram_token';
  private readonly USER_KEY = 'utec_diagram_user';

  // --- ACTUALIZACIÓN #1: URL base de tu API desplegada ---
  // Centralizamos la URL de la API aquí.
  private readonly API_BASE = 'https://nyzvqsqlp5.execute-api.us-east-1.amazonaws.com/dev';

  /**
   * NUEVO MÉTODO: Implementa la llamada al endpoint de registro.
   */
  async register(email: string, password: string): Promise<any> {
    try {
      // Usamos el primer link: /auth/register
      const response = await fetch(`${this.API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error durante el registro.');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en AuthService.register:', error);
      throw error;
    }
  }
  
  /**
   * MÉTODO ACTUALIZADO: Implementa la llamada al endpoint de login.
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Usamos el segundo link: /auth/login
      const response = await fetch(`${this.API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales inválidas.');
      }
      
      const responseData: LoginResponse = await response.json();

      // Guardamos el token y los datos del usuario en el almacenamiento local.
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

  // --- El resto de los métodos no necesitan cambios ---
  // Su lógica de interactuar con el almacenamiento local es correcta.

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
