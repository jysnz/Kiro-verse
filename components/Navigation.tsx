'use client';

import Link from 'next/link';

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: 'home', label: 'Home', href: '/dashboard' },
  { icon: 'medical_services', label: 'Scan', href: '/scan' },
  { icon: 'map', label: 'Map', href: '/map' },
  { icon: 'notifications', label: 'Alerts', href: '/alerts' },
  { icon: 'person', label: 'Profile', href: '/profile' },
];

interface NavigationProps {
  activePage: string;
}

export default function Navigation({ activePage }: NavigationProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col bg-white border-r border-[#c2c6d3] z-40">
        <div className="px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004287] text-3xl">dermatology</span>
            <h1 className="text-xl font-bold text-[#004287]">DermAI</h1>
          </div>
          <p className="text-xs text-[#424751] mt-1">Skin Disease Detection</p>
        </div>

        <nav className="flex-1 px-3 mt-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.label;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#d6e3ff] text-[#004287]'
                        : 'text-[#424751] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t border-[#c2c6d3]">
          <Link
            href="/scan"
            className="w-full flex justify-center items-center gap-2 bg-[#004287] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#1e5aa8] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
            Start New Scan
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#c2c6d3] z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = activePage === item.label;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                    isActive ? 'text-[#004287]' : 'text-[#424751]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
