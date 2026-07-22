import { Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 hover:text-primary">
        <FiHome size={14} />
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <FiChevronRight size={14} className="text-text-subtle" />
          {item.to ? (
            <Link to={item.to} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
