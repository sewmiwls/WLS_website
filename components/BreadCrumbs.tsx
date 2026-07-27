"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export default function Breadcrumbs({
  items,
  separator = "/",
  className = "",
}: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from current path if items not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname || '');

  return (
    <nav
      className={`text-sm text-gray-600 mb-4 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <Fragment key={item.href}>
              <li className="flex items-center">
                {isLast ? (
                  <span
                    className="text-grey-100 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li className="text-gray-400" aria-hidden="true">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// Helper function to auto-generate breadcrumbs from URL path
function generateBreadcrumbs(asPath: string): BreadcrumbItem[] {
  const pathSegments = asPath.split("/").filter((segment) => segment);

  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let currentPath = "";
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    // Remove query parameters and fragments
    const cleanSegment = segment.split("?")[0].split("#")[0];
    // Convert kebab-case to Title Case
    const label = cleanSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}

// Usage Examples:

// 1. Auto-generated breadcrumbs (uses current URL path)
// <Breadcrumbs />

// 2. Manual breadcrumbs
// <Breadcrumbs
//   items={[
//     { label: 'Home', href: '/' },
//     { label: 'Products', href: '/products' },
//     { label: 'Laptops', href: '/products/laptops' },
//     { label: 'MacBook Pro', href: '/products/laptops/macbook-pro' }
//   ]}
// />

// 3. Custom separator and styling
// <Breadcrumbs
//   separator=">"
//   className="mb-4 px-4"
// />
