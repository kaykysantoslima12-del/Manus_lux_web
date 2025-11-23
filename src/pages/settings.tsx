import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { NeonText, NeonButton, NeonCard } from "@/components/NeonComponents";
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
    <div className="min-h-screen bg-gradient-to-br from-neon-dark via-neon-darker to-neon-dark text-white p-4 sm:p-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-neon-cyan hover:text-white transition-colors z-10"
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
          <NeonText size="2xl" glowColor="magenta" className="mb-2">
            Settings (Configurações)
          </NeonText>
          <p className="text-white/70 text-lg">
            Gerencie seu perfil e sua conta LUX.
          </p>
        </motion.div>

        <div className="space-y-6">
          <NeonCard glowColor="cyan" className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neon-cyan">
              <FiUser /> Perfil
            </h3>
            <p className="text-white/80">
              **Nome:** {user?.name || "Usuário LUX"}
            </p>
            <p className="text-white/80">
              **Email:** {user?.email || "N/A"}
            </p>
            <p className="text-white/80">
              **ID:** {user?.id || "N/A"}
            </p>
          </NeonCard>

          <NeonCard glowColor="magenta" className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neon-pink">
              <FiSettings /> Opções
            </h3>
            <NeonButton
              glowColor="orange"
              className="w-full flex items-center justify-center gap-2 mt-4"
              onClick={handleLogout}
            >
              <FiLogOut /> Sair da Conta (Logout)
            </NeonButton>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
