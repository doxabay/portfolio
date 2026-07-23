"use client";

import { useRef } from "react";

import {
  BriefcaseBusinessIcon,
  type BriefcaseBusinessIconHandle,
} from "@/components/briefcase-business-icon";
import { ChessKingIcon, type ChessKingIconHandle } from "@/components/chess-king-icon";
import {
  CircleDollarSignIcon,
  type CircleDollarSignIconHandle,
} from "@/components/circle-dollar-sign-icon";
import {
  CreditCardIcon,
  type CreditCardIconHandle,
} from "@/components/credit-card-icon";

interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const ITEMS = [
  { label: "Visibility & wealth creation", icon: "wealth" },
  { label: "Career advancement", icon: "career" },
  { label: "Passive earning", icon: "passive" },
  { label: "International payments", icon: "intl" },
] as const;

const ICON_CLASS = "shrink-0 text-neutral-700 dark:text-neutral-300";

export default function MessagingCards() {
  const kingRef = useRef<ChessKingIconHandle>(null);
  const briefcaseRef = useRef<BriefcaseBusinessIconHandle>(null);
  const dollarRef = useRef<CircleDollarSignIconHandle>(null);
  const cardRef = useRef<CreditCardIconHandle>(null);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "wealth":
        return { node: <ChessKingIcon ref={kingRef} size={16} className={ICON_CLASS} />, ref: kingRef };
      case "career":
        return { node: <BriefcaseBusinessIcon ref={briefcaseRef} size={16} className={ICON_CLASS} />, ref: briefcaseRef };
      case "passive":
        return { node: <CircleDollarSignIcon ref={dollarRef} size={16} className={ICON_CLASS} />, ref: dollarRef };
      default:
        return { node: <CreditCardIcon ref={cardRef} size={16} className={ICON_CLASS} />, ref: cardRef };
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {ITEMS.map(({ label, icon }) => {
        const { node, ref } = renderIcon(icon);
        const controller = ref as React.RefObject<AnimatedIconHandle | null>;

        return (
          <div
            key={label}
            className="bg-neutral-50 dark:bg-neutral-800 px-4 py-3 flex items-center"
            style={{ gap: "12px" }}
            onMouseEnter={() => controller.current?.startAnimation()}
            onMouseLeave={() => controller.current?.stopAnimation()}
          >
            {node}
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
