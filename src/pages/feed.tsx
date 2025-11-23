import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { GlassText } from "@/components/GlassComponents";
import { FiArrowLeft, FiHeart, FiMessageCircle, FiShare2, FiUser, FiMoreVertical } from "react-icons/fi";

// Mock Data for LUX Feed
const mockFeed = [
  {
    id: 1,
    user: "GlassArtist",
    prompt: "A cyberpunk city street at night, heavy rain, neon signs, cinematic lighting.",
    assetType: "Video",
    assetUrl: "/mock-video.mp4", // Placeholder
    likes: 1250,
    comments: 45,
    hashtags: ["#cyberpunk", "#aiart", "#video", "#luxdesign"],
    isLiked: true,
  },
  {
    id: 2,
    user: "GlowDesign",
    prompt: "A majestic dragon made of pure light, flying over a mountain range, fantasy art.",
    assetType: "Image",
    assetUrl: "/mock-image.jpg", // Placeholder
    likes: 890,
    comments: 22,
    hashtags: ["#dragon", "#fantasy", "#aiimage", "#midjourney"],
    isLiked: false,
  },
];

const FeedItem = ({ item }: { item: typeof mockFeed[0] }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="relative w-full h-screen snap-start bg-glass-darker">
      {/* Asset Display (Full Screen) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {item.assetType === "Video" ? (
          <div className="text-glass-cyan text-3xl">
            [Video Player Placeholder]
          </div>
        ) : (
          <div className="text-glass-magenta text-3xl">
            [Image Placeholder]
          </div>
        )}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 sm:p-8">
        {/* Right Side - Interaction Buttons */}
        <div className="absolute right-4 bottom-1/4 flex flex-col space-y-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex flex-col items-center text-glass"
          >
            <FiHeart className={`text-3xl ${isLiked ? "text-glass-red" : "text-glass/80"}`} />
            <span className="text-sm mt-1">{likesCount.toLocaleString()}</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex flex-col items-center text-glass/80">
            <FiMessageCircle className="text-3xl" />
            <span className="text-sm mt-1">{item.comments}</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex flex-col items-center text-glass/80">
            <FiShare2 className="text-3xl" />
            <span className="text-sm mt-1">Share</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex flex-col items-center text-glass/80">
            <FiMoreVertical className="text-3xl" />
          </motion.button>
        </div>

        {/* Bottom Left - User Info and Caption */}
        <div className="flex items-center gap-3 mb-4">
          <FiUser className="text-glass-green text-3xl border border-glass-green rounded-full p-1" />
          <GlassText size="lg" variant="gradient-blue">@{item.user}</GlassText>
        </div>
        <p className="text-glass text-base mb-2">{item.prompt}</p>
        <div className="flex flex-wrap gap-2">
          {item.hashtags.map((tag) => (
            <span key={tag} className="text-glass-cyan/80 text-sm hover:text-glass-cyan cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function FeedPage() {
  const router = useRouter();

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Back Button (Hidden on full screen feed, but good for dev) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-glass-cyan hover:text-glass transition-colors z-50"
      >
        <FiArrowLeft />
        Home
      </motion.button>

      {mockFeed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
}
