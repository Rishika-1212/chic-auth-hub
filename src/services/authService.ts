
import { LoginCredentials, SignupCredentials, User } from "../types/auth";
import { toast } from "sonner";

// API URL for our MongoDB backend
const API_URL = "http://localhost:5000/api/auth";

class AuthService {
  // localStorage key for persisting session
  private readonly STORAGE_KEY = "auth_user";

  // Get the current user from localStorage
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Save user to localStorage
  private saveUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  // Remove user from localStorage
  private removeUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Signup user with MongoDB backend
  async signup(credentials: SignupCredentials): Promise<User> {
    try {
      console.log("Signing up user:", credentials);
      
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }
      
      const userData = await response.json();
      
      // Save user to localStorage for auth state
      this.saveUser(userData);
      
      toast.success("Account created successfully!");
      return userData;
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      }
      throw new Error("Failed to sign up. Please try again.");
    }
  }

  // Login user with MongoDB backend
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      console.log("Logging in user:", credentials);
      
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid email or password");
      }
      
      const userData = await response.json();
      
      // Save to localStorage for auth state
      this.saveUser(userData);
      
      toast.success("Login successful!");
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      }
      throw new Error("Failed to log in. Please try again.");
    }
  }

  // Logout user
  logout(): void {
    this.removeUser();
    toast.info("Logged out successfully");
  }
}

export default new AuthService();
