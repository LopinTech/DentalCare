"use client";

import { cn } from "@/lib/utils";
import { useVoiceInput } from "@/lib/use-voice-input";
import { Mic, MicOff } from "lucide-react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ className, label, error, id, onChange, ...props }: TextareaProps) {
  const { listening, supported, start, stop } = useVoiceInput();

  function handleMic() {
    if (listening) {
      stop();
      return;
    }
    start((transcript) => {
      const current = String(props.value ?? "");
      const next = current ? `${current} ${transcript}` : transcript;
      onChange?.({ target: { value: next } } as React.ChangeEvent<HTMLTextAreaElement>);
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          id={id}
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            error && "border-destructive-foreground focus-visible:ring-destructive/30",
            className
          )}
          onChange={onChange}
          {...props}
        />
        {supported && (
          <button
            type="button"
            onClick={handleMic}
            aria-label={listening ? "Stop voice input" : "Start voice input"}
            className={cn(
              "absolute right-2 top-2 rounded p-0.5 transition-colors",
              listening
                ? "text-red-500 animate-pulse"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {listening ? (
              <MicOff className="size-4" />
            ) : (
              <Mic className="size-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive-foreground">{error}</p>}
    </div>
  );
}
