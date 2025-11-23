import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiHome, FiEdit3, FiShoppingBag, FiDollarSign, FiUser, FiVideo, FiSettings } from "react-icons/fi";
import { NeonGlassCard, NeonText, NeonCard, NeonBadge } from "@/components/NeonComponents";
import { logEvent } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { posts, transactions } = useAppStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neon-dark via-neon-darker to-neon-dark flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-2 border-neon-cyan border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const handleFeatureClick = (title: string) => {
    const path = `/${title.toLowerCase()}`;
    logEvent("feature_click", { feature_name: title });
    router.push(path);
  };

  const handleNavClick = (label: string) => {
    if (label === "Home") {
      router.push("/");
    } else {
      const path = `/${label.toLowerCase()}`;
      logEvent("nav_click", { nav_label: label });
      router.push(path);
    }
  };

  const features = [
    { icon: <FiEdit3 />, title: "Canvas", desc: "Create & Edit", color: "magenta" as const },
    { icon: <FiVideo />, title: "LUX Feed", desc: "AI Creations Stream", color: "orange" as const },
    { icon: <FiShoppingBag />, title: "Marketplace", desc: "Buy & Sell", color: "orange" as const },
    { icon: <FiDollarSign />, title: "Wallet", desc: "Manage Coins", color: "cyan" as const },
    { icon: <FiSettings />, title: "Settings", desc: "Configurações", color: "magenta" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-dark via-neon-darker to-neon-dark text-white">
      {/* Floating Glow Orbs */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed top-10 right-10 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="fixed bottom-10 left-10 w-80 h-80 bg-neon-magenta/5 rounded-full blur-3xl pointer-events-none"
      />

      {/* ZONE 1: HERO SECTION */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <NeonText size="2xl" glowColor="cyan" className="block mb-2">
            MANUS DESAGNI LUX
          </NeonText>
          <p className="text-white/60 text-lg mb-8">Welcome back, {user?.name || "Creator"}!</p>

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <NeonCard glowColor="cyan" className="text-center">
              <p className="text-2xl font-bold text-neon-cyan">{posts.length}</p>
              <p className="text-white/60 text-sm">Posts</p>
            </NeonCard>
            <NeonCard glowColor="green" className="text-center">
              <p className="text-2xl font-bold text-neon-green">{user?.manusCoins || 0}</p>
              <p className="text-white/60 text-sm">Coins</p>
            </NeonCard>
            <NeonCard glowColor="magenta" className="text-center">
              <p className="text-2xl font-bold text-neon-magenta">{transactions.length}</p>
              <p className="text-white/60 text-sm">Transactions</p>
            </NeonCard>
          </div>
        </motion.div>
      </section>

      {/* ZONE 2: FEATURES GRID */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            <NeonText glowColor="cyan">Features</NeonText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => handleFeatureClick(feature.title)}
              >
                <NeonCard
                  glowColor={feature.color}
                  icon={feature.icon}
                  title={feature.title}
                  className="h-full cursor-pointer hover:scale-105"
                >
                  <p className="text-white/70">{feature.desc}</p>
                </NeonCard>
              </motion.div>
            ))}
          </div>

          {/* Recent Posts */}
          {posts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">
                <NeonText glowColor="cyan">Recent Posts</NeonText>
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <NeonGlassCard glowColor="cyan" className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-neon-cyan">{post.title}</h4>
                          <p className="text-white/60 text-sm">{post.description}</p>
                        </div>
                        <NeonBadge glowColor="green">{post.likes} ❤️</NeonBadge>
                      </div>
                    </NeonGlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ZONE 3: BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-neon-dark to-neon-dark/80 backdrop-blur-glass border-t border-neon-cyan/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-around items-center">
            {[
              { icon: <FiHome />, label: "Home", color: "cyan" },
              { icon: <FiEdit3 />, label: "Canvas", color: "purple" },
              { icon: <FiVideo />, label: "Feed", color: "red" },
              { icon: <FiShoppingBag />, label: "Marketplace", color: "orange-red" },
              { icon: <FiDollarSign />, label: "Wallet", color: "cyan" },
              { icon: <FiUser />, label: "Settings", color: "pink" },
            ].map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.label)}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 ${
                  idx === 0
                    ? `text-neon-${item.color} shadow-glow-${item.color}`
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-semibold">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacing for fixed nav */}
      <div className="h-24" />
    </div>
  );
}
