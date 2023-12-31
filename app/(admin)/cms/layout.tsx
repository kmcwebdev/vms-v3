import MainNav from "@/components/admin/cms/main-nav";
import UserNav from "@/components/admin/cms/user-nav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" overflow-y-auto p-6 sm:p-12 lg:px-48">
      <nav className="flex justify-between">
        <MainNav className="mb-8" />
        <UserNav />
      </nav>
      {children}
    </main>
  );
};

export default layout;
