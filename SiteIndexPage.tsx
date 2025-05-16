import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = ["Beach", "City", "Adventure", "Romantic", "Wellness"];

const travelVideos = [
  {
    id: 1,
    location: "Amalfi Coast, Italy",
    creator: "@wanderwithsophie",
    videoUrl: "/videos/amalfi.mp4",
    imageUrl: "/images/amalfi.jpg",
    description: "The dreamiest lemon-scented escape 🍋☀️ #AmalfiAdventures",
    category: "Romantic",
    creatorId: "wanderwithsophie",
  },
  {
    id: 2,
    location: "Kyoto, Japan",
    creator: "@nomadicneil",
    videoUrl: "/videos/kyoto.mp4",
    imageUrl: "/images/kyoto.jpg",
    description: "Tranquil temples & matcha mornings 🍵🌸 #ZenVibesOnly",
    category: "Wellness",
    creatorId: "nomadicneil",
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredVideos = selectedCategory
    ? travelVideos.filter((v) => v.category === selectedCategory)
    : travelVideos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe4e1] via-[#fef6e4] to-[#e0f7fa] text-black px-4 py-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">VibeVoyager</h1>
          <p className="text-sm text-gray-700 italic">Where wanderlust meets the swipe.</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search destinations or creators" className="w-64" />
          <Button variant="outline">
            <Search size={16} />
          </Button>
        </div>
      </header>
      <div className="flex gap-3 mb-6 overflow-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="rounded-full px-4"
          >
            {cat}
          </Button>
        ))}
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="rounded-full px-4"
        >
          All
        </Button>
        <Link href="/about">
          <Button className="rounded-full px-4" variant="outline">About</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden shadow-xl rounded-2xl border-0">
            <CardContent className="p-0">
              <div className="relative w-full h-[400px]">
                <motion.video
                  className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition duration-500"
                  src={video.videoUrl}
                  autoPlay
                  loop
                  muted
                />
                <img
                  src={video.imageUrl}
                  alt={video.location}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-4 bg-white/80 backdrop-blur">
                <Link href={`/creator/${video.creatorId}`}>
                  <p className="text-sm text-gray-500 hover:underline cursor-pointer">{video.creator}</p>
                </Link>
                <h2 className="text-lg font-semibold mt-1">{video.location}</h2>
                <p className="mt-2 text-sm">{video.description}</p>
                <Link href={`/trip/${video.id}`}>
                  <Button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white">
                    Book This Trip
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}