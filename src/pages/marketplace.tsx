import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { NeonText, NeonButton, NeonCard, NeonInput } from "@/components/NeonComponents";
import { FiArrowLeft, FiShoppingBag, FiSearch, FiDollarSign, FiCreditCard, FiCode } from "react-icons/fi";
import { useAuth } from "@/lib/useAuth";
import { useAppStore } from "@/lib/store";

// Mock Data for Marketplace Assets
const mockAssets = [
  { id: 1, title: "Cyberpunk Cityscape", type: "Image", price: 50, creator: "NeonArtist", glowColor: "cyan" as const },
  { id: 2, title: "Epic Cinematic Intro", type: "Video Template", price: 120, creator: "VFXMaster", glowColor: "magenta" as const },
  { id: 3, title: "AI Voice Pack (Female)", type: "Voice Asset", price: 80, creator: "SoundLUX", glowColor: "green" as const },
  { id: 4, title: "Abstract Neon Backgrounds", type: "Image Pack", price: 40, creator: "GlowDesign", glowColor: "orange" as const },
  { id: 5, title: "Rive Animation Template", type: "Animation", price: 95, creator: "MotionPro", glowColor: "cyan" as const },
];

// Dados reais dos pacotes (devem ser os mesmos do backend)
const packages = [
  { id: 'package_1', name: "1.000 ManusCoins", price: "R$ 10,00", coins: 1000, glowColor: "green" as const },
  { id: 'package_2', name: "5.500 ManusCoins", price: "R$ 45,00", coins: 5500, glowColor: "cyan" as const },
  { id: 'package_3', name: "12.000 ManusCoins", price: "R$ 90,00", coins: 12000, glowColor: "magenta" as const },
  { id: 'package_4', name: "25.000 ManusCoins", price: "R$ 180,00", coins: 25000, glowColor: "orange" as const },
];

export default function MarketplacePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'Stripe' | 'Pix'>('Stripe');
  const [pixData, setPixData] = useState<{ qrCode: string, amount: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyCoins = async (pkg: typeof packages[0]) => {
    if (!user) {
      alert("Você precisa estar logado para comprar ManusCoins.");
      return;
    }

    setIsLoading(true);
    try {
      if (paymentMethod === 'Stripe') {
        const response = await fetch('/api/stripe-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ packageId: pkg.id, userId: user.id }),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          alert(`Erro ao iniciar o pagamento: ${data.error}`);
        }
      } else if (paymentMethod === 'Pix') {
        const response = await fetch('/api/pix-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ packageId: pkg.id, userId: user.id, userEmail: user.email }),
        });

        const data = await response.json();

        if (data.status === 'pending') {
          setPixData({ qrCode: data.qrCode, amount: data.amount });
        } else {
          alert(`Erro ao gerar o Pix: ${data.error}`);
        }
      }
    } catch (error) {
      console.error("Erro na compra:", error);
      alert("Erro de conexão ao iniciar o pagamento.");
    } finally {
      setIsLoading(false);
    }
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

      <div className="max-w-6xl mx-auto pt-16 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <NeonText size="2xl" glowColor="orange" className="mb-2">
            Marketplace LUX
          </NeonText>
          <p className="text-white/70 text-lg">
            Compre e venda ativos digitais criados pela comunidade e pela IA.
          </p>
        </motion.div>

        {/* Search and Filters (Placeholder) */}
        <div className="mb-8 flex gap-4">
          <NeonInput
            placeholder="Search assets (images, videos, voices...)"
            glowColor="orange"
            className="flex-1"

          />
          <NeonButton glowColor="orange" className="flex-shrink-0">
            Filter
          </NeonButton>
        </div>

        {/* Seção de Compra de Coins */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Comprar ManusCoins</h2>
          
          {/* Seleção de Método de Pagamento */}
          <div className="flex gap-4 mb-6">
            <NeonButton
              glowColor={paymentMethod === 'Stripe' ? 'magenta' : 'cyan'}
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setPaymentMethod('Stripe')}
            >
              <FiCreditCard /> Cartão (Stripe)
            </NeonButton>
            <NeonButton
              glowColor={paymentMethod === 'Pix' ? 'magenta' : 'cyan'}
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setPaymentMethod('Pix')}
            >
              <FiCode /> Pix (Mercado Pago)
            </NeonButton>
          </div>

          {/* Modal/Visualização do Pix */}
          {pixData && (
            <NeonCard glowColor="green" className="p-6 mb-6 text-center">
              <h3 className="text-2xl font-bold mb-4">Pagamento Pix Gerado!</h3>
              <p className="text-white/80 mb-4">Escaneie o QR Code abaixo para pagar {pixData.amount.toLocaleString()} ManusCoins.</p>
              <div className="flex justify-center mb-4">
                <img src={`data:image/jpeg;base64,${pixData.qrCode}`} alt="QR Code Pix" className="w-48 h-48 border border-neon-green/50 p-2" />
              </div>
              <NeonButton glowColor="orange" onClick={() => setPixData(null)}>
                Fechar
              </NeonButton>
            </NeonCard>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <NeonCard glowColor={pkg.glowColor} className="p-4 text-center h-full flex flex-col justify-between">
                  <h3 className="font-bold text-2xl mb-1">{pkg.coins.toLocaleString()}</h3>
                  <p className="text-white/70 text-sm mb-4">ManusCoins</p>
                  <div className="text-neon-green font-bold text-xl mb-4">{pkg.price}</div>
                  <NeonButton
                    glowColor={pkg.glowColor}
                    onClick={() => handleBuyCoins(pkg)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processando..." : "Comprar Agora"}
                  </NeonButton>
                </NeonCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Seção de Ativos da Comunidade */}
        <h2 className="text-2xl font-bold mb-4">Ativos da Comunidade</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockAssets.map((asset, idx) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <NeonCard glowColor={asset.glowColor} className="p-4 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-1">{asset.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{asset.type} by {asset.creator}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-neon-green font-bold text-lg">
                    <FiDollarSign /> {asset.price} COINS
                  </div>
                  <NeonButton glowColor="green">
                    Comprar
                  </NeonButton>
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
