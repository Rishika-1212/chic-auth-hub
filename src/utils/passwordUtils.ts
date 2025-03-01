
import { PasswordStrength } from "../types/auth";

export const validatePassword = (password: string): PasswordStrength => {
  // Initialize with default values
  let score = 0;
  let feedback = "Password is too weak";
  let color = "bg-red-500";

  // Check for minimum length
  if (password.length >= 8) {
    score += 1;
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    score += 1;
  }

  // Check for numbers
  if (/[0-9]/.test(password)) {
    score += 1;
  }

  // Check for special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  // Assign feedback and color based on score
  switch (score) {
    case 0:
    case 1:
      feedback = "Password is too weak";
      color = "bg-red-500";
      break;
    case 2:
      feedback = "Password is weak";
      color = "bg-orange-500";
      break;
    case 3:
      feedback = "Password is moderate";
      color = "bg-yellow-500";
      break;
    case 4:
      feedback = "Password is strong";
      color = "bg-blue-500";
      break;
    case 5:
      feedback = "Password is very strong";
      color = "bg-green-500";
      break;
    default:
      break;
  }

  return { score, feedback, color };
};
