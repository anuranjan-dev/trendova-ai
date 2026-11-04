import {
  BarChart3,
  CalendarClock,
  Camera,
  Hash,
  Radar,
  Sparkles,
  Users,
  Video,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  status: "available" | "soon";
  to?: "/app/trends" | "/app/studio" | "/app/voice" | "/app/insights";
}

export const tools: Tool[] = [
  {
    name: "Trend Scanner",
    description:
      "Type in your brand and a category to get rising topics, hashtags, and real audience quotes.",
    icon: Radar,
    status: "available",
    to: "/app/trends",
  },
  {
    name: "Content Studio",
    description:
      "Fill in a short brief and get post ideas, hooks, captions, ad copy and CTAs you can paste straight into a post.",
    icon: Wand2,
    status: "available",
    to: "/app/studio",
  },
  {
    name: "Brand Voice Engine",
    description:
      "Save how your brand talks once, and everything Trendōva AI writes for you will match it.",
    icon: Sparkles,
    status: "available",
    to: "/app/voice",
  },
  {
    name: "Performance Insights",
    description:
      "See which post formats performed best and the best days and times to publish.",
    icon: BarChart3,
    status: "available",
    to: "/app/insights",
  },
  {
    name: "Hashtag Intelligence",
    description:
      "Will show which hashtags actually have people talking, so you stop guessing.",
    icon: Hash,
    status: "soon",
  },
  {
    name: "Audience Listening",
    description:
      "Will collect what young people say about your category in their own words.",
    icon: Users,
    status: "soon",
  },
  {
    name: "Campaign Calendar",
    description:
      "Will turn your ideas into a dated posting plan your team can follow.",
    icon: CalendarClock,
    status: "soon",
  },
  {
    name: "Creator Matching",
    description:
      "Will suggest creators whose followers match the people you want to reach.",
    icon: Camera,
    status: "soon",
  },
  {
    name: "Short-Form Storyboards",
    description:
      "Will write a shot-by-shot outline for a TikTok or Reel, so you know exactly what to film.",
    icon: Video,
    status: "soon",
  },
];
