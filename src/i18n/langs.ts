type LocaleConfig = {
  label: string;
  dayjs: () => Promise<any>;
  flatpickr: (() => Promise<any>) | null;
  i18n: () => Promise<any>;
  flag: string;
};

export const locales: Record<string, LocaleConfig> = {
  en: {
    label: "English",
    dayjs: () => import("dayjs/locale/en"),
    flatpickr: null,
    i18n: () => import("./locales/en/translations.json"),
    flag: "united-kingdom",
  },
  fr: {
    label: "French",
    dayjs: () => import("dayjs/locale/fr"),
    flatpickr: null,
    i18n: () => import("./locales/fr/translations.json"),
    flag: "france",
  },
};

export const supportedLanguages = Object.keys(locales);

export type LocaleCode = keyof typeof locales;

export type Dir = "ltr" | "rtl";
