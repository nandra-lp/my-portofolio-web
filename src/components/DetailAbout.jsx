import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function DetailAbout({ title, items, className = "" }) {
  return (
    // Base style disesuaikan agar netral dan menyatu dengan prop className dari parent (hilangkan hover:border-sky agar tidak bentrok)
    <div
      className={`rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-300 ${className}`}
    >
      <h4 className="mb-4 text-xl font-semibold text-white">{title}</h4>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            // Item list memakai slate-400 agar selaras dengan tema Navy/Slate
            className="group/item flex items-center text-slate-400 transition-all duration-200 hover:translate-x-1"
          >
            <KeyboardDoubleArrowRightIcon
              // Ikon aksen amber-500 sebagai warna Gold tema
              className="mr-2 text-amber-500 transition-transform duration-300 group-hover/item:scale-125"
              fontSize="small"
            />
            <span className="text-base leading-relaxed transition-colors duration-300 group-hover/item:text-white">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
