export default function AnnouncementBar() {
  const message = "+1,000 estudiantes satisfechos nos respaldan";
  const items = Array(10).fill(message);

  return (
    <div className="bg-black text-white overflow-hidden py-1.5 border-b border-zinc-800">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((msg, i) => (
          <span key={i} className="text-xs font-medium tracking-wide mx-10">
            {msg}
            <span className="mx-10 text-[#F0B90B]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
