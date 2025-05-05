import Image from "next/image";
import React from "react";

export default function Stories() {
  return (
    <div className="p-4 bg-white rotate-lg shadow-md text-sm rounded-lg overflow-auto horizontal-scroll">
      <div className="flex gap-8 w-max">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Image
                src=""
                width={100}
                height={100}
                alt="story"
                className="w-15 h-15 rounded-full"
              />
              <span className="font-medium">FFFF</span>
            </div>
          ))}
      </div>
    </div>
  );
}
