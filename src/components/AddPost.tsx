
import { Album, Calendar, Video, Vote } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function AddPost() {

  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 text-sm">
      <div>
        <Image
          src=""
          width={60}
          height={60}
          alt="avatar"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col flex-1">
        <form className="flex gap-4 items-end">
          <textarea
            placeholder="What's on your mind?"
            className="w-full bg-slate-100 rounded-lg p-3"
            name="desc"
          ></textarea>
          <Image
            src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button>Send</button>
        </form>

        <div className="flex mt-3 gap-4">
          <div className="flex items-center gap-1">
            <Album className="h-5 w-5 text-emerald-500" />
            <span>Photo</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="h-5 w-5 text-pink-500" />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-1">
            <Vote className="h-5 w-5 text-cyan-500" />
            <span>Poll</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-5 w-5 text-orange-500" />
            <span>Event</span>
          </div>
        </div>
      </div>
    </div>
  );
}
