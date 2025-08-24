import { useEffect, useRef, useState } from "react";

// Type for each drum pad
interface PadType {
  keyCode: number;
  key: string;
  id: string;
  url: string;
}

const BANK: PadType[] = [
  { keyCode: 81, key: "Q", id: "Heater 1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { keyCode: 87, key: "W", id: "Heater 2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { keyCode: 69, key: "E", id: "Heater 3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { keyCode: 65, key: "A", id: "Heater 4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { keyCode: 83, key: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { keyCode: 68, key: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { keyCode: 90, key: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { keyCode: 88, key: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { keyCode: 67, key: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

interface PadProps {
  pad: PadType;
  onTrigger: (label: string) => void;
}

function Pad({ pad, onTrigger }: PadProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play();
    onTrigger(pad.id);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toUpperCase() === pad.key) {
      e.preventDefault();
      play();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <button
      id={pad.id}
      className="drum-pad rounded-2xl border border-slate-300/40 bg-white/70 p-6 text-2xl font-bold shadow-sm backdrop-blur transition active:scale-95 hover:shadow-md"
      onClick={play}
    >
      {pad.key}
      <audio ref={audioRef} className="clip" id={pad.key} src={pad.url} preload="auto" />
    </button>
  );
}

export default function DrumMachine() {
  const [display, setDisplay] = useState<string>("Ready");

  const handleTrigger = (label: string) => setDisplay(label);

  return (
    <div id="drum-machine" className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-200 text-slate-900">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 p-6 md:grid-cols-3">
        {/* Pads Grid */}
        <div className="md:col-span-2">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Drum Machine</h1>
          <div className="grid grid-cols-3 gap-4">
            {BANK.map((pad) => (
              <Pad key={pad.key} pad={pad} onTrigger={handleTrigger} />
            ))}
          </div>
        </div>

        {/* Display */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-300/50 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="text-sm uppercase tracking-wide text-slate-500">Display</div>
            <div id="display" className="mt-2 text-2xl font-semibold">
              {display}
            </div>
          </div>

          <footer className="text-xs text-slate-500">Built with React + TS • FCC user stories 🥁</footer>
        </div>
      </div>
    </div>
  );
}
