import { TbPalette } from "react-icons/tb";
import { HomeIcon, UserIcon as HiUserIcon,BriefcaseIcon,BookOpenIcon } from "@heroicons/react/24/outline";
import { ElementType } from "react";

import DashboardsIcon from "@/components/icons/assets/DashboardsIcon";
import SettingIcon from "@/components/icons/assets/SettingIcon";

export const navigationIcons: Record<string, ElementType> = {
  dashboards: DashboardsIcon,
  settings: SettingIcon,
  "dashboards.home": HomeIcon,
  "dashboards.formation": BookOpenIcon,
  "settings.general": HiUserIcon,
  "settings.appearance": TbPalette,
};
