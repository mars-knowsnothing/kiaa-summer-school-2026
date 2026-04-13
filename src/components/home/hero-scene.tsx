"use client";

import dynamic from "next/dynamic";

const ProtoplanetaryDisk = dynamic(
  () =>
    import("@/components/home/protoplanetary-disk").then(
      (mod) => mod.ProtoplanetaryDisk
    ),
  {ssr: false}
);

type HeroSceneCard = {
  kicker: string;
  title: string;
  description: string;
};

type HeroSceneProps = {
  cards: readonly [HeroSceneCard, HeroSceneCard];
};

export function HeroScene({cards}: HeroSceneProps) {
  const [topCard, bottomCard] = cards;

  return (
    <div className="glass-panel hero-scene relative isolate p-5 sm:p-6">
      <div className="relative aspect-[4/5] min-h-[26rem]">
        {/* 3D protoplanetary disk */}
        <div className="absolute inset-0 z-0">
          <ProtoplanetaryDisk />
        </div>

        {/* Floating glass info cards */}
        <div className="hero-scene__card hero-scene__card--top z-10">
          <p className="relative z-10 text-[0.62rem] uppercase tracking-[0.34em] text-[var(--accent)]">
            {topCard.kicker}
          </p>
          <p className="relative z-10 mt-3 text-2xl font-semibold text-[var(--foreground)]">{topCard.title}</p>
          <p className="relative z-10 mt-2 text-sm leading-6 text-[var(--muted)]">{topCard.description}</p>
        </div>

        <div className="hero-scene__card hero-scene__card--bottom z-10">
          <p className="relative z-10 text-[0.62rem] uppercase tracking-[0.34em] text-amber-600/70">
            {bottomCard.kicker}
          </p>
          <p className="relative z-10 mt-3 text-2xl font-semibold text-[var(--foreground)]">{bottomCard.title}</p>
          <p className="relative z-10 mt-2 text-sm leading-6 text-[var(--muted)]">{bottomCard.description}</p>
        </div>
      </div>
    </div>
  );
}
