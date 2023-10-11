import React, { ChangeEvent } from "react";
import cn from "clsx";

type TInputVariant = `default` | `danger`;
type TInputSize = "sm" | "md" | "lg" | undefined;
type TInputTypes = "text" | "email" | "password" | undefined;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: TInputVariant;
  type: TInputTypes;
  label?: string;
  className?: string;
}

const Theme = {
  base: "block w-full p-2.5 text-base border hover:outline-none focus:outline-none px-5 py-3 text-base rounded-lg",
  disabled: "opacity-50 cursor-not-allowed",
  variant: {
    default:
      "bg-gray-100 border-gray-100 text-gray-900 focus:border-primary-600",
    danger:
      "bg-danger-50 border-danger-500 text-danger-900 focus:border-danger-600",
  },
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ variant = "default", type = "text", label, className, ...props }, ref) => {
    return (
      <div className="block text-left">
        <label htmlFor={label} className="block mb-2">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={label}
          className={cn(
            ` ${Theme.base} ${Theme.variant[variant]} ${className}`
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
