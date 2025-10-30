"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const socialLoginHandler = async (provider: "github" | "google") => {
    setIsLoading(true);
    try {
      await signIn(provider);
      // router.push("/") will be handled by the session effect
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during social login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Login logic
        await signIn("sanity-login", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        toast.success("Welcome back!");
        router.push("/");
      } else {
        // Sign up logic
        const user = await signUp(formData);
        if (user) {
          toast.success("Account created successfully! Please sign in.");
          setIsLoginMode(true); // Switch to login mode after successful registration
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(
        isLoginMode
          ? "Invalid credentials"
          : "Something went wrong during registration"
      );
    } finally {
      setIsLoading(false);
      if (!isLoginMode) {
        setFormData(defaultFormData);
      }
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData(defaultFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🔐</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-blue-100 text-sm">
              {isLoginMode
                ? "Sign in to your account to continue"
                : "Join us today and start your journey"}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="p-6 border-b border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => socialLoginHandler("google")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-sm">Google</span>
              </button>
              <button
                onClick={() => socialLoginHandler("github")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                <AiFillGithub className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                or continue with email
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>

          {/* Form */}
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            {!isLoginMode && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {!isLoginMode && (
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isLoginMode ? "Signing in..." : "Creating account..."}
                </span>
              ) : isLoginMode ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              {isLoginMode
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 transition-colors duration-200"
              >
                {isLoginMode ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
