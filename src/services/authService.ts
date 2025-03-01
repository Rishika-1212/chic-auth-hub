
import { LoginCredentials, SignupCredentials, User } from "../types/auth";
import { toast } from "sonner";

// This would typically connect to your MongoDB API
// For now, we're simulating the behavior with localStorage
const API_URL = "/api/auth"; // Would point to your backend API

class AuthService {
  // localStorage key
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

  // Simulate signup - In a real app, this would call your MongoDB API
  async signup(credentials: SignupCredentials): Promise<User> {
    try {
      console.log("Signing up user:", credentials);
      
      // This is where you would call your MongoDB API
      // const response = await fetch(`${API_URL}/signup`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists in localStorage
      const existingUsers = this.getAllUsers();
      const userExists = existingUsers.some(user => user.email === credentials.email);
      
      if (userExists) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user object
      const newUser: User = {
        _id: Date.now().toString(), // simple ID for simulation
        name: credentials.name,
        email: credentials.email,
        // In a real app, NEVER store the raw password - it should be hashed on the server
      };
      
      // Save the user for simulation purposes
      this.saveUserToLocalStorage(newUser, credentials.password);
      
      // Save user to localStorage for auth state
      const userForAuth = { ...newUser };
      delete userForAuth.password; // Remove password from auth state
      this.saveUser(userForAuth);
      
      toast.success("Account created successfully!");
      return userForAuth;
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      }
      throw new Error("Failed to sign up. Please try again.");
    }
  }

  // Simulate login - In a real app, this would call your MongoDB API
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      console.log("Logging in user:", credentials);
      
      // This is where you would call your MongoDB API
      // const response = await fetch(`${API_URL}/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get all users from localStorage
      const users = this.getAllUsers();
      
      // Find user with matching email and password
      const user = users.find(
        user => user.email === credentials.email && user.password === credentials.password
      );
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      // Create a copy without password for auth state
      const authenticatedUser = { ...user };
      delete authenticatedUser.password;
      
      // Save to localStorage for auth state
      this.saveUser(authenticatedUser);
      
      toast.success("Login successful!");
      return authenticatedUser;
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

  // Helper methods for simulation
  
  // Get all users from localStorage
  private getAllUsers(): User[] {
    const usersJson = localStorage.getItem("users");
    return usersJson ? JSON.parse(usersJson) : [];
  }
  
  // Save a user to localStorage users array
  private saveUserToLocalStorage(user: User, password: string): void {
    const users = this.getAllUsers();
    users.push({ ...user, password });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export default new AuthService();
