import React, { useState } from "react";
import api from "@/api";
import { AuthStore } from "@/stores/AuthStore";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 Lucide icons

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  const setToken = AuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError(null);
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.post("/login", { username, password });
      if (response.status === 200) {
        const res = response.data;
        const new_token = res.token;
        setToken(new_token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setError("Username or Password is Incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition all duration-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mx-auto transition-all duration-300"
        aria-label="login form"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          Sign in
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-900 p-3 rounded">
            {error}
          </div>
        )}

        {/* Username */}
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your.username"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 mb-1
            ${
              usernameError
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            }`}
          autoComplete="username"
        />
        {usernameError && (
          <p className="text-xs text-red-600 mb-3">{usernameError}</p>
        )}

        {/* Password */}
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // 👈 toggle input type
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 mb-1 pr-10
              ${
                passwordError
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              }`}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {passwordError && (
          <p className="text-xs text-red-600 mb-3">{passwordError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
