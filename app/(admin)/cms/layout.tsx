import MainNav from "@/components/global/main-nav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen p-6 sm:p-12">
      <MainNav className="mb-8" />
      {children}
    </main>
  );
};

export default layout;
