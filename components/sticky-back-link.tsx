import Link from "next/link";

export default function StickyBackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 mb-8"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6.50002 19L3.56068 16.0607C2.97489 15.4749 2.97489 14.5251 3.56068 13.9393L6.50002 11M4.00002 15H16.5C18.9853 15 21 12.9853 21 10.5C21 8.01472 18.9853 6 16.5 6H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </Link>
  );
}
