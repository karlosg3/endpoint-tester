import './Docs.css';

const Documentation = () => {
  return (
    <div className="doc-container">
      <div className="doc-content">
        <h1 className="doc-header">
          <span className="accent-blue">DARO</span> Endpoint Tester
        </h1>
        
        <div className="doc-separator"></div>
        
        <p className="doc-intro">
          A lightweight, browser-based API client (inspired by Postman) for testing RESTful endpoints. Built with speed and simplicity in mind using <strong>Vite</strong> and <strong>pnpm</strong>.
        </p>

        <section className="doc-section">
          <h2>🛠️ Current Status: MVP (Minimum Viable Product)</h2>
          <p>This project is currently in active development. The goal is to provide a clean interface for testing common HTTP methods and inspecting real-time responses.</p>
          
          <h3>✅ Supported Features</h3>
          <ul className="doc-list">
            <li><strong>Request Methods:</strong>
              <ul className="sub-list">
                <li><code>GET</code>: Fetch data from any public or local API.</li>
                <li><code>POST</code>: Send new data to a server.</li>
                <li><code>PATCH</code>: Test partial resource updates.</li>
                <li><code>DELETE</code>: Verify resource removal.</li>
              </ul>
            </li>
            <li><strong>Response Viewer:</strong> Real-time display of the JSON response returned by the server.</li>
            <li><strong>Custom Headers:</strong> (Planned/In-Progress) Ability to add Auth tokens or Content-Type headers.</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>📁 Project Structure</h2>
          <p>The project follows a modular architecture to keep components reusable:</p>
          <ul className="doc-list">
            <li><code>/src/views</code>: Contains the main Tester dashboard.</li>
            <li><code>/src/components/layout</code>: Houses the <code>Header</code>, <code>Navbar</code>, and <code>Footer</code>.</li>
            <li><code>/src/components/common</code>: Contains the <code>RequestForm</code>, <code>MethodSelector</code>, and <code>ResponseDisplay</code>.</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>⚙️ Development Setup</h2>
          <p>This project uses <strong>pnpm</strong> for package management. To get started locally:</p>
          
          <div className="code-block">
            <p>1. Clone the repository:</p>
            <code>git clone &lt;your-repo-link&gt;<br/>cd &lt;project-folder&gt;</code>
          </div>
          
          <div className="code-block">
            <p>2. Install dependencies:</p>
            <code>pnpm install</code>
          </div>
          
          <div className="code-block">
            <p>3. Run the development server:</p>
            <code>pnpm dev</code>
          </div>
          
          <div className="code-block">
            <p>4. Build for production:</p>
            <code>pnpm build</code>
          </div>
        </section>

        <section className="doc-section">
          <h2>🗺️ Roadmap</h2>
          <ul className="checklist">
            <li><input type="checkbox" disabled /> Add support for <code>GET</code> requests.</li>
            <li><input type="checkbox" disabled /> Add support for <code>POST</code> requests.</li>
            <li><input type="checkbox" disabled /> Add support for <code>PATCH</code> requests.</li>
            <li><input type="checkbox" disabled /> Add support for <code>DELETE</code> requests.</li>
            <li><input type="checkbox" disabled /> Add support for <code>PUT</code> requests.</li>
            <li><input type="checkbox" disabled /> Syntax highlighting for the JSON response body.</li>
            <li><input type="checkbox" disabled /> Request History (Local Storage) to save previous tests.</li>
            <li><input type="checkbox" disabled /> Environment variable support (e.g., <code>{`{{baseUrl}}`}</code>).</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>👥 Contributors</h2>
          <p>A huge thanks to the people who have helped build this tool:</p>
          <ul className="doc-list contributors">
            <li><strong>@K4</strong> - UI/UX Designer</li>
            <li><strong>@SerevrGG</strong> - Front-End Developer</li>
            <li><strong>@DazeChr</strong> - Full-Stack Developer</li>
          </ul>
        </section>

        <div className="doc-separator bottom-separator"></div>
        <p className="license-text">📄 Distributed under the MIT License.</p>
      </div>
    </div>
  );
};

export default Documentation;