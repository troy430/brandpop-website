"use client";

// Fires the event ChatWidget listens for, so any part of the page can open
// the chat — optionally pre-sending a first message (used by the industry
// chips to drop visitors straight into a roleplay demo).
export function OpenChatButton({
  className,
  message,
  children,
}: {
  className?: string;
  message?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={className}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("open-jasmine", { detail: { message } }),
        )
      }
    >
      {children}
    </button>
  );
}
