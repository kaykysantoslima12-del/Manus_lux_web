import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { GlassText, GlassButton, GlassCard } from "@/components/GlassComponents";
import { FiArrowLeft, FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { useAuth } from "@/lib/useAuth";
import { useAppStore } from "@/lib/store";

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { user } = useAppStore();

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-glass text-glass p-4 sm:p-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-glass-cyan hover:text-glass transition-colors z-10"
      >
        <FiArrowLeft />
        Home
      </motion.button>

      <div className="max-w-4xl mx-auto pt-16 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <GlassText size="2xl" variant="purple" className="mb-2">
            Settings (Configurações)
          </GlassText>
          <p className="text-glass/70 text-lg">
            Gerencie seu perfil e sua conta LUX.
          </p>
        </motion.div>

        <div className="space-y-6">
          <GlassCard variant="blue" className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-glass-cyan">
              <FiUser /> Perfil
            </h3>
            <p className="text-glass/80">
              **Nome:** {user?.name || "Usuário LUX"}
            </p>
            <p className="text-glass/80">
              **Email:** {user?.email || "N/A"}
            </p>
            <p className="text-glass/80">
              **ID:** {user?.id || "N/A"}
            </p>
          </GlassCard>

          <GlassCard variant="purple" className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-glass-pink">
              <FiSettings /> Opções
            </h3>
            <GlassButton
              variant="orange"
              className="w-full flex items-center justify-center gap-2 mt-4"
              onClick={handleLogout}
            >
              <FiLogOut /> Sair da Conta (Logout)
            </GlassButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
