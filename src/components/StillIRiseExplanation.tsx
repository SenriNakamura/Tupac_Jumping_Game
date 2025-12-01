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
import tupitLogo from "../assets/TUPIT_2_color.png";

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
              Back to Home
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
                  instructed by Professor Deion M. Owens, AM. I made this ethnographic project to explore how people navigate structural inequality, carceral systems, and opportunities for transformation, drawing on course theory and the insights I gathered through my interviews with TUPIT educators. 
                  This work reflects on the critical themes and social commentary discussed in Tupac Shakur’s music, utilizing his lyrical insights to inform the game's design. This game invites players to actively climb through themes of intergenerational trauma, mass incarceration, schooling, and inequality—engaging with them through action as well as understanding.
                </p>

                <p className="mt-3">
                  Tupac often argued that traditional schooling did not prepare young people for the real world.
                  In a 1988 interview he said,{" "}
                  <span className="italic">
                    “We’re not being taught to deal with the world as it is. We are being taught to deal with this
                    fairy land that we’re not even living in anymore.”
                  </span>{" "}
                  This game responds to that critique by turning course concepts into a playable social world.
                </p>

                <p className="mt-3">
                  The title <span className="italic">Still I Rise</span> echoes Tupac’s song.
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
              {/* TUPIT Explanation + Logo */}
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={tupitLogo}
                  alt="TUPIT logo"
                  className="w-28 h-auto object-contain rounded-md border border-slate-200 bg-white p-2 shadow-sm"
                />
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                  <p className="font-semibold text-xs">Tufts University Prison Initiative (TUPIT)</p>
                  <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                   provides transformative college-level education for incarcerated and on-campus students, fostering critical thinking, civic engagement, and community.
                  </p>
                </div>
              </div>

                <p className="mt-3">
                  Their insights shaped the “hard path” design and the TUPIT power-up, showing how education
                  transforms possible futures even inside carceral systems.
                </p>
              </div>
              </div>
              {/* --- 03 · Two Screens, Two Social Worlds --- */}
             
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  03 · Two Screens, Two Social Worlds
                </p>

                <h2 className="mt-2 text-base font-semibold">Visualizing Unequal Worlds</h2>

                <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                  The split-screen converts Tupac’s dualities into gameplay. The left side represents relative
                  stability; the right side represents instability shaped by criminalization, surveillance,
                  and structural inequality. The design reflects how two people can share the same city, the
                  same moment, and the same nation—yet live in entirely different realities.
                </p>

                <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                  In <span className="italic">Changes</span>, he raps:<br />
                  <span className="italic">“I’m tired of bein’ poor and, even worse — I’m Black.”</span><br />
                  This line exposes how race, poverty, and limited opportunity collide to shape unequal day-to-day
                  experiences—even among people occupying the same physical world.
                </p>

                <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                  This idea echoed strongly in my interview with David Delvalle. When discussing fairness,
                  he emphasized that too many people imagine inequality as something distant, affecting
                  “others.” He pushed back on that: people incarcerated or navigating reentry are not living
                  in a separate universe—they are part of the same society. As he put it, people often see
                  prison education as a “free” gift, without recognizing that incarcerated students have
                  already “paid in decades, in bullets, in crimes, in time taken from them.” 
                  {/* :contentReference[oaicite:0]{index=0} */}
                </p>

                <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                  His point shows that the two sides of the game are not fantasy—they mirror real-world
                  divides produced by structures, not personal failure. We inhabit the same world, but the
                  weight placed on each path is not the same.
                </p>
              </div>

              
             {/* --- 04 Upward Mobility --- */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                04 · Vertical Climb as Upward Mobility
              </p>

              <h2 className="mt-2 text-base font-semibold">Trying to Rise While the World Pushes Back</h2>

              <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                Jumping upward represents upward mobility. Stable platforms on the left reflect supportive
                conditions—access to schooling, safety, and resources—while shifting platforms on the right
                reflect structural instability shaped by policing, poverty, and carceral control. Both players
                move through the same vertical space, but the risk built into each side is different.
              </p>

              <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                Climbing upward is also a metaphor for living. We rise, fall, go through pain, lose things,
                heal, and try again. The game mirrors that cycle: progress mixed with setbacks, hope mixed with
                exhaustion, and the need to keep moving even when the ground shakes beneath you.
              </p>

              <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                The title <span className="italic">Still I Rise</span> connects to Tupac’s insistence on
                resilience. In that song, he says “Act up if you feel me, I was born not to make it, but I did” 
                capturing the idea that rising is not a clean victory—it’s persistence through struggle. 
                On the right side of the screen, even small mistakes can send you crashing down, reflecting how 
                instability can turn every step upward into a fight.
              </p>

              <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                In <span className="italic">Keep Ya Head Up</span>, Tupac encourages people who feel forgotten:
                <span className="italic"> “It seems the rain'll never let up I try to keep my head up, and still keep from gettin' wet up” </span>
                In the game, that becomes the literal mechanic—looking up, jumping up, and pushing upward even
                when the platforms are narrow, moving, or uncertain.
              </p>

              <p className="mt-3 text-sm text-slate-800 leading-relaxed">
                In <span className="italic">Me Against the World</span>, Tupac admits:
                <span className="italic"> “Stuck in the game Me against the world, baby” </span>
                This echoes how many players on the right side feel: trapped in instability not by choice but
                by structure, constantly climbing just to stay in place.
              </p>

              <p className="mt-4 text-sm text-slate-800 leading-relaxed">
                The climb in this game is not just a test of skill but a way to feel how uneven the climb of
                life can be. We all move upward through the same sky, but not from the same ground—and not with
                the same weight on our backs.
              </p>
            </div>


            </section>

            {/* RIGHT SIDE — DARK PANEL, NO GRADIENT */}
            <section className="p-8 md:p-10 bg-slate-900 text-slate-100 space-y-8">

              {/* COLLECTIBLES CARD */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  05 · Collectibles
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
                    title="Dollar Sign – Economic Stability"
                    body="Savings, steady income, or supportive aid. Money creates possibility instead of pressure."
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
                    body="Echoes how addiction is punished instead of treated as a health issue."
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
                    title="Baby – Cycles of Neglect & Vulnerability"
                    body="Young people facing adult burdens without support — echoing themes in Brenda’s Got a Baby."
                  />
                </div>
              </div>
              {/* TUPIT Power-Up */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300 leading-relaxed">
                <p className="uppercase tracking-widest text-slate-400 text-[11px] font-semibold">
                  06 · TUPIT Power-Up
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={tupitLogo}
                    alt="TUPIT logo"
                    className="h-6 w-auto object-contain opacity-90"
                  />
                  <p className="font-semibold text-slate-100">Education as Opportunity</p>
                </div>

                <p className="mt-2">
                  On the hard path, activating the TUPIT power-up generates book collectibles above the
                  player—symbolizing how programs like TUPIT open academic pathways in environments shaped by
                  surveillance and instability. Players can click the TUPIT logo during the climb to activate this
                  power-up.
                </p>

                <p className="mt-2">
                  When I interviewed David Delvalle, he emphasized that prison education is not charity. People
                  entering TUPIT have already “paid in decades, in bullets, in time taken from them,” he said, and
                  they earn their place through the same academic discipline expected on campus. Education is not
                  a gift—it is a right, and a way to reclaim dignity.
                </p>

                <p className="mt-2">
                  Hilary Binda added that TUPIT works because it treats incarcerated students as full intellectual
                  peers. Courses are shaped with students, not just for them, creating a learning space built on
                  respect rather than rescue.
                </p>

                <p className="mt-2">
                  At the same time, programs like TUPIT don’t magically erase the larger
                  systems of inequality surrounding their students. Education can open doors, but the structural
                  barriers of reentry, stigma, policing, and poverty don’t simply disappear.
                </p>

                <p className="mt-2 italic text-slate-400">
                  The power-up reflects their shared message: even on the hardest climb, one real opportunity can
                  shift what feels possible—while reminding us that the climb itself is still uneven.
                </p>
              </div>

              {/* Hearts section – matched to in-game visuals */}
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm">
                <p className="font-semibold uppercase text-slate-400 tracking-widest text-[11px]">
                  07 · Emotional Feedback
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

            {/* 08 · Why a Game, Not Just an Essay */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300 leading-relaxed mt-8">
              <p className="uppercase tracking-widest text-slate-400 text-[11px] font-semibold">
                08 · Why a Game, Not Just an Essay
              </p>

              <p className="mt-2">
                Hip hop is embodied and interactive. Tupac didn’t just describe the world; he made people feel it. 
                This game tries to do something similar with theory and interviews, turning concepts about inequality
                into a climb you experience in your hands—jumping, falling, and sensing how uneven the paths can be.
              </p>

              <p className="mt-2">
                In his 1988 interview, Tupac explained that his mother raised him with “no lies… everything is real,”
                because hiding the bad only makes it “overwhelming” later. He said young people are “given a horrible 
                world… left in bad shape for us to fix up,” and that adults fail to prepare them by teaching a “fairy land
                we’re not even living in anymore.” That’s why he raps about violence, poverty, and inequality—because telling
                the truth is the only way people can understand the world they’re inheriting.
              </p>

              <p className="mt-2">
                I wanted to follow that same impulse in a medium I know. Tupac expressed truth through rap; I express it through
                engineering and interactive design. This game is my way of making his critiques felt, not just studied—inviting players
                to inhabit, even briefly, the difficult climb he described so clearly at seventeen.
              </p>
            </div>




              {/* REFERENCES */}
              <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300 leading-relaxed">
                <p className="uppercase tracking-widest text-slate-400 text-[11px] font-semibold mb-2">
                  09 · References
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
                    • Shakur, Tupac. <span className="italic">Keep Ya Head Up</span>.{" "}
                    <a
                      href="https://www.youtube.com/watch?v=SHVzWMFMH6Y&list=RDSHVzWMFMH6Y&start_radio=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Listen here
                    </a>
                  </li>

                  <li>
                    • Shakur, Tupac. <span className="italic">Me Against the World</span>.{" "}
                    <a
                      href="https://www.youtube.com/watch?v=hNXdOhwVAhk&list=RDhNXdOhwVAhk&start_radio=1"
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
                      LinkedIn
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
                  <li>
                    • Binda, Hilary — Executive Director, Tufts University Prison Initiative.  
                    <a
                      href="https://tischcollege.tufts.edu/people/faculty/hilary-binda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Faculty Page
                    </a>
                  </li>

                  <li>
                    • Delvalle, David — Education & Reentry Director, TUPIT / MyTERN.  
                    <a
                      href="https://tischcollege.tufts.edu/people/staff/david-delvalle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Staff Page
                    </a>
                  </li>
                  <li>
                    • Tupac Shakur. <span className="italic">Interview</span> (1988).  
                    <a
                      href="https://www.youtube.com/watch?v=WNvxNMpt43A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 underline hover:text-slate-300"
                    >
                      Watch interview
                    </a>
                  </li>
                </ul>
              </div>

              {/* FOOTER DISCLAIMER */}
              <div className="mt-12 border-t border-slate-300 pt-4">
                <p className="text-[12px] text-slate-500 tracking-wide text-center leading-relaxed">
                  This game is a conceptual educational project designed to visualize themes of structural inequality,
                  mobility, and carceral systems for academic study. All visual elements and characters are metaphorical
                  and do not depict or imply traits, behaviors, or identities of any specific racial, ethnic, or social
                  group. The design is intended solely to support critical reflection within the context of the course.
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
