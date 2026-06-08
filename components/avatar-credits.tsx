"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const contributors = [
  { img: 3,  name: "Clement",   role: "Lead Designer" },
  { img: 12, name: "Ummi",      role: "UI Designer" },
  { img: 21, name: "Stephanie", role: "UX Strategist" },
  { img: 33, name: "Bayo",      role: "Product Designer" },
  { img: 44, name: "Tunde",     role: "Frontend Engineer" },
  { img: 52, name: "Kemi",      role: "Product Manager" },
  { img: 61, name: "Aisha",     role: "Motion Designer" },
  { img: 70, name: "Dara",      role: "Brand Designer" },
];

export default function AvatarCredits() {
  return (
    <div className="flex flex-wrap gap-4">
      {contributors.map(({ img, name, role }) => (
        <Tooltip key={img}>
          <TooltipTrigger asChild>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.pravatar.cc/64?img=${img}`}
              alt={name}
              className="w-8 h-8 rounded-full shrink-0 object-cover cursor-default"
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="text-center">
            <p className="font-medium text-xs">{name}</p>
            <p className="text-xs opacity-60">{role}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
