"use client";

import { useRef } from "react";

import { FolderUpIcon, type FolderUpIconHandle } from "@/components/folder-up-icon";
import {
  HeartHandshakeIcon,
  type HeartHandshakeIconHandle,
} from "@/components/heart-handshake-icon";
import { SmilePlusIcon, type SmilePlusIconHandle } from "@/components/smile-plus-icon";
import { UsersIcon, type UsersIconHandle } from "@/components/users-icon";

interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const STATS = [
  { stat: "500+", label: "User acquisition", desc: "Onboarded over 500 users within the first month of V1 launch", icon: "smile" },
  { stat: "16", label: "Influential Creators", desc: "Onboarded 16 established creators with free/paid assets to share with their community", icon: "users" },
  { stat: "2", label: "Community partners", desc: "Closed partnership with 2 creator communities to onboard their members", icon: "heart" },
  { stat: "100+", label: "Asset Uploads", desc: "Creators we partnered with uploaded their free & paid assets", icon: "folder" },
] as const;

const ICON_CLASS = "mb-3 text-neutral-700 dark:text-neutral-300";

export default function ResultStats() {
  const smileRef = useRef<SmilePlusIconHandle>(null);
  const usersRef = useRef<UsersIconHandle>(null);
  const heartRef = useRef<HeartHandshakeIconHandle>(null);
  const folderRef = useRef<FolderUpIconHandle>(null);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "smile":
        return { node: <SmilePlusIcon ref={smileRef} size={20} className={ICON_CLASS} />, ref: smileRef };
      case "users":
        return { node: <UsersIcon ref={usersRef} size={20} className={ICON_CLASS} />, ref: usersRef };
      case "heart":
        return { node: <HeartHandshakeIcon ref={heartRef} size={20} className={ICON_CLASS} />, ref: heartRef };
      default:
        return { node: <FolderUpIcon ref={folderRef} size={20} className={ICON_CLASS} />, ref: folderRef };
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {STATS.map(({ stat, label, desc, icon }) => {
        const { node, ref } = renderIcon(icon);
        const controller = ref as React.RefObject<AnimatedIconHandle | null>;

        return (
          <div
            key={stat}
            className="bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800/50 py-6"
            onMouseEnter={() => controller.current?.startAnimation()}
            onMouseLeave={() => controller.current?.stopAnimation()}
          >
            {node}
            <p className="text-2xl text-neutral-100 mb-1" style={{ fontWeight: 500 }}>{stat}</p>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{label}</p>
            <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
          </div>
        );
      })}
    </div>
  );
}
