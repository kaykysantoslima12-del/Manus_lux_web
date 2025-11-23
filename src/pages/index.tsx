import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiHome, FiEdit3, FiShoppingBag, FiDollarSign, FiUser, FiSettings, FiBell } from "react-icons/fi";
import { GlassCard, GlassText, GlassButton, GlassStatCard, GlassIconButton } from "@/components/GlassComponents";
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
      <div className="min-h-screen bg-gradient-glass flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-glass-blue border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const handleFeatureClick = (title: string) => {
    const routeMap: { [key: string]: string } = {
      "Canvas": "/canvas",
      "Marketplace": "/marketplace",
      "Wallet": "/wallet",
      "Settings": "/settings",
    };
    const path = routeMap[title] || `/${title.toLowerCase()}`;
    logEvent("feature_click", { feature_name: title });
    router.push(path);
  };

  const handleNavClick = (label: string) => {
    const routeMap: { [key: string]: string } = {
      "Home": "/",
      "Canvas": "/canvas",
      "Marketplace": "/marketplace",
      "Wallet": "/wallet",
      "Profile": "/settings",
    };
    const path = routeMap[label] || "/";
    logEvent("nav_click", { nav_label: label });
    router.push(path);
  };

  const userName = user?.email?.split("@")[0] || "kayky";

  return (
    <div className="min-h-screen bg-gradient-glass">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card px-6 py-3 rounded-2xl"
            >
              <GlassText variant="blue" size="lg" weight="bold">
                MANUS DESAGNI LUX
              </GlassText>
            </motion.div>

            {/* Notification Icon */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button p-4 rounded-2xl relative"
            >
              <FiBell className="text-xl text-glass" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-orange rounded-full"></span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="text-center py-8">
            <GlassText size="2xl" weight="bold" className="block mb-2">
              Bem-vindo de volta, {userName}!
            </GlassText>
            <GlassText variant="default" className="text-glass-secondary">
              Pronto para criar algo incrível hoje?
            </GlassText>
          </GlassCard>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          <GlassStatCard
            title="Postagens"
            value={posts?.length || 0}
            icon={<FiEdit3 />}
            variant="blue"
          />
          <GlassStatCard
            title="Moedas"
            value={user?.manusCoins || 0}
            icon={<FiDollarSign />}
            variant="purple"
          />
          <GlassStatCard
            title="Transações"
            value={transactions?.length || 0}
            icon={<FiShoppingBag />}
            variant="pink"
          />
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Canvas - Larger */}
          <GlassCard
            variant="purple"
            className="cursor-pointer hover:scale-[1.02] transition-transform col-span-1 row-span-1"
            onClick={() => handleFeatureClick("Canvas")}
          >
            <div className="flex flex-col items-center justify-center h-full py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-purple flex items-center justify-center mb-4 shadow-glass">
                <FiEdit3 className="text-3xl text-white" />
              </div>
              <GlassText size="xl" weight="bold" className="mb-2">
                Canvas
              </GlassText>
              <GlassText className="text-glass-secondary text-sm">
                Create & Edit
              </GlassText>
            </div>
          </GlassCard>

          {/* Marketplace - Larger */}
          <GlassCard
            variant="orange"
            className="cursor-pointer hover:scale-[1.02] transition-transform col-span-1 row-span-1"
            onClick={() => handleFeatureClick("Marketplace")}
          >
            <div className="flex flex-col items-center justify-center h-full py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mb-4 shadow-glass">
                <FiShoppingBag className="text-3xl text-white" />
              </div>
              <GlassText size="xl" weight="bold" className="mb-2">
                Marketplace
              </GlassText>
              <GlassText className="text-glass-secondary text-sm">
                Buy & Sell
              </GlassText>
            </div>
          </GlassCard>

          {/* Wallet */}
          <GlassCard
            variant="blue"
            className="cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => handleFeatureClick("Wallet")}
          >
            <div className="flex flex-col items-center justify-center h-full py-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-cyan flex items-center justify-center mb-3 shadow-glass">
                <FiDollarSign className="text-2xl text-white" />
              </div>
              <GlassText size="lg" weight="semibold" className="mb-1">
                Wallet
              </GlassText>
              <GlassText className="text-glass-secondary text-xs">
                Manage Coins
              </GlassText>
            </div>
          </GlassCard>

          {/* Settings */}
          <GlassCard
            variant="pink"
            className="cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => handleFeatureClick("Settings")}
          >
            <div className="flex flex-col items-center justify-center h-full py-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-pink flex items-center justify-center mb-3 shadow-glass">
                <FiSettings className="text-2xl text-white" />
              </div>
              <GlassText size="lg" weight="semibold" className="mb-1">
                Settings
              </GlassText>
              <GlassText className="text-glass-secondary text-xs">
                Configurações
              </GlassText>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard>
            <GlassText size="lg" weight="semibold" className="mb-4 block">
              Características
            </GlassText>
            <div className="grid grid-cols-4 gap-3">
              <GlassButton variant="blue" size="sm" onClick={() => router.push("/canvas")}>
                Criar
              </GlassButton>
              <GlassButton variant="purple" size="sm" onClick={() => router.push("/feed")}>
                Feed
              </GlassButton>
              <GlassButton variant="orange" size="sm" onClick={() => router.push("/marketplace")}>
                Comprar
              </GlassButton>
              <GlassButton variant="blue" size="sm" onClick={() => router.push("/wallet")}>
                Carteira
              </GlassButton>
            </div>
          </GlassCard>
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-glass border-t border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around h-20">
            {[
              { icon: <FiHome />, label: "Home" },
              { icon: <FiEdit3 />, label: "Canvas" },
              { icon: <FiShoppingBag />, label: "Marketplace" },
              { icon: <FiDollarSign />, label: "Wallet" },
              { icon: <FiUser />, label: "Profile" },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                onClick={() => handleNavClick(item.label)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                  item.label === "Home"
                    ? "glass-button"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="text-xl text-glass">{item.icon}</div>
                <span className="text-xs text-glass-secondary font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Padding */}
      <div className="h-24"></div>
    </div>
  );
}
