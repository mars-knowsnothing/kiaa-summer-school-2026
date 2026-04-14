import type {LocalizedText} from "@/content/site";

export type SpeakerRole = "lecturer" | "scientific_committee" | "local_committee";

export type Speaker = {
  name: LocalizedText;
  note?: LocalizedText;
  role: SpeakerRole;
  sortOrder: number;
};

export const speakerRoleLabels: Record<SpeakerRole, LocalizedText> = {
  lecturer: {
    en: "Lecturers",
    zh: "主讲教师"
  },
  scientific_committee: {
    en: "Scientific Committee",
    zh: "科学委员会"
  },
  local_committee: {
    en: "Local Committee",
    zh: "地方委员会"
  }
};

export const speakerRoleOrder: SpeakerRole[] = [
  "lecturer",
  "scientific_committee",
  "local_committee"
];

export const speakers = [
  {
    name: {
      en: "Xue-Ning Bai",
      zh: "白雪宁"
    },
    role: "lecturer",
    sortOrder: 1
  },
  {
    name: {
      en: "Zhuo Chen",
      zh: "陈卓"
    },
    role: "lecturer",
    sortOrder: 2
  },
  {
    name: {
      en: "Hongping Deng",
      zh: "邓洪平"
    },
    role: "lecturer",
    sortOrder: 3
  },
  {
    name: {
      en: "Ruobing Dong",
      zh: "董若冰"
    },
    role: "lecturer",
    sortOrder: 4
  },
  {
    name: {
      en: "Shangfei Liu",
      zh: "刘尚飞"
    },
    role: "lecturer",
    sortOrder: 5
  },
  {
    name: {
      en: "Feng Long",
      zh: "龙凤"
    },
    role: "lecturer",
    sortOrder: 6
  },
  {
    name: {
      en: "Bin Ren",
      zh: "任彬"
    },
    role: "lecturer",
    sortOrder: 7
  },
  {
    name: {
      en: "Lile Wang",
      zh: "王力乐"
    },
    role: "lecturer",
    sortOrder: 8
  },
  {
    name: {
      en: "Haifeng Yang",
      zh: "杨海峰"
    },
    role: "lecturer",
    sortOrder: 9
  },
  {
    name: {
      en: "Yuhiko Aoyama",
      zh: "Aoyama Yuhiko"
    },
    role: "lecturer",
    sortOrder: 10
  },
  {
    name: {
      en: "Xue-Ning Bai",
      zh: "白雪宁"
    },
    note: {
      en: "Tsinghua University",
      zh: "清华大学"
    },
    role: "scientific_committee",
    sortOrder: 11
  },
  {
    name: {
      en: "Ruobing Dong",
      zh: "董若冰"
    },
    note: {
      en: "Peking University",
      zh: "北京大学"
    },
    role: "scientific_committee",
    sortOrder: 12
  },
  {
    name: {
      en: "Feng Long",
      zh: "龙凤"
    },
    note: {
      en: "Peking University · chair",
      zh: "北京大学 · 主席"
    },
    role: "scientific_committee",
    sortOrder: 13
  },
  {
    name: {
      en: "Lile Wang",
      zh: "王力乐"
    },
    note: {
      en: "Peking University · co-chair",
      zh: "北京大学 · 副主席"
    },
    role: "scientific_committee",
    sortOrder: 14
  },
  {
    name: {
      en: "Ruobing Dong",
      zh: "董若冰"
    },
    note: {
      en: "chair",
      zh: "主席"
    },
    role: "local_committee",
    sortOrder: 15
  },
  {
    name: {
      en: "Feng Long",
      zh: "龙凤"
    },
    role: "local_committee",
    sortOrder: 17
  },
  {
    name: {
      en: "He Sun",
      zh: "孙赫"
    },
    role: "local_committee",
    sortOrder: 18
  },
  {
    name: {
      en: "Min Sun",
      zh: "孙敏"
    },
    role: "local_committee",
    sortOrder: 19
  },
  {
    name: {
      en: "Jing Xie",
      zh: "谢静"
    },
    role: "local_committee",
    sortOrder: 20
  }
] as const satisfies readonly Speaker[];
