import React from "react";
import { useNavigate } from "react-router-dom";

const TOKEN_KEY = "maya_auth_token";
const USER_KEY = "maya_auth_user";

function SignIn({ initialEmail = "" }) {
  const [formData, setFormData] = React.useState({ email: initialEmail });
  const [status, setStatus] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, email: initialEmail || prev.email }));
  }, [initialEmail]);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Generating your secure token..." });

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      const nextToken = data.token || "";
      localStorage.setItem(TOKEN_KEY, nextToken);
      if (data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      }
      const role = (data.user?.role || "").toLowerCase();
      setStatus({ type: "success", message: "Welcome back. Redirecting..." });
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-2xl lg:p-10">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Sign in
        </span>
        <h2 className="mt-3 text-2xl font-display font-bold text-ink">
          Continue your Maya plan
        </h2>
        <p className="mt-2 text-sm text-muted">
          Your saved meals, grocery flow, and progress are waiting.
        </p>
      </div>

      {status && (
        <div
          className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-lime/30 bg-lime/10 text-ink"
              : status.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-ink/10 bg-cream/70 text-ink"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-ink/20 bg-cream/30 p-3.5 text-ink focus:border-lime focus:ring-2 focus:ring-lime/20 focus:outline-none"
            placeholder="you@maya.com"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-ink py-4 text-lg font-semibold text-cream shadow-lg transition-all hover:bg-ink/90 hover:shadow-xl active:scale-95"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
