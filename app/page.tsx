import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Domains from '@/components/Domains'; // <-- Import the new section

export default function Page() {
  return (
    <main className="relative bg-black text-white flex flex-col font-sans selection:bg-gray-300 selection:text-black">
      
      {/* Hero View */}
      <div className="relative h-screen flex flex-col justify-between z-20">
        <Navbar />
        <Hero />
        
        <footer className="relative z-10 w-full p-6 md:px-12 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-xs md:text-sm text-gray-500 gap-6">
          <div>
            <p>Established in <span className="text-gray-300">2009</span>.</p>
            <p>Evolving ever since.</p>
          </div>
          <div className="text-left md:text-right">
            <p>We're not just another <span className="text-gray-300">tech chapter</span>.</p>
            <p>We're the <span className="text-gray-300">engineers</span> that actually build.</p>
          </div>
        </footer>
      </div>

      {/* Interactive About Section */}
      <About />

      {/* NEW: Domains Section */}
      <Domains />

    </main>
  );
}