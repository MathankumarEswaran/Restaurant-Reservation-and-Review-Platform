import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-text hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      {pages.map((page, idx) => {
        const prevPage = pages[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <span key={page} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-text-subtle">…</span>}
            <button
              onClick={() => onPageChange(page)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors",
                page === currentPage ? "bg-primary text-white" : "text-text hover:bg-surface-sunken"
              )}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong text-text hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
}
