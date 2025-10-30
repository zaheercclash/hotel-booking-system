import { FC, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClick?: () => void;
  blur?: boolean;
  opacity?: number;
  zIndex?: number;
};

const BackDrop: FC<Props> = ({
  isOpen,
  onClick,
  blur = false,
  opacity = 0.8,
  zIndex = 60,
}) => {
  // Prevent body scroll when backdrop is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 transition-all duration-300 ease-in-out ${
        blur ? "backdrop-blur-sm" : ""
      }`}
      style={{
        zIndex,
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
      }}
      onClick={onClick}
    >
      {/* Subtle gradient overlay for better visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />

      {/* Animated pulse effect for attention */}
      <div className="absolute inset-0 animate-pulse-slow opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
};

export default BackDrop;
