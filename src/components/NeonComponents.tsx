import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

// ============ NEON GLASS CARD ============
interface NeonGlassCardProps {
  children: React.ReactNode;
  glowColor?: "cyan" | "magenta" | "orange" | "green";
  className?: string;
}

export const NeonGlassCard: React.FC<NeonGlassCardProps> = ({
  children,
  glowColor = "cyan",
  className,
}) => {
  const glowClasses = {
    cyan: "border-neon-cyan shadow-glow-cyan hover:shadow-glow-cyan-lg",
    magenta: "border-neon-magenta shadow-glow-magenta hover:shadow-glow-magenta-lg",
    orange: "border-neon-orange shadow-glow-orange hover:shadow-glow-orange-lg",
    green: "border-neon-green shadow-glow-green hover:shadow-glow-green-lg",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={clsx(
        "backdrop-blur-glass border rounded-[20px] bg-white/5 border-3",
        "transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]",
        glowClasses[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// ============ NEON BUTTON ============
interface NeonButtonProps {
  children: React.ReactNode;
  glowColor?: "cyan" | "magenta" | "orange" | "green";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "solid" | "outline";
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  glowColor = "cyan",
  onClick,
  disabled = false,
  className,
  variant = "solid",
}) => {
  const colorMap = {
    cyan: { bg: "from-neon-cyan to-neon-cyan/80", text: "text-neon-dark", glow: "shadow-glow-cyan hover:shadow-glow-cyan-lg" },
    magenta: { bg: "from-neon-magenta to-neon-magenta/80", text: "text-white", glow: "shadow-glow-magenta hover:shadow-glow-magenta-lg" },
    orange: { bg: "from-neon-orange to-neon-orange/80", text: "text-neon-dark", glow: "shadow-glow-orange hover:shadow-glow-orange-lg" },
    green: { bg: "from-neon-green to-neon-green/80", text: "text-neon-dark", glow: "shadow-glow-green hover:shadow-glow-green-lg" },
  };

  const color = colorMap[glowColor];

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:brightness-110",
        variant === "solid"
          ? clsx(`bg-gradient-to-r ${color.bg}`, color.text, color.glow)
          : clsx(`border-2 border-neon-${glowColor}`, `text-neon-${glowColor}`),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// ============ NEON TEXT ============
interface NeonTextProps {
  children: React.ReactNode;
  glowColor?: "cyan" | "magenta" | "orange" | "green";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export const NeonText: React.FC<NeonTextProps> = ({
  children,
  glowColor = "cyan",
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
    "2xl": "text-4xl",
  };

  const colorMap = {
    cyan: "text-neon-cyan",
    magenta: "text-neon-magenta",
    orange: "text-neon-orange",
    green: "text-neon-green",
  };

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        sizeClasses[size],
        colorMap[glowColor],
        "font-bold drop-shadow-lg",
        className
      )}
      style={{
        textShadow: `0 0 10px rgba(${
          glowColor === "cyan"
            ? "0, 224, 255"
            : glowColor === "magenta"
            ? "233, 30, 99"
            : glowColor === "orange"
            ? "255, 140, 0"
            : "0, 217, 163"
        }, 1), 0 0 20px rgba(${
          glowColor === "cyan"
            ? "0, 224, 255"
            : glowColor === "magenta"
            ? "233, 30, 99"
            : glowColor === "orange"
            ? "255, 140, 0"
            : "0, 217, 163"
        }, 0.8), 0 0 40px rgba(${
          glowColor === "cyan"
            ? "0, 224, 255"
            : glowColor === "magenta"
            ? "233, 30, 99"
            : glowColor === "orange"
            ? "255, 140, 0"
            : "0, 217, 163"
        }, 0.6), 0 0 80px rgba(${
          glowColor === "cyan"
            ? "0, 224, 255"
            : glowColor === "magenta"
            ? "233, 30, 99"
            : glowColor === "orange"
            ? "255, 140, 0"
            : "0, 217, 163"
        }, 0.4)`,
        filter: "brightness(1.3)",
      }}
    >
      {children}
    </motion.span>
  );
};

// ============ NEON BADGE ============
interface NeonBadgeProps {
  children: React.ReactNode;
  glowColor?: "cyan" | "magenta" | "orange" | "green";
  className?: string;
}

export const NeonBadge: React.FC<NeonBadgeProps> = ({
  children,
  glowColor = "cyan",
  className,
}) => {
  const glowClasses = {
    cyan: "border-neon-cyan text-neon-cyan shadow-glow-cyan",
    magenta: "border-neon-magenta text-neon-magenta shadow-glow-magenta",
    orange: "border-neon-orange text-neon-orange shadow-glow-orange",
    green: "border-neon-green text-neon-green shadow-glow-green",
  };

  return (
    <motion.span
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={clsx(
        "inline-block px-4 py-2 rounded-full border-2 font-bold text-sm",
        glowClasses[glowColor],
        className
      )}
    >
      {children}
    </motion.span>
  );
};

// ============ NEON INPUT ============
interface NeonInputProps {
  placeholder?: string;
  glowColor?: "cyan" | "magenta" | "orange" | "green";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  disabled?: boolean;
}

export const NeonInput: React.FC<NeonInputProps> = ({
  placeholder,
  glowColor = "cyan",
  value,
  onChange,
  type = "text",
  className,
  disabled = false,
}) => {
  const borderClasses = {
    cyan: "border-neon-cyan focus:shadow-glow-cyan",
    magenta: "border-neon-magenta focus:shadow-glow-magenta",
    orange: "border-neon-orange focus:shadow-glow-orange",
    green: "border-neon-green focus:shadow-glow-green",
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        "w-full px-4 py-3 rounded-lg bg-white/5 border-2",
        "text-white placeholder-white/50 backdrop-blur-glass",
        "focus:outline-none focus:bg-white/8 transition-all duration-300",
        borderClasses[glowColor],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );
};

// ============ NEON CARD ============
interface NeonCardProps {
  children: React.ReactNode;
  glowColor?: "cyan" | "magenta" | "orange" | "green";
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  children,
  glowColor = "cyan",
  title,
  icon,
  className,
}) => {
  const glowClasses = {
    cyan: "border-neon-cyan shadow-glow-cyan hover:shadow-glow-cyan-lg",
    magenta: "border-neon-magenta shadow-glow-magenta hover:shadow-glow-magenta-lg",
    orange: "border-neon-orange shadow-glow-orange hover:shadow-glow-orange-lg",
    green: "border-neon-green shadow-glow-green hover:shadow-glow-green-lg",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={clsx(
        "border-2 rounded-xl p-6 bg-white/5 backdrop-blur-glass",
        "transition-all duration-300",
        glowClasses[glowColor],
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="text-2xl">{icon}</div>}
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
        </div>
      )}
      {children}
    </motion.div>
  );
};

// ============ NEON PROGRESS BAR ============
interface NeonProgressBarProps {
  value: number;
  max?: number;
  glowColor?: "cyan" | "magenta" | "orange" | "green";
  className?: string;
}

export const NeonProgressBar: React.FC<NeonProgressBarProps> = ({
  value,
  max = 100,
  glowColor = "cyan",
  className,
}) => {
  const percentage = (value / max) * 100;

  const bgClasses = {
    cyan: "bg-neon-cyan shadow-glow-cyan",
    magenta: "bg-neon-magenta shadow-glow-magenta",
    orange: "bg-neon-orange shadow-glow-orange",
    green: "bg-neon-green shadow-glow-green",
  };

  return (
    <div className={clsx("w-full h-2 bg-white/10 rounded-full overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx("h-full rounded-full", bgClasses[glowColor])}
      />
    </div>
  );
};

