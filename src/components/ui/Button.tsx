import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "default" | "primary";
};

export function Button({ children, variant = "default", className = "", ...props }: ButtonProps) {
  return <button className={`ui-button ui-button-${variant} ${className}`} {...props}>{children}</button>;
}
