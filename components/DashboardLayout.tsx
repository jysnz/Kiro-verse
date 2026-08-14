import Navigation from './Navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: string;
}

export default function DashboardLayout({ children, activePage }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation activePage={activePage} />
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
