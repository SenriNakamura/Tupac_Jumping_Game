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

              {/* --- 01 INTRO --- */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  01 · Introduction
                </p>
                <h2 className="mt-2 text-base font-semibold text-slate-900">Why This Game Exists</h2>

                <p className="mt-3">
                  I created this interactive game as my final project for{" "}
                  <span className="italic">Revolutionary Rhymes: Tupac Shakur and the Study of Society</span>{" "}
                  instructed by Professor Deion M. Owens, AM. Instead of using lecture slides to discuss
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

                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                  <p className="font-semibold text-xs">Professor Hilary Binda</p>
                  <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                    Founder & Executive Director of the Tufts University Prison Initiative of Tisch College (TUPIT)
                    and the MyTERN reentry program. She teaches literature, carceral studies, and gender studies.
                  </p>
                </div>

                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                  <p className="font-semibold text-xs">Mr. David Delvalle</p>
                  <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                    Education & Reentry Director of TUPIT and MyTERN. He began his Tufts degree while incarcerated
                    and now works as an educator and advocate for justice reform.
                  </p>
                </div>

                <p className="mt-3">
                  Their insights shaped the “hard path” design and the TUPIT power-up, showing how education
                  transforms possible futures even inside carceral systems.
                </p>
              </div>

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
            </section>

            {/* RIGHT SIDE — DARK PANEL, NO GRADIENT */}
            <section className="p-8 md:p-10 bg-slate-900 text-slate-100 space-y-8">

              {/* Collectible List */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Collectible Palette
                </p>
                <h2 className="mt-2 text-base font-semibold">What Each Icon Means</h2>
                <p className="mt-2 text-xs text-slate-400">
                  Each collectible embodies course theory, lyrics, and themes.
                </p>

                <div className="mt-4 space-y-5">

                  <CollectibleRow
                    icon={<BookOpen className="h-5 w-5 text-emerald-300" />}
                    title="Book – Education and political literacy"
                    body="Books represent political education and critical awareness, echoing Afeni Shakur’s teachings and TUPIT’s mission."
                  />

                  <CollectibleRow
                    icon={<DollarSign className="h-5 w-5 text-amber-300" />}
                    title="Money – Economic survival"
                    body="Represents rent, food, stability, and the ability to avoid risky decisions under economic pressure."
                  />

                  <CollectibleRow
                    icon={<Apple className="h-5 w-5 text-rose-300" />}
                    title="Food – Basic needs and survival"
                    body="Shows how hunger and housing insecurity shape decision-making and opportunity."
                  />

                  <CollectibleRow
                    icon={<Skull className="h-5 w-5 text-red-400" />}
                    title="Skull / Gun – Violence and hypermasculinity"
                    body="Reflects danger and the silence–violence loop discussed in class."
                  />

                  <CollectibleRow
                    icon={<Syringe className="h-5 w-5 text-cyan-300" />}
                    title="Syringe – Addiction and coping"
                    body="Connects to Afeni Shakur’s struggle with addiction and harmful coping systems."
                  />

                  <CollectibleRow
                    icon={<Car className="h-5 w-5 text-blue-300" />}
                    title="Police – Surveillance and criminalization"
                    body="Represents carceral power and systemic surveillance, major themes in the course."
                  />

                  <CollectibleRow
                    icon={<Baby className="h-5 w-5 text-teal-300" />}
                    title="Baby – Brenda’s Got a Baby"
                    body="Echoes Tupac’s story of a girl forced into adulthood without support."
                  />
                </div>
              </div>

              {/* Hearts section */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-xs">
                <p className="font-semibold uppercase text-slate-400 tracking-widest text-[10px]">
                  Emotional Feedback
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-emerald-300" />
                  <p className="font-semibold">Floating Hearts</p>
                </div>

                <p className="mt-2 text-slate-300">
                  Represents emotional repair and support—moments when players “feel seen.”
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-300 rotate-12" />
                  <p className="font-semibold">Cracked Hearts & Falling</p>
                </div>

                <p className="mt-2 text-slate-300">
                  Reflects trauma, setbacks, and cycles of punishment within unequal systems.
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
