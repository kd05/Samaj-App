import { type ComponentProps } from "react";
import { type Ionicons } from "@expo/vector-icons";

export type TabPath = "/home" | "/events" | "/members" | "/profile";
export type TabIconName = ComponentProps<typeof Ionicons>["name"];

export const MAIN_TAB_ROUTES: TabPath[] = ["/home", "/events", "/members", "/profile"];

export const TAB_ITEMS: {
  label: string;
  icon: TabIconName;
  activeIcon: TabIconName;
  path: TabPath;
}[] = [
  { label: "Home", icon: "home-outline", activeIcon: "home", path: "/home" },
  { label: "Events", icon: "calendar-outline", activeIcon: "calendar", path: "/events" },
  { label: "Members", icon: "people-outline", activeIcon: "people", path: "/members" },
  { label: "Profile", icon: "person-outline", activeIcon: "person", path: "/profile" },
];
