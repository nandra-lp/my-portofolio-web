import { Icon } from "./ui/Icon";

export default function DetailAbout({ title, items, className = "" }) {
  return (
    <div className={`card p-6 ${className}`}>
      <h3 className="heading-4 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-text">
            <Icon
              name="chevronsRight"
              className="mt-1 h-4 w-4 shrink-0 text-primary"
            />
            <span className="text-base leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
