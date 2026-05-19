"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const team = [
  { src: "https://framerusercontent.com/images/mnoe2h9LB7jxQIhPDeJnfm4SXGs.jpg",  name: "Bayo",    role: "Product Designer" },
  { src: "https://framerusercontent.com/images/LXmnlS8CPSoDeFeoPXUV08HGM.jpg",    name: "Clement", role: "Lead Designer" },
  { src: "https://framerusercontent.com/images/lEd3jKNTiBmqMbr7TSlNqn1dots.jpg",  name: "Okwu",    role: "Frontend Engineer" },
  { src: "https://framerusercontent.com/images/4Ggfmq4wGA4eXXsXJXlyxNp8RTk.jpg",  name: "Martins", role: "Backend Engineer" },
  { src: "https://framerusercontent.com/images/PpcR6fFeVy11cvqUBbH60xNvKf8.png",  name: "Fatima",  role: "UI Designer" },
  { src: "https://framerusercontent.com/images/GqX9wP3i4GpUm2ukPq8sfUAAFk.jpg",   name: "Joshua",  role: "Frontend Engineer" },
  { src: "https://framerusercontent.com/images/FCHqLIocJPQCpQJFd8J2kRXaDu8.jpeg", name: "David",   role: "Product Manager" },
];

export default function WitanAvatarCredits() {
  return (
    <div className="flex flex-wrap gap-4">
      {team.map(({ src, name, role }) => (
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
