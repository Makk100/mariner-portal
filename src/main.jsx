import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [tab, setTab] = useState('home');
  const [vessel, setVessel] = useState('');
  const [voyages, setVoyages] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  
  const sampleQuiz = [
    {
      q: "A ship moves from river water to sea water. What happens to its draft?",
      opts: ["It sinks deeper", "It rises slightly", "Remains exactly the same", "It lists heavily"],
      ans: 1,
      exp: "Sea water is denser than fresh river water, providing more buoyant force, causing the ship to rise slightly."
    },
    {
      q: "Which machinery is used to drop or heave the ship's anchor?",
      opts: ["Capstan", "Steering Gear", "Windlass", "Cargo Winch"],
      ans: 2,
      exp: "The anchor windlass is the specialized machinery used on deck for handling heavy chain cables."
    }
  ];

  const addVoyage = (e) => {
    e.preventDefault();
    if(!vessel) return;
    setVoyages([...voyages, { name: vessel, id: Date.now() }]);
    setVessel('');
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans">
      {/* Sidebar Layout */}
      <aside className="w-64 bg-zinc-900 p-6 border-r border-zinc-800 flex flex-col gap-6">
        <h1 className="text-xl font-bold text-emerald-400 flex items-center gap-2">⚓ MARINER PORTAL</h1>
        <nav className="flex flex-col gap-2">
          <button onClick={() => setTab('home')} className={`text-left p-3 rounded text-sm transition ${tab === 'home' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>📊 Overview</button>
          <button onClick={() => setTab('calc')} className={`text-left p-3 rounded text-sm transition ${tab === 'calc' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>限制️ Sea Time Logs</button>
          <button onClick={() => setTab('quiz')} className={`text-left p-3 rounded text-sm transition ${tab === 'quiz' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>📚 IMU-CET Prep</button>
        </nav>
      </aside>

      {/* Primary Display Portal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {tab === 'home' && (
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Aboard</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">Your custom portal is fully operational. Select an options matrix tool from your sidebar log interface to continue tracking compliance metrics.</p>
          </div>
        )}

        {tab === 'calc' && (
          <div className="max-w-md bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
            <h3 className="text-lg font-bold mb-1 text-emerald-400">🚢 Sea Time Entry Engine</h3>
            <p className="text-xs text-zinc-400 mb-4">Log contracts to evaluate Certificate of Competency upgrade status windows.</p>
            <form onSubmit={addVoyage} className="space-y-4">
              <input type="text" value={vessel} onChange={e => setVessel(e.target.value)} placeholder="Enter Vessel Name (e.g., MT Ocean Pride)" className="w-full bg-zinc-800 p-2.5 text-sm rounded border border-zinc-700 text-white focus:outline-none focus:border-emerald-500" />
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 p-2.5 rounded font-bold text-sm transition">Commit Voyage Entry</button>
            </form>
            <div className="mt-6 space-y-2 border-t border-zinc-800 pt-4">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Logged Ledgers</h4>
              {voyages.length === 0 ? <p className="text-xs text-zinc-500 italic">No entries saved locally.</p> : voyages.map((v) => (
                <div key={v.id} className="p-3 bg-zinc-950 rounded border border-zinc-800 text-sm flex justify-between items-center">{v.name} <span className="text-xs text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">Verified</span></div>
              ))}
            </div>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="max-w-xl bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
            <h3 className="text-lg font-bold mb-1 text-blue-400">🎓 IMU-CET Practice Board</h3>
            <p className="text-xs text-zinc-400 mb-6">Interactive simulator sets for navigating candidates and engineering cadets.</p>
            <div className="mb-6 bg-zinc-950 p-4 border border-zinc-800 rounded-lg">
              <p className="text-sm font-medium leading-relaxed">{sampleQuiz[quizIdx].q}</p>
            </div>
            <div className="space-y-2">
              {sampleQuiz[quizIdx].opts.map((opt, i) => {
                let btnStyle = "bg-zinc-800 border-zinc-700 hover:bg-zinc-700";
                if(selectedOpt !== null) {
                  if(i === sampleQuiz[quizIdx].ans) btnStyle = "bg-emerald-900/60 border-emerald-500 text-emerald-200";
                  else if(i === selectedOpt) btnStyle = "bg-red-900/60 border-red-500 text-red-200";
                  else btnStyle = "bg-zinc-800/40 border-zinc-800 text-zinc-500 opacity-60";
                }
                return (
                  <button key={i} disabled={selectedOpt !== null} onClick={() => setSelectedOpt(i)} className={`w-full text-left p-3.5 text-sm rounded-lg border transition-all ${btnStyle}`}>{opt}</button>
                );
              })}
            </div>
            {selectedOpt !== null && (
              <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200 block mb-1">Explanation:</strong> {sampleQuiz[quizIdx].exp}
                <button onClick={() => { setSelectedOpt(null); setQuizIdx((quizIdx + 1) % sampleQuiz.length); }} className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded text-xs transition">Next Evaluation Module →</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
