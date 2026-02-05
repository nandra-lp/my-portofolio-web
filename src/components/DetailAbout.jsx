export default function DetailAbout({ title, items }) {
  return (
    <div className="p-6 bg-white/[0.03] rounded-xl border border-white/10 backdrop-blur-sm hover:border-sky-500/20 transition-colors duration-300">
      <h4 className="text-xl font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center text-gray-300 group/item transition-all duration-200 hover:translate-x-1"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mr-3 group-hover/item:scale-125 transition-transform duration-300" />
            <span className="text-base leading-relaxed group-hover/item:text-sky-100 transition-colors duration-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
