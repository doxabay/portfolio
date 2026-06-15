import Image from "next/image";

export default function ShotImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/shot-imageBG.jpg"
          alt=""
          fill
          className="object-cover blur-[1px] scale-105"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex items-center justify-center py-12">
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="70vw"
          className="w-[70%] h-auto"
        />
      </div>
    </div>
  );
}
