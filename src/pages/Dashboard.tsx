
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    // If no user is authenticated, redirect to login page
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-indigo">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto glass-effect rounded-2xl shadow-glass p-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to Your Dashboard
            </h1>
            <div className="h-1 w-24 bg-royal-light mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-white/80">
              Hello, {user.name}! You're successfully logged in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 rounded-xl p-6 animate-slide-up animate-delay-100">
              <h2 className="text-xl font-semibold text-white mb-3">Your Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-white/60 text-sm">Name</p>
                  <p className="text-white">{user.name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 animate-slide-up animate-delay-200">
              <h2 className="text-xl font-semibold text-white mb-3">Account Status</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  <p className="text-green-400 font-medium">Active</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Member Since</p>
                  <p className="text-white">Today</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center animate-slide-up animate-delay-300">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
