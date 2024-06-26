"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const { user } = useUser();
  const userRole = user?.publicMetadata.role;

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to handle menu close
  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full pr-4 flex flex-row gap-5">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <Image src="/kmc-logo.ico" width={30} height={30} alt="Logo" />
        <button
          className="lg:hidden block"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu and Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex h-full"
          onClick={handleMenuClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          
          {/* Menu */}
          <div
            className="absolute left-0 top-0 bg-white p-6 w-64 space-y-4 shadow-lg transition-transform transform duration-300 ease-in-out h-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing menu when clicking inside it
          >
            <button
              onClick={handleMenuClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <Link
              href="/cms?tab=overview"
              className={cn(
                "block text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                pathName === "/cms" && "text-black"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/cms/visitors"
              className={cn(
                "block text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                pathName === "/cms/visitors" && "text-black"
              )}
            >
              Visitors
            </Link>
            <Link
              href="/cms/area-sites"
              className={cn(
                "block text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                pathName === "/cms/area-sites" && "text-black"
              )}
            >
              Area Sites
            </Link>
            <Link
              href="/cms/permits"
              className={cn(
                "block text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                pathName === "/cms/permits" && "text-black"
              )}
            >
              Permits
            </Link>
            <Link
              href="/cms/my-applications"
              className={cn(
                "block text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                pathName === "/cms/my-applications" && "text-black"
              )}
            >
              My Applications
            </Link>
            {userRole === "admin" && (
              <Link
                href="/cms/manage-users"
                className={cn(
                  "block text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                  pathName === "/cms/manage-users" && "text-black"
                )}
              >
                Manage Users (Admin)
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className={cn("hidden lg:flex lg:items-center lg:space-x-6", className)} {...props}>
        <Link
          href="/cms?tab=overview"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms" && "text-black"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/cms/visitors"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms/visitors" && "text-black"
          )}
        >
          Visitors
        </Link>
        <Link
          href="/cms/area-sites"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms/area-sites" && "text-black"
          )}
        >
          Area Sites
        </Link>
        <Link
          href="/cms/permits"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms/permits" && "text-black"
          )}
        >
          Permits
        </Link>
        <Link
          href="/cms/my-applications"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms/my-applications" && "text-black"
          )}
        >
          My Applications
        </Link>
        {userRole === "admin" && (
          <Link
            href="/cms/manage-users"
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
              pathName === "/cms/manage-users" && "text-black"
            )}
          >
            Manage Users (Admin)
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainNav;