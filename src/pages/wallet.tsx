import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { GlassText, GlassCard } from "@/components/GlassComponents";
import { FiArrowLeft, FiDollarSign, FiCreditCard } from "react-icons/fi";
import { useAppStore } from "@/lib/store";
import { Transaction } from "@/types";
import { format } from "date-fns";

export default function WalletPage() {
  const router = useRouter();
  const { user, transactions } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-glass text-glass p-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-glass-cyan hover:text-glass transition-colors"
      >
        <FiArrowLeft />
        Back to Home
      </motion.button>

      <div className="max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <GlassText size="2xl" variant="gradient-blue" className="mb-4">
            Wallet (Carteira)
          </GlassText>
          <p className="text-glass/70 text-lg">
            Manage your ManusCoins and transaction history.
          </p>
        </motion.div>

        <GlassCard variant="gradient-blue" className="p-6 mb-8 text-center">
          <FiDollarSign className="text-glass-green text-4xl mx-auto mb-4" />
          <p className="text-glass/70 text-xl">Current Balance</p>
          <GlassText size="2xl" variant="gradient-blue">
            {user?.manusCoins || 0} COINS
          </GlassText>
        </GlassCard>

        <GlassCard variant="gradient-blue" className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiCreditCard /> Transaction History
          </h3>
          {transactions.length === 0 ? (
            <p className="text-glass/60 text-center py-8">
              No transactions found. Start creating or buying assets!
            </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {transactions.map((tx: Transaction) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between items-center p-3 border border-glass-cyan/10 rounded-lg bg-glass-dark/50"
                >
                  <div>
                    <p className="font-semibold text-glass">{tx.description}</p>
                    <p className="text-glass/50 text-sm">
                      {format(tx.timestamp, "MMM dd, yyyy HH:mm")}
                    </p>
                  </div>
                  <p
                    className={`font-bold text-lg ${
                      tx.amount > 0 ? "text-glass-green" : "text-glass-magenta"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount} COINS
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
