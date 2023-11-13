"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();

  const searchForm = useForm();

  return (
    <div className="flex w-full items-start justify-between pr-4">
      <div
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Image src="/kmc-logo.ico" width={30} height={30} alt="Logo" />
        <Link
          href="/cms"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors  hover:text-primary",
            pathName === "/cms" && "text-black",
          )}
        >
          Overview
        </Link>
        <Link
          href="/cms/visitors"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms/visitors" && "text-black",
          )}
        >
          Visitors
        </Link>
        <Link
          href="/cms/area-sites"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms/area-sites" && "text-black",
          )}
        >
          Area Sites
        </Link>
        <Link
          href="/cms/manage-users"
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathName === "/cms/manage-users" && "text-black",
          )}
        >
          Manage Users
        </Link>
      </div>
      <Form
        name="search"
        useFormReturn={searchForm}
        onSubmit={() => console.log("search")}
      >
        <Form.Input name="search" placeholder="Search" type="text" />
      </Form>
    </div>
  );
};

export default MainNav;
