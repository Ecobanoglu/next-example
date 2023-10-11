import cn from "clsx";
import React from "react";

type TButtonVariant = `primary` | `danger` | `link`;
type TButtonSize = "sm" | "md" | "lg";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: TButtonVariant;
  size: TButtonSize;
  className: string;
  children?: React.ReactNode;
}

const Theme = {
  base: "inline-flex justify-center items-center focus:outline-none transition ease-in-out duration-300 rounded-md",
  variant: {
    primary: `bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white`,
    danger: `bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white`,
    link: "border-0 p-0 outline-none text-gray-500 hover:text-gray-800",
  },
  size: {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2.5",
    lg: "px-8 py-3 text-lg",
  },
};

const Button = ({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={cn(`
                ${Theme.base}
                ${Theme.size[size]}
                ${Theme.variant[variant]}
                ${className}
            `)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
