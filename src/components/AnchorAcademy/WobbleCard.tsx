"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Stellar Code Lab
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            Write and test real Rust code with our advanced space-grade editor
          </p>
        </div>
        <Image
          src="/anchor-academy.png"
          width={500}
          height={500}
          alt="Anchor Academy Demo"
          className="absolute -right-4 lg:-right-[5%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Mission Progress
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Earn cosmic XP, unlock stellar badges, and track your galactic journey
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Interstellar Practice
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Learn by building real Anchor programs and launching Solana applications
          </p>
        </div>
        <Image
          src="/anchor-academy-image.png"
          width={500}
          height={500}
          alt="Anchor Academy Demo"
          className="absolute -right-5 md:-right-[40%] lg:-right-[5%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
