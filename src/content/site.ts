import type {Locale} from "@/i18n/routing";

export type LocalizedText = Record<Locale, string>;

export type SiteContact = {
  email: string;
  name: LocalizedText;
  role: LocalizedText;
};

export type SiteLink = {
  href: string;
  label: LocalizedText;
};

export type HomeCopy = {
  title: LocalizedText;
  dates: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
};

export type HomeSceneCard = {
  kicker: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
};

export type HomeContent = {
  eyebrow: LocalizedText;
  copy: HomeCopy;
  scene: readonly [HomeSceneCard, HomeSceneCard];
};

const homeCopy = {
  title: {
    en: "KIAA Summer School & Workshop 2026",
    zh: "原行星盘与行星形成暑期学校及讨论班"
  },
  dates: {
    en: "July 20 – August 28, 2026",
    zh: "2026年7月20日至8月28日（共六周）"
  },
  subtitle: {
    en: "A bilingual academic program on protoplanetary disks and planet formation.",
    zh: "面向对象：天文、物理、行星科学相关专业的高年级本科生和研究生"
  },
  description: {
    en: "The program brings together lecturers, scientific committee members, and students for a six-week summer school and workshop series at Peking University.",
    zh: "原行星盘是围绕新生恒星周围的富含尘埃的气体盘，也是行星形成的场所。随着数以千计系外行星的发现，以及高分辨率观测捕捉到原行星盘中普遍存在的各类精细\u201C亚结构\u201D，人们对盘物理和行星形成过程的认识正在发生飞跃。为了推动我国在这一前沿领域的长足发展和人才队伍建设，北京大学科维理天文与天体物理研究所将于2026年7月20日至8月28日举办\u201C原行星盘与行星形成\u201D暑期学校及讨论班。"
  }
} as const satisfies HomeCopy;

export const site = {
  home: {
    eyebrow: {
      en: "KIAA Summer School 2026",
      zh: "KIAA 夏令营 2026"
    },
    copy: homeCopy,
    scene: [
      {
        kicker: {
          en: "Six weeks",
          zh: "六周"
        },
        title: {
          en: "Summer school",
          zh: "暑期学校"
        },
        description: {
          en: "Lectures, discussion, and collaboration in one place.",
          zh: "讲座、讨论与合作在同一空间展开。"
        }
      },
      {
        kicker: {
          en: "Beijing",
          zh: "北京"
        },
        title: {
          en: "KIAA 2026",
          zh: "KIAA 2026"
        },
        description: {
          en: "A focused program on protoplanetary disks and planet formation.",
          zh: "聚焦原行星盘与行星形成的专题计划。"
        }
      }
    ] as const satisfies readonly [HomeSceneCard, HomeSceneCard]
  } as const satisfies HomeContent,
  title: homeCopy.title,
  shortTitle: {
    en: "KIAA Summer School 2026",
    zh: "KIAA 夏令营 2026"
  },
  subtitle: homeCopy.subtitle,
  description: homeCopy.description,
  dates: homeCopy.dates,
  schoolDates: {
    en: "July 20 – August 28",
    zh: "7月20日至8月28日"
  },
  schoolCheckIn: {
    en: "Check-in: morning of July 20",
    zh: "7月20日上午：报到"
  },
  workshopDate: {
    en: "August 29, 2026",
    zh: "2026年8月29日"
  },
  workshopCheckIn: {
    en: "End date: August 29",
    zh: "8月29日：结束"
  },
  checkIn: {
    en: "Check-in begins on the morning of July 20, 2026.",
    zh: "7月20日上午：报到"
  },
  venue: {
    en: "Kavli Institute for Astronomy and Astrophysics, Peking University, 5 Yiheyuan Road, Haidian District, Beijing",
    zh: "北京市海淀区颐和园路5号 北京大学科维理研究所"
  },
  host: {
    en: "School of Physics and Kavli Institute for Astronomy and Astrophysics, Peking University",
    zh: "北京大学物理学院，北京大学科维理天文与天体物理研究所"
  },
  sections: {
    overview: {
      en: "Overview",
      zh: "概览"
    },
    details: {
      en: "Event details",
      zh: "活动信息"
    },
    location: {
      en: "Location",
      zh: "地点"
    },
    contacts: {
      en: "Contacts",
      zh: "联系信息"
    }
  },
  deadline: {
    en: "Registration deadline: May 11, 2026",
    zh: "报名截止时间：2026年5月11日"
  },
  checkInfoBtn: {
    en: "Check info",
    zh: "查看详情"
  },
  ctas: {
    speakers: {
      en: "View speakers",
      zh: "查看讲者"
    },
    agenda: {
      en: "View agenda",
      zh: "查看日程"
    },
    contact: {
      en: "Contact the team",
      zh: "联系会务组"
    }
  },
  contacts: [
    {
      name: {
        en: "Feng Long",
        zh: "龙凤"
      },
      role: {
        en: "Academic affairs",
        zh: "学术事务"
      },
      email: "long.feng@pku.edu.cn"
    },
    {
      name: {
        en: "Min Sun",
        zh: "孙敏"
      },
      role: {
        en: "Conference affairs",
        zh: "会议事务"
      },
      email: "minsun1206@pku.edu.cn"
    }
  ] as const satisfies readonly SiteContact[],
  links: {
    speakers: {
      href: "/speakers",
      label: {
        en: "Speakers",
        zh: "讲者"
      }
    },
    agenda: {
      href: "/agenda",
      label: {
        en: "Agenda",
        zh: "日程"
      }
    },
    contact: {
      href: "/contact",
      label: {
        en: "Contact",
        zh: "联系"
      }
    }
  } as const satisfies Record<string, SiteLink>
} as const;

export function localized(text: LocalizedText, locale: Locale) {
  return text[locale];
}

export type LocalizedHomeSceneCard = {
  kicker: string;
  title: string;
  description: string;
};

export type LocalizedHomeContent = {
  eyebrow: string;
  title: string;
  dates: string;
  subtitle: string;
  description: string;
  scene: readonly [LocalizedHomeSceneCard, LocalizedHomeSceneCard];
};

export function localizedHomeContent(locale: Locale): LocalizedHomeContent {
  const [firstCard, secondCard] = site.home.scene;

  return {
    eyebrow: localized(site.home.eyebrow, locale),
    title: localized(site.home.copy.title, locale),
    dates: localized(site.home.copy.dates, locale),
    subtitle: localized(site.home.copy.subtitle, locale),
    description: localized(site.home.copy.description, locale),
    scene: [
      {
        kicker: localized(firstCard.kicker, locale),
        title: localized(firstCard.title, locale),
        description: localized(firstCard.description, locale)
      },
      {
        kicker: localized(secondCard.kicker, locale),
        title: localized(secondCard.title, locale),
        description: localized(secondCard.description, locale)
      }
    ]
  };
}
