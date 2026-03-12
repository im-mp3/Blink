const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Volumetric light effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main spotlight cone from top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[700px]"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 40%, hsla(220, 20%, 40%, 0.08) 45%, hsla(220, 30%, 50%, 0.12) 48%, hsla(215, 40%, 55%, 0.15) 50%, hsla(220, 30%, 50%, 0.12) 52%, hsla(220, 20%, 40%, 0.08) 55%, transparent 60%)",
          }}
        />
        {/* Soft radial glow */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, hsla(215, 30%, 50%, 0.1) 0%, hsla(215, 30%, 40%, 0.05) 40%, transparent 70%)",
          }}
        />
        {/* Subtle floor reflection */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px]"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, hsla(215, 20%, 40%, 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Light mode gets a subtler version */}
      <div className="absolute inset-0 pointer-events-none dark:hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center top, hsla(220, 60%, 50%, 0.06) 0%, transparent 60%)",
          }}
        />
      </div>
    </div>
  );
};

export default Index;
