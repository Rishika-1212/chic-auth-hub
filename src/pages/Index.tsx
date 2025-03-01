
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { LoginCredentials, SignupCredentials } from "@/types/auth";
import authService from "@/services/authService";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const user = authService.getCurrentUser();
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.login(credentials);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (credentials: SignupCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.signup(credentials);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-auth-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-effect p-6 sm:p-10 rounded-2xl shadow-glass">
          <div className="mb-8 text-center">
            <div className="inline-block animate-pulse-slow">
              <div className="h-16 w-16 bg-gradient-to-br from-royal to-skyblue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-white"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Authentication</h1>
            <div className="w-16 h-1 bg-royal mx-auto mt-3 rounded-full"></div>
          </div>

          <AuthForm
            onLogin={handleLogin}
            onSignup={handleSignup}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
