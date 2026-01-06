import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsSignup(searchParams.get("mode") === "signup");
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${isSignup ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      loginUser(data);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleMode = () => {
    navigate(`/auth?mode=${isSignup ? "login" : "signup"}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="w-[420px] rounded-3xl p-10 bg-[#0B1220] border border-white/10">
        <h2 className="text-3xl font-semibold text-center text-white mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <p className="text-center text-gray-400 mb-6">
          {isSignup
            ? "Create a new account to get started"
            : "Sign in to continue"}
        </p>

        {isSignup && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-4 p-3 bg-transparent border border-white/10 text-white rounded-xl outline-none"
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 bg-transparent border border-white/10 text-white rounded-xl outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-3 bg-transparent border border-white/10 text-white rounded-xl outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-semibold"
        >
          {isSignup ? "Create Account" : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span
                onClick={toggleMode}
                className="text-teal-400 cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={toggleMode}
                className="text-teal-400 cursor-pointer hover:underline"
              >
                Create Account
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
