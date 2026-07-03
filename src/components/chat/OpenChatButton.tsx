"use client";

// Fires the event ChatWidget listens for, so any part of the page can open
// the chat. Kept separate so server components can render it.
export function OpenChatButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("open-jasmine"))}
    >
      {children}
    </button>
  );
}
