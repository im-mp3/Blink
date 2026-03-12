const placeholderGames = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  title: `Game ${i + 1}`,
  hot: i < 3,
}));

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Volumetric light effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[700px]"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 40%, hsla(220, 20%, 40%, 0.08) 45%, hsla(220, 30%, 50%, 0.12) 48%, hsla(215, 40%, 55%, 0.15) 50%, hsla(220, 30%, 50%, 0.12) 52%, hsla(220, 20%, 40%, 0.08) 55%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, hsla(215, 30%, 50%, 0.1) 0%, hsla(215, 30%, 40%, 0.05) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid content */}
      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {placeholderGames.map((game) => (
            <div
              key={game.id}
              className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer hover:scale-[1.03] hover:shadow-lg"
            >
              {/* Placeholder image */}
              <div className="aspect-square bg-muted flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-muted-foreground/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Hot badge */}
              {game.hot && (
                <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                  Hot 🔥
                </span>
              )}

              {/* Title */}
              <div className="px-3 py-2.5 bg-card">
                <p className="text-sm font-medium text-foreground truncate">
                  {game.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
