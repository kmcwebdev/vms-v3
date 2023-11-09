import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Image src="/kmc-logo.ico" width={30} height={30} alt="Logo" />
      <Link
        href="/cms"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/cms/visitors"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Visitors
      </Link>
      <Link
        href="/cms/area-sites"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Area Sites
      </Link>
      <Link
        href="/cms/manage-users"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Manage Users
      </Link>
    </div>
  );
};

export default MainNav;
