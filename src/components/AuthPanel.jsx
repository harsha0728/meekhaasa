"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthPanel({ mode = "login" }) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.message) {
      setStatus({ type: "idle", message: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      let response;

      if (isLogin) {
        response = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
      } else {
        response = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo:
              typeof window !== "undefined"
                ? `${window.location.origin}/admin`
                : undefined,
          },
        });
      }

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (isLogin) {
        router.push("/admin");
        return;
      }

      setStatus({
        type: "success",
        message:
          "Account created. Please check your email and confirm your sign up before continuing.",
      });
      setForm({ email: "", password: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Authentication failed.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="auth-kicker">{isLogin ? "Welcome back" : "Create account"}</p>
        <h1>{isLogin ? "Admin login" : "Admin signup"}</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@meekhaasa.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength={6}
              required
            />
          </label>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? (isLogin ? "Signing in..." : "Creating account...") : isLogin ? "Login" : "Create account"}
          </button>
        </form>

        {status.message ? (
          <p className={`status-banner ${status.type}`} role="status" aria-live="polite">
            {status.message}
          </p>
        ) : null}

        <p className="auth-link-row">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <a href={isLogin ? "/admin/signup" : "/admin/login"}>
            {isLogin ? "Sign up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}
