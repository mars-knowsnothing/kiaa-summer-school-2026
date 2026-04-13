import type {LocalizedText} from "@/content/site";

export type LecturerInfo = {
  name: LocalizedText;
  affiliation: LocalizedText;
};

export type AgendaSchool = {
  title: LocalizedText;
  dateRange: LocalizedText;
  topics: readonly LocalizedText[];
  languageNote: LocalizedText;
  lecturersNote: LocalizedText;
  lecturers: readonly LecturerInfo[];
};

export type AgendaWorkshop = {
  title: LocalizedText;
  dateRange: LocalizedText;
  description: LocalizedText;
  items: readonly { label: LocalizedText; text: LocalizedText }[];
};

export const agendaSchool: AgendaSchool = {
  title: {
    en: "Summer School (Week 1)",
    zh: "暑期学校（第一周）"
  },
  dateRange: {
    en: "July 20–24, 2026",
    zh: "2026年7月20日至24日"
  },
  topics: [
    {
      en: "Observational properties and the dynamics and evolution of protoplanetary disks",
      zh: "原行星盘的观测特性和动力学与演化"
    },
    {
      en: "Formation of planets and planetary systems",
      zh: "行星和行星系统的形成"
    },
    {
      en: "Numerical simulation methods of (magneto-)hydrodynamics, N-body, and radiative transfer, and their applications in this field",
      zh: "（磁）流体、N体和辐射转移的数值模拟方法及其在本领域中的应用"
    }
  ],
  languageNote: {
    en: "Teaching language: bilingual (Chinese & English)",
    zh: "授课语言：中英文结合"
  },
  lecturersNote: {
    en: "Lecturers (sorted by pinyin, continuously updating)",
    zh: "主讲教师（拼音排序，持续更新中）"
  },
  lecturers: [
    {
      name: { en: "Xue-Ning Bai", zh: "白雪宁" },
      affiliation: { en: "Tsinghua University", zh: "清华大学" }
    },
    {
      name: { en: "Zhuo Chen", zh: "陈卓" },
      affiliation: { en: "Tsinghua University", zh: "清华大学" }
    },
    {
      name: { en: "Hongping Deng", zh: "邓洪平" },
      affiliation: { en: "Shanghai Astronomical Observatory", zh: "上海天文台" }
    },
    {
      name: { en: "Ruobing Dong", zh: "董若冰" },
      affiliation: { en: "Peking University", zh: "北京大学" }
    },
    {
      name: { en: "Shangfei Liu", zh: "刘尚飞" },
      affiliation: { en: "Sun Yat-sen University", zh: "中山大学" }
    },
    {
      name: { en: "Feng Long", zh: "龙凤" },
      affiliation: { en: "Peking University", zh: "北京大学" }
    },
    {
      name: { en: "Bin Ren", zh: "任彬" },
      affiliation: { en: "Xiamen University", zh: "厦门大学" }
    },
    {
      name: { en: "Lile Wang", zh: "王力乐" },
      affiliation: { en: "Peking University", zh: "北京大学" }
    },
    {
      name: { en: "Haifeng Yang", zh: "杨海峰" },
      affiliation: { en: "Zhejiang University", zh: "浙江大学" }
    },
    {
      name: { en: "Yuhiko Aoyama", zh: "Aoyama Yuhiko" },
      affiliation: { en: "Sun Yat-sen University", zh: "中山大学" }
    }
  ]
};

export const agendaWorkshop: AgendaWorkshop = {
  title: {
    en: "Workshop (Weeks 2–6)",
    zh: "讨论班（第二至第六周）"
  },
  dateRange: {
    en: "July 25 – August 28, 2026",
    zh: "2026年7月25日至8月28日"
  },
  description: {
    en: "The lecturers listed above and other participating faculty (to be confirmed) will offer a range of research topics related to protoplanetary disks and planet formation. Students admitted to the five-week workshop will be matched with topics through a two-way selection process.",
    zh: "上述主讲教师和其他参会教师（名单待定）将提供同原行星盘与行星形成有关的若干科研课题，与参加后续五周活动的同学进行双向选择。"
  },
  items: [
    {
      label: {
        en: "Topic selection",
        zh: "课题选择"
      },
      text: {
        en: "In principle each student selects one topic; under special circumstances two students may form a group to work on one topic together, then begin the research process.",
        zh: "原则上每个学生选择一个课题，特殊情况下可以2个学生作为一个小组共同选择一个课题，随后开启研究进程。"
      }
    },
    {
      label: {
        en: "Academic exchange",
        zh: "学术交流"
      },
      text: {
        en: "Regular academic exchange and discussion sessions will be arranged throughout the program.",
        zh: "期间，我们将安排一定的日常学术交流和讨论环节。"
      }
    },
    {
      label: {
        en: "Final presentations",
        zh: "汇报总结"
      },
      text: {
        en: "Summary presentations will be held at the end of week six. We hope participants will use this opportunity to explore new research directions.",
        zh: "在第六周末进行汇报总结。我们希望参会的同学能以此为契机开拓新的科研方向。"
      }
    }
  ]
};
