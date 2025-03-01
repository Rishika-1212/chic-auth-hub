
import React, { useEffect, useState } from "react";
import { validatePassword } from "../../utils/passwordUtils";
import { PasswordStrength } from "../../types/auth";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: "",
    color: "bg-gray-300",
  });

  useEffect(() => {
    if (password) {
      setStrength(validatePassword(password));
    } else {
      setStrength({
        score: 0,
        feedback: "",
        color: "bg-gray-300",
      });
    }
  }, [password]);

  // Don't show the meter if password is empty
  if (!password) {
    return null;
  }

  return (
    <div className="mt-2 space-y-2 animate-fade-in">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300 ease-out`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{strength.feedback}</p>
    </div>
  );
};

export default PasswordStrengthMeter;
