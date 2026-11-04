import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { ActivityItem, ActivityKind, BrandProfile, PlannedPost, UserProfile } from "./types";

/**
 * Workspace state for the signed-in Trendova AI app.
 * There is no backend yet, so everything persists in this browser's localStorage.
 */
const PROFILE_KEY = "nova.brand-profile.v1";
const ACTIVITY_KEY = "nova.activity.v1";
const USER_KEY = "nova.user-profile.v1";
const POSTS_KEY = "nova.planned-posts.v1";
const CAPTION_DRAFT_KEY = "nova.caption-draft.v1";

export const emptyProfile: BrandProfile = {
  brandName: "",
  personality: [],
  audience: "",
  tone: "",
  useWords: "",
  avoidWords: "",
  toneOption: "",
  customTone: "",
  usage: "All content",
  updatedAt: null,
};

export const emptyUser: UserProfile = { fullName: "", email: "" };

interface WorkspaceValue {
  hydrated: boolean;
  profile: BrandProfile;
  saveProfile: (next: BrandProfile) => void;
  profileComplete: boolean;
  user: UserProfile;
  saveUser: (next: UserProfile) => void;
  posts: PlannedPost[];
  savePost: (post: PlannedPost) => void;
  deletePost: (id: string) => void;
  activity: ActivityItem[];
  logActivity: (kind: ActivityKind, title: string, detail: string) => void;
  clearActivity: () => void;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — in-memory state still works */
  }
}

/** Hand an idea from Trend Scanner to the Caption Generator. */
export function setCaptionDraft(text: string) {
  try {
    window.sessionStorage.setItem(CAPTION_DRAFT_KEY, text);
  } catch {
    /* ignore */
  }
}

export function takeCaptionDraft(): string {
  try {
    const v = window.sessionStorage.getItem(CAPTION_DRAFT_KEY) ?? "";
    window.sessionStorage.removeItem(CAPTION_DRAFT_KEY);
    return v;
  } catch {
    return "";
  }
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfile] = useState<BrandProfile>(emptyProfile);
  const [user, setUser] = useState<UserProfile>(emptyUser);
  const [posts, setPosts] = useState<PlannedPost[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  // Read persisted state after hydration to keep SSR output stable.
  useEffect(() => {
    setProfile({ ...emptyProfile, ...read(PROFILE_KEY, emptyProfile) });
    setUser(read(USER_KEY, emptyUser));
    setPosts(read(POSTS_KEY, [] as PlannedPost[]));
    setActivity(read(ACTIVITY_KEY, [] as ActivityItem[]));
    setHydrated(true);
  }, []);

  const saveProfile = useCallback((next: BrandProfile) => {
    const stamped = { ...next, updatedAt: Date.now() };
    setProfile(stamped);
    write(PROFILE_KEY, stamped);
  }, []);

  const saveUser = useCallback((next: UserProfile) => {
    setUser(next);
    write(USER_KEY, next);
  }, []);

  const savePost = useCallback((post: PlannedPost) => {
    setPosts((prev) => {
      const exists = prev.some((p) => p.id === post.id);
      const next = exists ? prev.map((p) => (p.id === post.id ? post : p)) : [...prev, post];
      next.sort((a, b) => a.when.localeCompare(b.when));
      write(POSTS_KEY, next);
      return next;
    });
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      write(POSTS_KEY, next);
      return next;
    });
  }, []);

  const logActivity = useCallback((kind: ActivityKind, title: string, detail: string) => {
    setActivity((prev) => {
      const next = [
        { id: crypto.randomUUID(), kind, title, detail, createdAt: Date.now() },
        ...prev,
      ].slice(0, 12);
      write(ACTIVITY_KEY, next);
      return next;
    });
  }, []);

  const clearActivity = useCallback(() => {
    setActivity([]);
    try {
      window.localStorage.removeItem(ACTIVITY_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<WorkspaceValue>(
    () => ({
      hydrated,
      profile,
      saveProfile,
      profileComplete: Boolean(profile.brandName && profile.audience && profile.tone),
      user,
      saveUser,
      posts,
      savePost,
      deletePost,
      activity,
      logActivity,
      clearActivity,
    }),
    [hydrated, profile, saveProfile, user, saveUser, posts, savePost, deletePost, activity, logActivity, clearActivity],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside <WorkspaceProvider>");
  return ctx;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (a + b).toUpperCase();
}
