import { ReactNode } from "react";

interface CardSectionProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function CardSection({ children, className = "", onClick }: CardSectionProps) {
  return (
    <div className={`p-4 bg-[#121827] rounded-2xl shadow-md border border-purple-800 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
