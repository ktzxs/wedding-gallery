export function BokehBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="bokeh bg-ice w-72 h-72 -top-10 -left-10"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="bokeh bg-sky w-96 h-96 top-1/3 -right-20"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="bokeh bg-ice w-56 h-56 bottom-10 left-1/4"
        style={{ animationDelay: "6s" }}
      />
      <div
        className="bokeh bg-deep/30 w-40 h-40 bottom-1/4 right-1/3"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}