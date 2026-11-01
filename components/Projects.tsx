"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type MediaItem = { type: "image" | "video"; url: string };

const projects = [
  {
    year: "2025",
    tag: "Camp & Tournament",
    title: "Bring Back the Village",
    location: "Port-Harcourt, Rivers State · Nigeria",
    description:
      "Major camp and tournament initiative reconnecting youth, coaches, and community leaders through competitive basketball and mentorship in Rivers State.",
    cover: "/images/project-bbtv-2025.webp",
    media: [
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2026/05/20250429_123127-scaled.webp" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2026/05/20250429_122954-scaled.webp" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2026/05/20250429_132934-scaled.webp" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2026/05/20250424_191829-scaled.webp" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2025/04/20250504_195438-scaled.webp" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5905-4-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5894-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5889-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5909-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5896-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5886-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5884-1024x576.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5883-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5861-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5829-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5827-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5826-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5902-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5900-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5899-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5647-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_5646-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_4760-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_4746-1-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_4741-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_4710-2-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_4709-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/IMG_4705-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/922fe72c-5a82-4fea-9b03-66533d5b8114-1-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/922fe72c-5a82-4fea-9b03-66533d5b8114-2-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/02/727fcd06-7a8f-4563-8523-166f1c357607-1.jpg" },
    ] as MediaItem[],
  },
  {
    year: "2023",
    tag: "Infrastructure",
    title: "Basketball Court — Kalabari National College",
    location: "Buguma City, Rivers State · Nigeria",
    description:
      "Constructed and commissioned the first full basketball court at Kalabari National College — a historic secondary school in Buguma City.",
    cover: "/images/project-court-buguma.jpg",
    media: [
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-13-at-14.04.30.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-18-at-05.12.36-768x1024.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-18-at-05.12.37-768x576.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/06/KNC-1024x1024.jpg" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/06/WhatsApp-Video-2023-06-06-at-13.11.02-1.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/06/WhatsApp-Video-2023-06-06-at-13.11.32.mp4" },
    ] as MediaItem[],
  },
  {
    year: "2023",
    tag: "Training Camp",
    title: "Degema Youth Basketball Camp",
    location: "Degema, Rivers State · Nigeria",
    description:
      "Intensive youth coaching clinic bringing skill development, leadership training, and high-level basketball instruction to players in Degema.",
    cover: "/images/project-degema.jpg",
    media: [
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/Degema-Camp-1024x1024.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-17-at-00.23.06-1-1-768x575.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-17-at-00.23.06-768x575.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-17-at-00.23.05-1-768x575.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-17-at-00.23.05-768x575.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-17-at-00.23.04-1-768x575.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-17-at-00.23.04-768x575.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-17-at-00.23.03-768x575.jpeg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Image-2023-04-16-at-15.39.11-768x576.jpeg" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-18-at-09.38.46.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-17-at-00.23.03.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-16-at-15.39.11.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-16-at-15.39.12.mp4" },
    ] as MediaItem[],
  },
  {
    year: "2023",
    tag: "Coaching Camp",
    title: "Port Harcourt Advanced Coaching Camp",
    location: "Port Harcourt, Rivers State · Nigeria",
    description:
      "Advanced coaching program in Port Harcourt combining professional instruction with mentorship for coaches and youth players across Rivers State.",
    cover: "/images/project-ph-2023.jpg",
    media: [
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/PH-3-1024x1024.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/coaching-camp-1024x1024.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/06/WhatsApp-Image-2023-06-02-at-21.50.04.jpg" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-21-at-12.34.00.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-21-at-12.04.31.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-21-at-05.55.14.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-21-at-05.55.12.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-23-at-16.39.23.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/04/WhatsApp-Video-2023-04-23-at-16.39.23-2.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/05/1_2.mp4" },
    ] as MediaItem[],
  },
  {
    year: "2021",
    tag: "Equipment Drive",
    title: "Collaborative Equipment Donation",
    location: "Nigeria",
    description:
      "Partnered with '21 Reasons to Give' to donate gear and shoes to Royal Hoopers (BAL league), DA-Foundation, and Soso Bobmanuel Foundation.",
    cover: "/images/project-equipment-2021.jpg",
    media: [
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/WhatsApp-Video-2023-03-07-at-19.33.25.mp4" },
      { type: "video", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/WhatsApp-Video-2023-03-08-at-13.06.48.mp4" },
    ] as MediaItem[],
  },
  {
    year: "2016",
    tag: "Tournament",
    title: "National Boys & Girls Basketball Tournament",
    location: "Nationwide · Nigeria",
    description:
      "TFIHF organized a nationwide basketball tournament for boys and girls — featuring accommodation, meals, cash prizes, and equipment distribution.",
    cover: "/images/project-tournament-2016.jpg",
    media: [
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_090700-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_090621-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_090726-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_090746-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_090812-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_090817-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_090850-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_091237-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_091829-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_091840-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_091843_001-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_092137-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_092138-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_092612-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20160624_125653-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160624-WA0036-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160624-WA0041-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160624-WA0047-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160624-WA0053-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160701-WA0007-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160701-WA0011-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160701-WA0015-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/FB_IMG_1466835899267-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160713-WA0007-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160713-WA0010-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160713-WA0021-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160713-WA0022-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160713-WA0026-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160713-WA0027-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160713-WA0028-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160726-WA0002-1-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160726-WA0002-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20160728-WA0000-1.jpg" },
    ] as MediaItem[],
  },
  {
    year: "2015",
    tag: "Community",
    title: "PHALGA Community Gear Donation",
    location: "PHALGA Community · Nigeria",
    description:
      "Distributed basketballs, shoes, and athletic gear to youth across the PHALGA community — putting equipment in the hands of those who needed it most.",
    cover: "/images/project-donation-2015.jpg",
    media: [
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155133-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155133-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155136-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155136-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155137-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155137-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155218-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155220-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155311-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150601_155333-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150814_110342-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150814_110506-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150814_111314-1-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20150814_175019-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20150814-WA0004-2-scaled.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/IMG-20150531-WA0003-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/FB_IMG_1439804127775-1.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/FB_IMG_1439804063177-2-scaled.jpg" },
    ] as MediaItem[],
  },
  {
    year: "2013",
    tag: "Outreach",
    title: "WNBA Gear Distribution & Court Visit",
    location: "Governor Alfred Diete Spiff Gym · Nigeria",
    description:
      "TFIHF founder Mactabene Amachree returned to her childhood basketball court to distribute WNBA-level equipment to aspiring young players.",
    cover: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_120839-1024x768.jpg",
    media: [
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130809_125521-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_111344-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_111359-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_111407-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_111415-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_114055-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_114100-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_114345-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_120433-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_120600-768x1024.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_120830-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130812_120839-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130813_151707-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20130813_151833-1024x768.jpg" },
      { type: "image", url: "https://viwgovomhgnf0ehu.public.blob.vercel-storage.com/projects/2023/03/20140422_161600-2048x1152.jpg" },
    ] as MediaItem[],
  },
];

const TAG_COLORS: Record<string, string> = {
  "Camp & Tournament": "bg-[#C8102E]",
  "Infrastructure": "bg-[#1a6b2e]",
  "Training Camp": "bg-[#1a4d8f]",
  "Coaching Camp": "bg-[#7b3fa0]",
  "Equipment Drive": "bg-[#b07d1a]",
  "Tournament": "bg-[#C8102E]",
  "Community": "bg-[#1a6b2e]",
  "Outreach": "bg-[#1a4d8f]",
};

function isVideo(url: string) {
  return url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm");
}

export default function Projects() {
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; idx: number } | null>(null);

  function openLightbox(items: MediaItem[], idx: number) { setLightbox({ items, idx }); }
  function closeLightbox() { setLightbox(null); }
  function prev() { if (lightbox) setLightbox({ ...lightbox, idx: (lightbox.idx - 1 + lightbox.items.length) % lightbox.items.length }); }
  function next() { if (lightbox) setLightbox({ ...lightbox, idx: (lightbox.idx + 1) % lightbox.items.length }); }

  return (
    <section id="projects" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#FDB927] text-sm font-bold uppercase tracking-widest">Impact Over the Years</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">Our Projects</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg">
            From courts to camps — every project is a chapter in TFIHF&apos;s story of community transformation.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((p) => {
            const images = p.media.filter(m => m.type === "image");
            const videos = p.media.filter(m => m.type === "video");
            const previewItems = p.media.slice(0, 6);

            return (
              <div
                key={`${p.year}-${p.title}`}
                className="bg-[#161616] rounded-2xl overflow-hidden border border-white/10 hover:border-[#C8102E]/30 transition-all duration-300"
              >
                <div className="md:flex">
                  {/* Cover */}
                  <div className="md:w-72 shrink-0 relative overflow-hidden h-56 md:h-auto">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-2xl font-black">{p.year}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`${TAG_COLORS[p.tag] ?? "bg-[#C8102E]"} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                        {p.tag}
                      </span>
                      <span className="bg-[#FDB927]/20 text-[#FDB927] text-xs font-bold px-3 py-1 rounded-full">
                        {p.location}
                      </span>
                      {videos.length > 0 && (
                        <span className="bg-white/10 text-white/60 text-xs font-bold px-3 py-1 rounded-full">
                          {videos.length} video{videos.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white text-xl font-black mb-2">{p.title}</h3>
                    <p className="text-white/50 text-sm mb-5 leading-relaxed">{p.description}</p>

                    {/* Media grid — first 6 items */}
                    {p.media.length > 0 && (
                      <div>
                        <div className="flex gap-2 flex-wrap mb-2">
                          {previewItems.map((item, i) => (
                            <button
                              key={i}
                              onClick={() => openLightbox(p.media, i)}
                              className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/10 hover:border-[#FDB927] transition-all shrink-0 relative"
                            >
                              {item.type === "video" ? (
                                <div className="w-full h-full bg-[#0D0D0D] flex items-center justify-center">
                                  <span className="text-[#FDB927] text-xl">▶</span>
                                </div>
                              ) : (
                                <img src={item.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                              )}
                            </button>
                          ))}
                          {p.media.length > 6 && (
                            <button
                              onClick={() => openLightbox(p.media, 6)}
                              className="w-16 h-16 rounded-lg border-2 border-white/10 hover:border-[#FDB927] transition-all flex items-center justify-center shrink-0"
                            >
                              <span className="text-white/50 text-xs font-bold">+{p.media.length - 6}</span>
                            </button>
                          )}
                        </div>
                        <p className="text-white/30 text-xs">
                          {images.length} photo{images.length !== 1 ? "s" : ""}
                          {videos.length > 0 && ` · ${videos.length} video${videos.length !== 1 ? "s" : ""}`}
                          {" — click to view"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/70 hover:text-white z-10 bg-black/40 rounded-full p-2"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.items[lightbox.idx].type === "video" ? (
              <video
                key={lightbox.items[lightbox.idx].url}
                src={lightbox.items[lightbox.idx].url}
                controls
                autoPlay
                className="w-full max-h-[85vh] rounded-xl"
              />
            ) : (
              <img
                src={lightbox.items[lightbox.idx].url}
                alt=""
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/70 hover:text-white z-10 bg-black/40 rounded-full p-2"
          >
            <ChevronRight size={32} />
          </button>

          <div className="absolute bottom-4 text-white/50 text-sm">
            {lightbox.idx + 1} / {lightbox.items.length}
            {lightbox.items[lightbox.idx].type === "video" && " · VIDEO"}
          </div>
        </div>
      )}
    </section>
  );
}
