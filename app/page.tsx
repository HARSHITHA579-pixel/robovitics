import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Page() {
  return (
    <main className="relative min-h-[200vh] bg-black text-white flex flex-col overflow-x-hidden font-sans selection:bg-[#00E5FF] selection:text-black">
      
      {/* Top Section Layout (100vh) */}
      <div className="relative h-screen flex flex-col justify-between z-20">
        <Navbar />
        <Hero />
        
        {/* Footer attached to the bottom of the Hero view */}
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

      {/* About Section */}
      <section id="about" className="relative z-10 h-screen w-full px-6 md:px-24 max-w-[1400px] mx-auto pt-32">
        <h2 className="text-4xl font-black tracking-tight mb-8">INITIATING SYSTEMS...</h2>
        <p className="text-gray-400 font-mono max-w-2xl leading-relaxed">
          Welcome to the next phase. Notice how the gear rotated and the cyan circuit trace filled up as you scrolled down? 
          This is where your actual about section content will go.
        </p>
      </section>

    </main>
  );
}