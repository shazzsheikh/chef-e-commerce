import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Adminlogin() {
  const navigate = useNavigate();

  // Prefilled values (change as needed)
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((s) => !s);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        email,
        password,
      });
      alert("successfully login");
      console.log("data", res.data);
      if (res.data.admintoken) {
        localStorage.setItem("admintoken", res.data.admintoken);
        localStorage.setItem("adminname", res.data.admin.name);
        navigate("/admin/home");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  };

  return (
    // backdrop covering full screen so card appears in front
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl">Admin Login</CardTitle>
              <CardDescription>
                Sign in to access the admin dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Email */}
              <label className="block mb-3">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              {/* Password with toggle */}
              <label className="block mb-1">
                <span className="text-sm font-medium">Password</span>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 text-sm text-gray-600 hover:text-gray-900"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      // fallback text if lucide-react not installed
                      <span className="sr-only">Hide</span>
                    ) : (
                      <span className="sr-only">Show</span>
                    )}
                    {/* If lucide-react installed, you can use:
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />} */}
                  </button>
                </div>
              </label>

              {/* Error */}
              {error && (
                <div className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Forgot password */}
              <div className="mt-3 text-right">
                <Link
                  to="/admin/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>

            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
