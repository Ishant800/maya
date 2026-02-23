import React from "react";

function CreateAccount({ onSuccess }) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "client",
    auth_provider_id: "",
    profile_image_url: "",
  });
  const [status, setStatus] = React.useState(null);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Creating your Maya profile..." });

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setStatus({ type: "success", message: "Account created. You're ready to sign in." });
      if (onSuccess) onSuccess(formData.email);
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
          Create account
        </span>
        <h2 className="mt-3 text-2xl font-display font-bold text-ink">
          Start your calm nutrition journey
        </h2>
        <p className="mt-2 text-sm text-muted">
          Maya adapts your meals to your rhythm, preferences, and goals.
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

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

  <div>
    <label className="mb-1.5 block text-sm font-medium text-ink">
      Full Name
    </label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="w-full rounded-xl border border-ink/20 bg-cream/30 p-3 text-ink 
      focus:border-lime focus:ring-2 focus:ring-lime/20 focus:outline-none"
      placeholder="e.g. Maya Rivera"
      required
    />
  </div>

  <div>
    <label className="mb-1.5 block text-sm font-medium text-ink">
      Email
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full rounded-xl border border-ink/20 bg-cream/30 p-3 text-ink 
      focus:border-lime focus:ring-2 focus:ring-lime/20 focus:outline-none"
      placeholder="you@example.com"
      required
    />
  </div>

  <div>
    <label className="mb-1.5 block text-sm font-medium text-ink">
      Role
    </label>
    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      className="w-full rounded-xl border border-ink/20 bg-cream/30 p-3 text-ink 
      focus:border-lime focus:ring-2 focus:ring-lime/20 focus:outline-none"
    >
      <option value="visitor">Visitor</option>
      <option value="client">Client</option>
      <option value="admin">Admin</option>
    </select>
  </div>

  {/* Create Account Button */}
  <button
    type="submit"
    className="w-full mt-4 rounded-xl bg-ink py-3.5 text-lg font-semibold text-cream 
    shadow-md transition-all hover:bg-ink/90 hover:shadow-lg active:scale-95"
  >
    Create Account
  </button>

  {/* Google Sign In Button */}
  <button
    type="button"
    className="w-full flex items-center justify-center gap-2 mt-2 rounded-xl 
    border border-gray-300 py-3 text-ink bg-white hover:bg-gray-100 transition"
  >
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      alt="Google"
      className="w-5 h-5"
    />
    Continue with Google
  </button>

  <p className="text-center text-xs text-muted mt-3">
    By continuing, you agree to our Terms and Privacy Policy
  </p>

  <p className="text-center text-sm text-ink mt-2">
    Already have an account?{" "}
    <span className="text-lime font-semibold cursor-pointer">
      Sign in
    </span>
  </p>

</form>

    </div>
  );
}

export default CreateAccount;
