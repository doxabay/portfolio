"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const people = [
  { src: "https://framerusercontent.com/images/mnoe2h9LB7jxQIhPDeJnfm4SXGs.jpg", name: "Glory",   role: "Design" },
  { src: "https://framerusercontent.com/images/PpcR6fFeVy11cvqUBbH60xNvKf8.png", name: "Ummi",    role: "Design" },
  { src: "https://framerusercontent.com/images/LXmnlS8CPSoDeFeoPXUV08HGM.jpg",   name: "Clement", role: "Design" },
];

export default function NoblocksAvatarCredits() {
  return (
    <div className="flex flex-wrap gap-4">
      {people.map(({ src, name, role }) => (
        <Tooltip key={name}>
          <TooltipTrigger asChild>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={name}
              className="w-8 h-8 rounded-full shrink-0 object-cover cursor-default"
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="text-center">
            <p className="font-medium text-xs text-white">{name}</p>
            <p className="text-xs text-neutral-400">{role}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
