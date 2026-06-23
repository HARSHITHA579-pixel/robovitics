'use client';

export default function NextSection() {
  return (
    <>
      <style jsx>{`
        .normal-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: #0d0d0d; /* Matches the Memories background */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10; /* Lower z-index so it doesn't fight the Navbar */
          overflow: hidden;
        }

        .mwt-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 40px 40px; /* Blueprint grid */
        }

        .content {
          position: relative;
          z-index: 10;
          text-align: center;
        }

        .content h2 {
          font-family: "Inter", "Arial Black", sans-serif;
          font-size: clamp(40px, 6vw, 80px);
          color: #fff;
          margin: 0;
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .content h2 span {
          color: #4FAEF3; /* RoboVITics accent blue */
        }

        .content p {
          font-family: 'Courier New', monospace;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 20px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

      <section className="normal-section">
        {/* Background Grid to match previous section */}
        <div className="mwt-grid" />
        
        <div className="content">
          <h2>The <span>Future</span></h2>
          <p>// Systems nominal. Ready for new input.</p>
        </div>
      </section>
    </>
  );
}