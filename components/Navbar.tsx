import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="relative z-50 w-full p-6 md:px-12 md:py-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black font-black text-xs">RV</div>
        <div className="hidden md:block font-bold text-lg tracking-tight">
          roboVITics
        </div>
      </div>
      <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-400">
        {['About', 'Domains', 'Events', 'Projects', 'Teams'].map((item) => (
          <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-200">
            {item}
          </Link>
        ))}
      </nav>
      <button className="px-6 py-2.5 bg-white text-black hover:bg-[#00E5FF] hover:text-black transition-colors duration-300 rounded-full font-semibold text-sm tracking-wide">
        Join the Club
      </button>
    </header>
  );
}