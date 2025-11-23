import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { NeonGlassCard, NeonButton, NeonInput, NeonText } from "@/components/NeonComponents";
import { useAuth } from "@/lib/useAuth";

export default function AuthPage() {
  const router = useRouter();
  const { signUp, signIn, isLoading, error, setError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // Removido o estado local de erro para usar o erro do useAuth()
  // const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa o erro global do useAuth() antes de tentar novamente

    try {
      if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      router.push("/");
    } catch (err) {
      // O erro já é tratado e setado dentro do useAuth()
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-dark via-neon-darker to-neon-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Glow Orbs */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-64 h-64 bg-neon-magenta/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <NeonGlassCard glowColor="cyan" className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta shadow-glow-cyan-lg flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-neon-dark">LUX</span>
            </motion.div>
            <NeonText size="2xl" glowColor="cyan">
              MANUS DESAGNI
            </NeonText>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/30 border border-red-500/50 text-red-300 p-3 rounded-lg mt-4 text-sm"
              >
                {error}
              </motion.div>
            )}
            <p className="text-white/60 mt-2">Creative Platform</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">Name</label>
                <NeonInput
                  placeholder="Your name"
                  glowColor="cyan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Email</label>
              <NeonInput
                placeholder="your@email.com"
                type="email"
                glowColor="cyan"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Password</label>
              <NeonInput
                placeholder="••••••••"
                type="password"
                glowColor="cyan"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* O erro agora é exibido logo abaixo do título */}

            <NeonButton
              glowColor="cyan"
              disabled={isLoading}
              className="w-full mt-6"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                isSignUp ? "Sign Up" : "Sign In"
              )}
            </NeonButton>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-6 text-white/70">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null); // Limpa o erro ao trocar de modo
              }}
              className="text-neon-cyan font-semibold hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </NeonGlassCard>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-white/50 text-sm mt-6"
        >
          Your data is synced across all devices with Firebase
        </motion.p>
      </motion.div>
    </div>
  );
}

