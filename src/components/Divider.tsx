const Divider = () => {
  return (
    <div className="flex items-center justify-center my-12 md:my-16">
      <div className="flex items-center gap-4">
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-primary/30"></div>
        <div className="flex gap-2">
          <div className="w-1 h-1 rounded-full bg-primary/40"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
          <div className="w-1 h-1 rounded-full bg-primary/40"></div>
        </div>
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-primary/30"></div>
      </div>
    </div>
  );
};

export default Divider;
