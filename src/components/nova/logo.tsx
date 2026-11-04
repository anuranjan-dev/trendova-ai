import { cn } from "@/lib/utils";

export function NovaMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-black shadow-sm",
        className,
      )}
      aria-hidden="true"
    >
      <img
        src="/trendova-logo.png"
        alt=""
        className="size-full object-cover"
      />
    </span>
  );
}

export function NovaLogo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <NovaMark />
      {showWordmark ? (
        <span className="text-[0.95rem] font-semibold tracking-[0.08em] text-foreground">
          Trendōva AI
        </span>
      ) : null}
    </span>
  );
}
