import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-background transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
        </div>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
