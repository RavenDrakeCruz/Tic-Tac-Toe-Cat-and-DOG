import TicTacToe from "@/components/tic-tac-toe";

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      {/* background paw prints */}
      <div
        className="absolute inset-0 opacity-10 text-4xl sm:text-5xl md:text-6xl pointer-events-none select-none 
                  flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-10"
      >
        {Array.from({ length: 200 }).map((_, i) => (
          <span key={i}>🐾</span>
        ))}
      </div>

      {/* game card */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <TicTacToe />
      </div>
    </main>
  );
}
