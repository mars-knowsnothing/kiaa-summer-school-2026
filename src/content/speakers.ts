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
    note: {
      en: "Tsinghua University",
      zh: "清华大学"
    },
    role: "lecturer",
    sortOrder: 1
  },
  {
    name: {
      en: "Zhuo Chen",
      zh: "陈卓"
    },
    note: {
      en: "Tsinghua University",
      zh: "清华大学"
    },
    role: "lecturer",
    sortOrder: 2
  },
  {
    name: {
      en: "Hongping Deng",
      zh: "邓洪平"
    },
    note: {
      en: "Shanghai Astronomical Observatory",
      zh: "上海天文台"
    },
    role: "lecturer",
    sortOrder: 3
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
    role: "lecturer",
    sortOrder: 4
  },
  {
    name: {
      en: "Min Fang",
      zh: "房敏"
    },
    note: {
      en: "Purple Mountain Observatory",
      zh: "紫金山天文台"
    },
    role: "lecturer",
    sortOrder: 5
  },
  {
    name: {
      en: "Pinghui Huang",
      zh: "黄平辉"
    },
    note: {
      en: "Purple Mountain Observatory",
      zh: "紫金山天文台"
    },
    role: "lecturer",
    sortOrder: 6
  },
  {
    name: {
      en: "Sheng Jin",
      zh: "晋升"
    },
    note: {
      en: "Anhui Normal University",
      zh: "安徽师范大学"
    },
    role: "lecturer",
    sortOrder: 7
  },
  {
    name: {
      en: "Yaping Li",
      zh: "李亚平"
    },
    note: {
      en: "Shanghai Astronomical Observatory",
      zh: "上海天文台"
    },
    role: "lecturer",
    sortOrder: 8
  },
  {
    name: {
      en: "Shangfei Liu",
      zh: "刘尚飞"
    },
    note: {
      en: "Sun Yat-sen University",
      zh: "中山大学"
    },
    role: "lecturer",
    sortOrder: 9
  },
  {
    name: {
      en: "Yao Liu",
      zh: "刘尧"
    },
    note: {
      en: "Southwest Jiaotong University",
      zh: "西南交通大学"
    },
    role: "lecturer",
    sortOrder: 10
  },
  {
    name: {
      en: "Feng Long",
      zh: "龙凤"
    },
    note: {
      en: "Peking University",
      zh: "北京大学"
    },
    role: "lecturer",
    sortOrder: 11
  },
  {
    name: {
      en: "Yuhiko Aoyama",
      zh: "青山雄彦"
    },
    note: {
      en: "Sun Yat-sen University",
      zh: "中山大学"
    },
    role: "lecturer",
    sortOrder: 12
  },
  {
    name: {
      en: "Bin Ren",
      zh: "任彬"
    },
    note: {
      en: "Xiamen University",
      zh: "厦门大学"
    },
    role: "lecturer",
    sortOrder: 13
  },
  {
    name: {
      en: "Lile Wang",
      zh: "王力乐"
    },
    note: {
      en: "Peking University",
      zh: "北京大学"
    },
    role: "lecturer",
    sortOrder: 14
  },
  {
    name: {
      en: "Su Wang",
      zh: "王素"
    },
    note: {
      en: "Purple Mountain Observatory",
      zh: "紫金山天文台"
    },
    role: "lecturer",
    sortOrder: 15
  },
  {
    name: {
      en: "Haifeng Yang",
      zh: "杨海峰"
    },
    note: {
      en: "Zhejiang University",
      zh: "浙江大学"
    },
    role: "lecturer",
    sortOrder: 16
  },
  {
    name: {
      en: "Cong Yu",
      zh: "余聪"
    },
    note: {
      en: "Sun Yat-sen University",
      zh: "中山大学"
    },
    role: "lecturer",
    sortOrder: 17
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
    sortOrder: 21
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
    sortOrder: 22
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
    sortOrder: 23
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
    sortOrder: 24
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
    sortOrder: 25
  },
  {
    name: {
      en: "Feng Long",
      zh: "龙凤"
    },
    role: "local_committee",
    sortOrder: 27
  },
  {
    name: {
      en: "He Sun",
      zh: "孙赫"
    },
    role: "local_committee",
    sortOrder: 28
  },
  {
    name: {
      en: "Min Sun",
      zh: "孙敏"
    },
    role: "local_committee",
    sortOrder: 29
  },
  {
    name: {
      en: "Jing Xie",
      zh: "谢静"
    },
    role: "local_committee",
    sortOrder: 30
  }
] as const satisfies readonly Speaker[];
