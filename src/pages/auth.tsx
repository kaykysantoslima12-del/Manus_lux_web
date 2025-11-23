import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { GlassCard, GlassButton, GlassInput, GlassText } from "@/components/GlassComponents";
import { useAuth } from "@/lib/useAuth";

export default function AuthPage() {
  const router = useRouter();
  const { signUp, signIn, isLoading, error, setError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      router.push("/");
    } catch (err) {
      // Erro já tratado no useAuth
    }
  };

  return (
    <div className="min-h-screen bg-gradient-glass flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-glass-blue/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-glass-purple/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <GlassCard className="p-8 sm:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            {/* Modern Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-blue shadow-glass-lg flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">M</div>
                <div className="text-xs text-white/80 font-semibold">LUX</div>
              </div>
            </motion.div>

            <GlassText variant="blue" size="2xl" weight="bold" className="block mb-2">
              MANUS DESAGNI
            </GlassText>
            <GlassText className="text-glass-secondary">
              Creative Platform
            </GlassText>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-2xl glass-card-pink"
              >
                <p className="text-sm text-glass font-medium">{error}</p>
              </motion.div>
            )}
          </div>

          {/* Toggle Sign In / Sign Up */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                !isSignUp
                  ? "glass-button"
                  : "bg-transparent text-glass-secondary hover:bg-white/5"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                isSignUp
                  ? "glass-button"
                  : "bg-transparent text-glass-secondary hover:bg-white/5"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-glass font-semibold text-sm mb-2 ml-1">
                  <FiUser className="inline mr-2" />
                  Name
                </label>
                <GlassInput
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label className="block text-glass font-semibold text-sm mb-2 ml-1">
                <FiMail className="inline mr-2" />
                Email
              </label>
              <GlassInput
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-glass font-semibold text-sm mb-2 ml-1">
                <FiLock className="inline mr-2" />
                Password
              </label>
              <GlassInput
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <GlassButton
                variant="blue"
                size="lg"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                    <FiArrowRight />
                  </div>
                )}
              </GlassButton>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <GlassText className="text-glass-secondary text-sm">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-glass-blue font-semibold hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </GlassText>
          </div>
        </GlassCard>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <GlassText className="text-glass-secondary text-xs">
            By continuing, you agree to our Terms & Privacy Policy
          </GlassText>
        </motion.div>
      </motion.div>
    </div>
  );
}
