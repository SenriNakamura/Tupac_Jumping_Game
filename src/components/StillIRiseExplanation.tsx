// StillIRiseExplanationPage.tsx — CLEAN READABLE VERSION
import {
  ArrowLeft,
  BookOpen,
  DollarSign,
  Apple,
  Skull,
  Syringe,
  Car,
  Baby,
  Heart,
} from "lucide-react";

import React from "react";
import { BrokenHeart } from "./BrokenHeart";
import hilaryPic from "../assets/hbinda_headshot.jpeg";
import davidPic from "../assets/David-Delvalle-Headshot.png";


interface Props {
  onBack: () => void;
}

export function StillIRiseExplanationPage({ onBack }: Props) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm">
      <div className="min-h-screen flex items-start justify-center py-10 px-4 sm:px-6 lg:px-8">

        {/* Container – NO gradients */}
        <div className="relative w-full max-w-6xl rounded-3xl border border-slate-700 bg-white shadow-2xl overflow-hidden">

          {/* HEADER – solid white */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-10">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Revolutionary Rhymes · Final Project
              </p>
              <h1 className="text-lg font-semibold text-slate-900">
                The Meaning Behind the Game: <span className="italic">Still I Rise</span>
              </h1>
              <p className="text-xs text-slate-500">Final ethnographic project by Senri Nakamura</p>
            </div>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow hover:bg-slate-100 transition"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Game
            </button>
          </header>

          {/* CONTENT GRID – left white, right dark */}
          <div className="grid md:grid-cols-2 gap-0">

            {/* LEFT SIDE — PLAIN WHITE */}
            <section className="p-8 md:p-10 bg-white text-slate-800 space-y-10 leading-relaxed text-sm">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* --- 01 INTRO --- */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  01 · Introduction
                </p>
                <h2 className="mt-2 text-base font-semibold text-slate-900">Why I Made This Game</h2>

                <p className="mt-3">
                  I created this interactive game as my final project for{" "}
                  <span className="italic">Revolutionary Rhymes: Tupac Shakur and the Study of Society</span>{" "}
                  instructed by Professor Deion M. Owens, AM. Instead of using slides to discuss
                  intergenerational trauma, mass incarceration, schooling, and inequality, this game asks players to
                  climb through those themes with their hands, not only their heads.
                </p>

                <p className="mt-3">
                  Tupac often argued that traditional schooling did not prepare young people for the real world.
                  In a 1992 interview he said,{" "}
                  <span className="italic">
                    “We’re not being taught to deal with the world as it is. We are being taught to deal with this
                    fairy land that we’re not even living in anymore.”
                  </span>{" "}
                  This game responds to that critique by turning course concepts into a playable social world.
                </p>

                <p className="mt-3">
                  The title <span className="italic">Still I Rise</span> echoes Tupac’s song and Maya Angelou’s poem.
                  It highlights the persistence required to keep rising even when systems are structured to pull you
                  back down.
                </p>
              </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* --- 02 TUPIT --- */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  02 · TUPIT, Hilary, and David
                </p>

                <h2 className="mt-2 text-base font-semibold text-slate-900">
                  People and Program Behind the Right Side
                </h2>

                <p className="mt-3">
                  This project draws heavily on insights shared by Professor Hilary Binda and Mr. David Delvalle
                  during my ethnographic interviews.
                </p>
                {/* Hilary Binda */}
                <div className="mt-4 flex items-center gap-4">
                  <img
                    src={hilaryPic}
                    alt="Professor Hilary Binda"
                    className="w-20 h-20 object-cover rounded-xl border border-slate-300 shadow"
                  />
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                    <p className="font-semibold text-xs">Professor Hilary Binda</p>
                    <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                      Founder & Executive Director of the Tufts University Prison Initiative of
                      Tisch College (TUPIT) and the MyTERN reentry program. She teaches
                      literature, carceral studies, and gender studies.
                    </p>
                  </div>
                </div>

                {/* David Delvalle */}
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={davidPic}
                  alt="Mr. David Delvalle"
                  className="w-20 h-20 object-cover rounded-xl border border-slate-300 shadow"
                />
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                  <p className="font-semibold text-xs">Mr. David Delvalle</p>
                  <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                    Education & Reentry Director of TUPIT and MyTERN. He began his Tufts
                    degree while incarcerated and now works as an educator and advocate for
                    justice reform.
                  </p>
                </div>
              </div>

                <p className="mt-3">
                  Their insights shaped the “hard path” design and the TUPIT power-up, showing how education
                  transforms possible futures even inside carceral systems.
                </p>
              </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* --- 03 Split Screen --- */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  03 · Two Screens, Two Social Worlds
                </p>

                <h2 className="mt-2 text-base font-semibold">Visualizing Unequal Worlds</h2>

                <p className="mt-3">
                  The split screen converts Tupac’s dualities into gameplay. The left side represents relative
                  stability; the right side represents instability shaped by criminalization and surveillance.
                </p>

                <p className="mt-3">
                  In <span className="italic">Changes</span>, he raps:
                  <br />
                  <span className="italic">“I’m tired of bein’ poor and even worse I’m Black.”</span>
                </p>
              </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* --- 04 Upward Mobility --- */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  04 · Vertical Climb as Upward Mobility
                </p>

                <h2 className="mt-2 text-base font-semibold">Trying to Rise While the World Pushes Back</h2>

                <p className="mt-3">
                  Jumping upward represents upward mobility. Stable platforms on the left reflect supportive
                  conditions; shifting platforms on the right reflect structural instability.
                </p>
              </div>
              </div>
            </section>

            {/* RIGHT SIDE — DARK PANEL, NO GRADIENT */}
            <section className="p-8 md:p-10 bg-slate-900 text-slate-100 space-y-8">

              {/* COLLECTIBLES CARD */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Collectibles
                </p>

                {/* GOOD COLLECTIBLES */}
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  Good Collectibles (Help You Rise)
                </p>
                <div className="mt-2 space-y-3">
                  <CollectibleRow
                    icon={<BookOpen className="h-4 w-4 text-white" />}
                    title="Book – Education Access"
                    body="Boosts your chances: schooling, degrees, and programs like TUPIT that open doors instead of closing them."
                  />
                  <CollectibleRow
                    icon={<Apple className="h-4 w-4 text-white" />}
                    title="Apple – Basic Needs Met"
                    body="Food, health, and stability. When these are present, it’s easier to focus on learning and growth."
                  />
                  <CollectibleRow
                    icon={<DollarSign className="h-4 w-4 text-white" />}
                    title="Dollar Sign – Predatory Costs"
                    body="Debt, fines, and fees that drain resources instead of investing in you."
                  />
                </div>

                {/* BAD COLLECTIBLES */}
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  Bad Collectibles (Pull You Down)
                </p>
                <div className="mt-2 space-y-3">
                  
                  <CollectibleRow
                    icon={<Syringe className="h-4 w-4 text-white" />}
                    title="Syringe – Criminalized Drug Use"
                    body="Echoes how addiction is punished instead of treated as a health issue, repeating Afeni and Tupac’s story."
                  />
                  <CollectibleRow
                    icon={<Skull className="h-4 w-4 text-white" />}
                    title="Skull – Carceral & Deadly Outcomes"
                    body="Represents jail, violence, and early death baked into unequal systems."
                  />
                  <CollectibleRow
                    icon={<Car className="h-4 w-4 text-white" />}
                    title="Car – Systemic Obstacles"
                    body="Police stops, surveillance, and over-policing that can derail the climb at any moment."
                  />
                  <CollectibleRow
                    icon={<Baby className="h-4 w-4 text-white" />}
                    title="Car – Systemic Obstacles"
                    body="Police stops, surveillance, and over-policing that can derail the climb at any moment."
                  />
                </div>
              </div>

              {/* Hearts section – matched to in-game visuals */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-xs">
                <p className="font-semibold uppercase text-slate-400 tracking-widest text-[10px]">
                  Emotional Feedback
                </p>

                {/* GOOD HEART: bright red, glowing, floating up */}
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900"
                    style={{
                      filter:
                        "drop-shadow(0 0 8px rgba(255,255,255,0.8)) drop-shadow(0 0 4px rgba(255,100,100,0.6))",
                    }}
                  >
                    <Heart className="h-4 w-4 text-red-500" fill="#EF4444" />
                  </div>
                  <p className="font-semibold">Glowing Hearts (Good Collectibles)</p>
                </div>

                <p className="mt-2 text-slate-300">
                  The full bright-red heart with a soft white glow matches the in-game animation:
                  it floats upward and slowly fades out when you gain a life or positive resource.
                  It marks moments of care, repair, and being “lifted up.”
                </p>

                {/* BAD HEART: dark red, cracked, jittery/falling */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
                    <BrokenHeart size={18} />
                  </div>
                  <p className="font-semibold">Broken Hearts (Bad Collectibles)</p>
                </div>

                <p className="mt-2 text-slate-300">
                  The deep red cracked heart matches the bad collectible animation: it drops,
                  jitters side-to-side, and rotates as your life is taken away. It visualizes
                  trauma, punishment, and how one mistake can echo through the rest of the climb.
                </p>
              </div>


              {/* Why a Game */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-xs text-slate-300 leading-relaxed">
                <p className="uppercase tracking-widest text-slate-400 text-[10px] font-semibold">
                  Why a Game, Not Just an Essay
                </p>

                <p className="mt-2">
                  Hip hop is embodied and interactive. This game translates theory, interviews, and Tupac’s
                  critiques into a playable world you feel rather than just read.
                </p>

                <p className="mt-2 italic text-slate-400">
                  “Keep Ya Head Up” becomes the game’s core mechanic—keep rising even when the world pushes down.
                </p>
              </div>

              {/* REFERENCES */}
              <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-4 text-xs text-slate-300 leading-relaxed">
                <p className="uppercase tracking-widest text-slate-400 text-[10px] font-semibold mb-2">
                  References
                </p>

                <ul className="space-y-1">
                  <li>
                    • Shakur, Tupac. <span className="italic">Still I Rise</span>.  
                    <a
                      href="https://youtu.be/931I2WbJHXE?si=ufSJ4Mhcu2n77f-W"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Listen here
                    </a>
                  </li>

                  <li>
                    • Shakur, Tupac. <span className="italic">Changes</span>.  
                    <a
                      href="https://www.youtube.com/watch?v=eXvBjCO19QY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Listen here
                    </a>
                  </li>

                  <li>
                    • Tufts University Prison Initiative of Tisch College (TUPIT).  
                    <a
                      href="https://sites.tufts.edu/tupit/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Official Site
                    </a>
                  </li>

                  <li>
                    • MyTERN Reentry Program.  
                    <a
                      href="https://sites.tufts.edu/tupit/mytern-2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Learn More
                    </a>
                  </li>

                  <li>
                    • Owens, Deion M. — Course:  
                    <span className="italic">
                      Revolutionary Rhymes: Tupac Shakur and the Study of Society
                    </span>.
                    <a
                      href="https://www.linkedin.com/in/deion-m-owens/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-slate-400 underline hover:text-slate-300"
                    >
                      Faculty Page
                    </a>
                  </li>

                  <li>
                    • Interviews with Hilary Binda & David Delvalle (2025).  
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-slate-500 cursor-default"
                    >
                      (private interview data)
                    </a>
                  </li>
                </ul>
              </div>

              {/* FOOTER DISCLAIMER */}
              <div className="mt-12 border-t border-slate-300 pt-3">
                <p className="text-[10px] text-slate-500 tracking-wide text-center leading-relaxed">
                  This game is a conceptual educational project designed to visualize themes of structural inequality,
                  mobility, and carceral systems for academic study. All visual elements are metaphorical and do not
                  depict or imply characteristics of any specific group or individual. The design is intended solely to
                  support critical reflection within the course context.
                </p>
              </div>

            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RowProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

function CollectibleRow({ icon, title, body }: RowProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        <p className="text-xs text-slate-400">{body}</p>
      </div>
    </div>
  );
}
