import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  children?: React.ReactNode;
}

export function Select({ className, label, error, id, options, placeholder, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive-foreground",
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error && <p className="text-xs text-destructive-foreground">{error}</p>}
    </div>
  );
}
