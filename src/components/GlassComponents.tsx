import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

// ============ GLASS CARD ============
interface GlassCardProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "purple" | "orange" | "cyan" | "pink";
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = "default",
  className,
  onClick,
}) => {
  const variantClasses = {
    default: "glass-card",
    blue: "glass-card-blue",
    purple: "glass-card-purple",
    orange: "glass-card-orange",
    cyan: "glass-card-cyan",
    pink: "glass-card-pink",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className={clsx(
        "rounded-glass p-6",
        variantClasses[variant],
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// ============ GLASS BUTTON ============
interface GlassButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "purple" | "orange" | "cyan" | "pink" | "default";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = "default",
  onClick,
  disabled = false,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    default: "glass-button text-glass",
    blue: "bg-gradient-blue text-white border-0 shadow-glass",
    purple: "bg-gradient-purple text-white border-0 shadow-glass",
    orange: "bg-gradient-orange text-white border-0 shadow-glass",
    cyan: "bg-gradient-cyan text-white border-0 shadow-glass",
    pink: "bg-gradient-pink text-white border-0 shadow-glass",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "rounded-2xl font-semibold transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// ============ GLASS TEXT ============
interface GlassTextProps {
  children: React.ReactNode;
  variant?: "default" | "gradient-blue" | "gradient-purple" | "gradient-orange";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}

export const GlassText: React.FC<GlassTextProps> = ({
  children,
  variant = "default",
  size = "md",
  weight = "normal",
  className,
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
    "2xl": "text-4xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const variantClasses = {
    default: "text-glass",
    "gradient-blue": "text-gradient-blue",
    "gradient-purple": "text-gradient-purple",
    "gradient-orange": "text-gradient-orange",
  };

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={clsx(
        sizeClasses[size],
        weightClasses[weight],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
};

// ============ GLASS INPUT ============
interface GlassInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  disabled?: boolean;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        "w-full px-4 py-3 rounded-2xl glass-input",
        "text-glass placeholder:text-glass-tertiary",
        "focus:outline-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );
};

// ============ GLASS BADGE ============
interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "purple" | "orange" | "cyan" | "pink";
  className?: string;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  children,
  variant = "blue",
  className,
}) => {
  const variantClasses = {
    blue: "bg-gradient-blue",
    purple: "bg-gradient-purple",
    orange: "bg-gradient-orange",
    cyan: "bg-gradient-cyan",
    pink: "bg-gradient-pink",
  };

  return (
    <motion.span
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={clsx(
        "inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold shadow-glass",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
};

// ============ GLASS STAT CARD ============
interface GlassStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: "blue" | "purple" | "orange" | "cyan" | "pink";
  className?: string;
}

export const GlassStatCard: React.FC<GlassStatCardProps> = ({
  title,
  value,
  icon,
  variant = "blue",
  className,
}) => {
  return (
    <GlassCard variant={variant} className={clsx("text-center", className)}>
      {icon && (
        <div className="flex justify-center mb-3">
          <div className="text-4xl">{icon}</div>
        </div>
      )}
      <div className="text-3xl font-bold text-glass mb-1">{value}</div>
      <div className="text-sm text-glass-secondary font-medium">{title}</div>
    </GlassCard>
  );
};

// ============ GLASS ICON BUTTON ============
interface GlassIconButtonProps {
  icon: React.ReactNode;
  variant?: "blue" | "purple" | "orange" | "cyan" | "pink" | "default";
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const GlassIconButton: React.FC<GlassIconButtonProps> = ({
  icon,
  variant = "default",
  onClick,
  className,
  label,
}) => {
  const variantClasses = {
    default: "glass-button",
    blue: "bg-gradient-blue text-white shadow-glass",
    purple: "bg-gradient-purple text-white shadow-glass",
    orange: "bg-gradient-orange text-white shadow-glass",
    cyan: "bg-gradient-cyan text-white shadow-glass",
    pink: "bg-gradient-pink text-white shadow-glass",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "p-4 rounded-2xl transition-all duration-200 flex flex-col items-center gap-2",
        variantClasses[variant],
        className
      )}
      aria-label={label}
    >
      <div className="text-2xl">{icon}</div>
      {label && <div className="text-xs font-medium">{label}</div>}
    </motion.button>
  );
};
