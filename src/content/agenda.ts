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
    en: "Summer School (Week 1, can register separately)",
    zh: "暑期学校（第一周，可单独报名）"
  },
  dateRange: {
    en: "July 20–24, 2026",
    zh: "7月20日 - 24日"
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
      zh: "（磁）流体，N体和辐射转移的数值模拟方法及其在本领域中的应用"
    }
  ],
  languageNote: {
    en: "Teaching language: bilingual (Chinese & English)",
    zh: "授课语言：中英文结合"
  },
  lecturersNote: {
    en: "Lecturers (sorted by pinyin)",
    zh: "主讲教师（按拼音排序）"
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
    zh: "讨论班（二至六周）"
  },
  dateRange: {
    en: "July 25 – August 28, 2026",
    zh: "7月25日 - 8月28日"
  },
  description: {
    en: "Lecturers and other participating faculty will offer related research topics, and students will be matched through a two-way selection process. In principle, each student (or a group of two) selects one topic. Regular academic exchanges will be arranged, and summary presentations will be held at the end of week six, aiming to explore new research directions and produce results.",
    zh: "主讲教师和其他参会教师将提供相关科研课题，与学生进行双向选择。原则上每个学生（或2人小组）选择一个课题。期间安排日常学术交流，并在第六周末进行汇报总结，旨在开拓科研方向并产出成果。"
  },
  items: [
    {
      label: {
        en: "Topic selection",
        zh: "课题选择"
      },
      text: {
        en: "In principle each student (or a group of two) selects one topic, then begins the research process.",
        zh: "原则上每个学生（或2人小组）选择一个课题。"
      }
    },
    {
      label: {
        en: "Academic exchange",
        zh: "学术交流"
      },
      text: {
        en: "Regular academic exchange and discussion sessions will be arranged throughout the program.",
        zh: "期间安排日常学术交流。"
      }
    },
    {
      label: {
        en: "Final presentations",
        zh: "汇报总结"
      },
      text: {
        en: "Summary presentations will be held at the end of week six, aiming to explore new research directions and produce results.",
        zh: "在第六周末进行汇报总结，旨在开拓科研方向并产出成果。"
      }
    }
  ]
};
