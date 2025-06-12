import { ReactNode } from "react";

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

export default function CardSection({ children, className = "" }: CardSectionProps) {
  return (
    <div className={`p-4 bg-[#121827] rounded-2xl shadow-md border border-purple-800 ${className}`}>
      {children}
    </div>
  );
}
