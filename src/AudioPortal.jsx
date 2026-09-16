import React, { useRef, useState, useEffect } from "react";

function formatTime(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
}

function AudioPlayer({ src, dark = true }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
    } else {
      a.play();
    }
    setPlaying(!playing);
  };

  const seek = (e) => {
    const a = ref.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * duration;
  };

  const progressPct = duration ? (current / duration) * 100 : 0;
  const fg = dark ? "#F5F1E8" : "#100F0D";
  const track = dark ? "rgba(245,241,232,0.2)" : "rgba(16,15,13,0.15)";

  return (
    <div className="flex items-center gap-3 w-full">
      <audio ref={ref} src={src} preload="metadata" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border"
        style={{ borderColor: fg, color: fg }}
      >
        {playing ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <rect x="1" y="1" width="3.5" height="10" />
            <rect x="7" y="1" width="3.5" height="10" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <polygon points="1,0.5 11,6 1,11.5" />
          </svg>
        )}
      </button>
      <span className="text-xs tabular-nums shrink-0" style={{ color: fg, opacity: 0.7 }}>
        {formatTime(current)}
      </span>
      <div
        onClick={seek}
        className="flex-1 h-1.5 rounded-full cursor-pointer relative"
        style={{ backgroundColor: track }}
      >
        <div
          className="h-full rounded-full absolute left-0 top-0"
          style={{ width: `${progressPct}%`, backgroundColor: fg }}
        />
      </div>
      <span className="text-xs tabular-nums shrink-0" style={{ color: fg, opacity: 0.7 }}>
        {formatTime(duration)}
      </span>
    </div>
  );
}

/**
 * AudioPortal
 * =========================================================================
 * /journey-audio-portal rotası — Journey kitabındaki QR kodlarının
 * hedeflediği, en kritik sayfa. Anchor ID'ler eski Wix sayfasındakiyle
 * BİREBİR aynı tutuldu:
 *   #journey-theforest, #burton-the-owl, #tiger, #peacock, #elephant,
 *   #wolf, #stag, #phoenix, #crow, #serpent, #unicorn
 * =========================================================================
 */

const CHAPTERS = [
  {
    id: "journey-theforest",
    title: "The Forest",
    subtitle: "The Gateway",
    pages: "Page 4 – 5",
    image: "/audio-portal/images/forest.png",
    audio: "/audio-portal/mp3/Intro- The Forest.mp3",
    text: `The Forest is where silence speaks first.
Before any guardian appears, before any lesson unfolds, the traveler enters the stillness: into the subconscious.

This piece is the true beginning. Not yet a character.
Not yet a test. But a threshold.
The forest does not explain itself; it invites you to feel.

It is the moment before meaning. The space where the journey quietly begins.
Press play, and let the forest open.`,
  },
  {
    id: "burton-the-owl",
    title: "Burton the Owl",
    subtitle: "The Guide",
    pages: "Page 6 – 7",
    image: "/audio-portal/images/burton.png",
    audio: "/audio-portal/mp3/Burton The Owl - The Guide.mp3",
    text: `Burton is the first voice within the forest.
A quiet presence in the dark, watching with calm certainty.

He does not push the traveler forward. He simply speaks, and something shifts. The silence becomes a dialogue. The night feels less distant.

Burton offers no commands. Only an opening. An invitation to imagine, to color freely, and to step into the journey in your own way.

The path moves the moment you decide to follow it.`,
  },
  {
    id: "tiger",
    title: "The Tiger",
    subtitle: "Valor",
    pages: "Page 8 – 9",
    image: "/audio-portal/images/tiger.png",
    audio: "/audio-portal/mp3/The Tiger - Valor.mp3",
    text: `Deeper in the woods, the traveler faces their first true test: The Tiger.

A powerful shadow steps forward, not to attack, but to be seen. The Tiger is not a threat.
He stands like a mirror.
In his presence, tension turns into something clearer: a choice.
To remain where you are, or to move.

Fear does not disappear.
It changes shape. And courage begins the moment you decide to take a step.`,
  },
  {
    id: "peacock",
    title: "The Peacock",
    subtitle: "Splendor",
    pages: "Page 10 – 11",
    image: "/audio-portal/images/peacock.png",
    audio: "/audio-portal/mp3/The Peacock - Splendor.mp3",
    text: `Standing in a moonlit clearing, the Peacock marks the shift from outward survival to inner reflection.
She becomes a mirror for authenticity.

In her presence, the focus turns inward.
External expectations begin to fade.

She invites the traveler to recreate the world using the colors of their own heart.

This is the moment when a unique voice begins to surface, and the journey opens into aesthetic freedom.`,
  },
  {
    id: "elephant",
    title: "The Elephant",
    subtitle: "Resonance",
    pages: "Page 12 – 13",
    image: "/audio-portal/images/elephant.png",
    audio: "/audio-portal/mp3/The Elephant - Resonance.mp3",
    text: `The Elephant carries the weight of time and the quiet strength of ancestral memory.
His presence slows everything down.

With him, the journey moves from the fleeting moment toward something deeper and lasting.

He reminds the traveler that progress is not only about speed, but about rhythm, and roots.

This is a moment of balance: knowing when to remember, and when to let go, so the road ahead feels lighter.`,
  },
  {
    id: "wolf",
    title: "The Wolf",
    subtitle: "Sovereign",
    pages: "Page 14 – 15",
    image: "/audio-portal/images/wolf.png",
    audio: "/audio-portal/mp3/The Wolf - Sovereign.mp3",
    text: `The Wolf carries the sharp tension of isolation and the warmth that follows it.
The encounter begins with a solitary howl, clear and piercing.

Then something shifts. The sound widens. The rhythm gathers. What was once alone now runs with the pack.

The Wolf reminds the traveler that walking alone can be brave. Yet true strength is not in isolation, but in knowing you belong.

Solitude becomes connection, and the forest moves as one.`,
  },
  {
    id: "stag",
    title: "The Stag",
    subtitle: "Luminescence",
    pages: "Page 16 – 17",
    image: "/audio-portal/images/stag.png",
    audio: "/audio-portal/mp3/The Stag - Luminescence.mp3",
    text: `The Stag stands in quiet elegance and clear presence. She reflects the inner light that already lives within the traveler.

She does not guide the way.
She reminds. In her stillness, darkness and light are no longer opposites. One reveals the other.

This encounter moves gently, without force.
What once felt like struggle begins to soften.

The journey finds a calmer rhythm flowing forward with grace.`,
  },
  {
    id: "phoenix",
    title: "The Phoenix",
    subtitle: "Rebirth",
    pages: "Page 18 – 19",
    image: "/audio-portal/images/phoenix.png",
    audio: "/audio-portal/mp3/The Phoenix - Rebirth.mp3",
    text: `The Phoenix carries the quiet force of change.
She falls as a spark and rises as flame.

Loss and renewal move in the same rhythm.
Nothing truly vanishes, it transforms.

Her presence moves through descent and lift, through slowing down and rising again.

To change is not to disappear.
It is to become.

Every ending holds the beginning of something new.`,
  },
  {
    id: "crow",
    title: "The Crow",
    subtitle: "Chaos & Play",
    pages: "Page 20 – 23",
    image: "/audio-portal/images/crow.png",
    audio: "/audio-portal/mp3/The Crow - Chaos & Play.mp3",
    text: `The Crow is the journey's jester, quick, sharp, and impossible to ignore.
He slices through the forest's seriousness with laughter, turning the road, if only for a moment into a playground.

He reminds the traveler that stories need play.
That coloring outside the lines is not a mistake, but a choice. With him, the path loosens.
What felt heavy begins to lift.

And then, as quickly as he arrived, the laughter thins into mist.
Silence returns heavier than before, hinting that something deeper is waiting ahead.`,
  },
  {
    id: "serpent",
    title: "The Serpent",
    subtitle: "Composure",
    pages: "Page 24 – 25",
    image: "/audio-portal/images/serpent.png",
    audio: "/audio-portal/mp3/The Serpent - Composure.mp3",
    text: `From the heavy mist, the Serpent appears; quiet, steady, and powerful. Her presence carries a strength that does not need to announce itself.

She moves close to the earth, yet her gaze reaches higher. With her, power takes on a different meaning. Not force. Not destruction. But knowing your own pace.
Knowing when to move, and when to pause.

This moment unfolds in a slow, steady rhythm, an invitation to move with your strength, instead of pushing against the world.`,
  },
  {
    id: "unicorn",
    title: "The Unicorn",
    subtitle: "Integration",
    pages: "Page 26 – 30",
    image: "/audio-portal/images/unicorn.png",
    audio: "/audio-portal/mp3/The Unicorn - Integration.mp3",
    text: `As the mists lift over the Silver Lake, the Unicorn appears, calm and luminous.
With her, a quiet realization settles in: the forest was always a mirror.

The journey does not end here. It opens.
The final page is titled 'The Start'.
What seemed like a destination becomes an invitation.

The last space is left blank, waiting.

No longer just a witness, the reader becomes the creator, free to begin again with their own colors.`,
  },
];

const LISTEN_ON = [
  { label: "Spotify", href: "https://open.spotify.com/album/19i0QPH081krNvp4QOG2AA?si=D2kb7kD5Tlmv58tkm3RUdQ" },
  { label: "YouTube", href: "https://www.youtube.com/@the.YangStudio" },
  { label: "Apple Music", href: "https://music.apple.com/us/album/journey-original-soundtrack/1881150474" },
  { label: "Amazon Music", href: "https://music.amazon.in/artists/B0GQJMHQKP/yang-studio" },
];

function ChapterRow({ chapter }) {
  return (
    <section
      id={chapter.id}
      className="grid grid-cols-1 md:grid-cols-[280px_280px_1fr] gap-8 py-12 border-b border-[#3A342B]/30 scroll-mt-24"
    >
      <img
        src={chapter.image}
        alt={chapter.title}
        className="w-full md:w-[280px] h-auto object-contain rounded-sm self-start"
      />
      <div>
        <h3
          className="text-2xl text-[#F5F1E8]"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
        >
          {chapter.title}
        </h3>
        <p className="text-[#F5F1E8]/60 text-sm mb-5">{chapter.subtitle}</p>
        <AudioPlayer src={chapter.audio} />
        <p className="text-[#F5F1E8]/40 text-xs tracking-wide mt-4">{chapter.pages}</p>
      </div>
      <p className="text-[#F5F1E8]/75 text-[15px] leading-relaxed whitespace-pre-line">
        {chapter.text}
      </p>
    </section>
  );
}

export default function AudioPortal() {
  return (
    <div className="min-h-screen bg-[#100F0D] text-[#F5F1E8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              fontFamily: "Fraunces, serif",
              backgroundImage:
                "linear-gradient(90deg, #E8C15A, #7FD1AE, #6FB8E8, #C58AE8)",
            }}
          >
            Audio Portal
          </h1>
          <p className="text-[#F5F1E8]/70 max-w-xl mx-auto leading-relaxed">
            This overture is your gateway, weaving the core themes of the 11
            guardians into a single orchestral narrative.
            <br />
            Press play, find your focus, and let the forest reveal itself.
          </p>
        </div>

        {/* Overture player */}
        <div className="flex items-center gap-5 bg-[#F5F1E8] text-[#100F0D] rounded-md p-5 mb-16">
          <img
            src="/audio-portal/images/overture-cover.png"
            alt="Journey — The Overture"
            className="w-20 h-20 object-cover rounded shrink-0"
          />
          <div className="flex-1">
            <p className="text-xs tracking-wide text-black/50">Yang Studio</p>
            <p className="font-medium mb-3">Journey — The Overture</p>
            <AudioPlayer
              src="/audio-portal/mp3/01 - Yang Studio_Journey_Overture .mp3"
              dark={false}
            />
          </div>
        </div>

        {/* Listen on */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl mb-6 font-bold tracking-wide"
            style={{
              fontFamily: "Fraunces, serif",
              backgroundImage: "linear-gradient(90deg, #1F3A93, #4A90D9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LISTEN ON
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {LISTEN_ON.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="border border-[#F5F1E8]/25 rounded-full px-6 py-2 text-sm hover:bg-[#F5F1E8] hover:text-[#100F0D] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Order / download */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <a
            href="https://amzn.to/4c1DNeT"
            target="_blank"
            rel="noreferrer"
            className="bg-[#F5F1E8] text-[#100F0D] rounded-full px-7 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Order your book
          </a>
        </div>

        {/* Chapters */}
        <h2
          className="text-4xl text-center mb-4"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
        >
          Choose your chapter
        </h2>
        <div>
          {CHAPTERS.map((c) => (
            <ChapterRow key={c.id} chapter={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
