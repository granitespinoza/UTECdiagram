
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
  private readonly TOKEN_KEY = 'utec_diagram_token';
  private readonly USER_KEY = 'utec_diagram_user';

  // Simular backend serverless - en producción esto sería una URL real
  private readonly API_BASE = '/api';

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Simulación de llamada al backend
      console.log('Intentando login con:', { email, password });
      
      // Simular autenticación exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse: LoginResponse = {
        token: `mock_jwt_token_${Date.now()}`,
        user: {
          id: '1',
          email: email,
          name: email.split('@')[0]
        }
      };

      // Guardar token y usuario en localStorage
      localStorage.setItem(this.TOKEN_KEY, mockResponse.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockResponse.user));

      return mockResponse;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Credenciales inválidas');
    }
  }

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
