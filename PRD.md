# Agent-Ready PRD: KIAA Summer School & Workshop 2026

## 1. Project Overview (Business Context)
[cite_start]**Project Name:** 2026 原行星盘与行星形成暑期学校及讨论班官方网站 [cite: 1]
[cite_start]**Objective:** To build a modern, high-performance, and bilingual (EN/ZH) academic conference website [cite: 13] to provide event information, showcase speakers, and guide students through a multi-track application process.
[cite_start]**Subject Matter:** The event focuses on protoplanetary disks and planet formation[cite: 2].
[cite_start]**Host:** 北京大学物理学院，北京大学科维理天文与天体物理研究所[cite: 3].
[cite_start]**Timeline of Event:** * 报到：2026年7月20日上午 [cite: 5]
* [cite_start]暑期学校：2026年7月20日至24日 [cite: 5]
* [cite_start]讨论班：2026年7月25日至8月28日 [cite: 5]

## 2. Target Audience & User Personas
* [cite_start]**Primary Users:** 天文、物理、行星科学相关专业的高年级本科生和研究生 [cite: 6]。
* [cite_start]**Secondary Users:** 主讲教师、科学委员会及地方委员会成员 [cite: 14, 21, 22]。

## 3. Technical Architecture (Architect Context)
This architecture is designed for an automated, agent-driven engineering pipeline, ensuring clear separation of concerns and ease of deployment.
* **Framework:** Next.js (Latest version, App Router).
* **Styling:** Tailwind CSS + Radix UI / shadcn/ui.
* **Internationalization (i18n):** `next-intl` (for seamless routing and dictionary-based language switching).
* **Backend / CMS / Database:** Supabase (PostgreSQL) for managing dynamic content, relational application forms, and secure file uploads.
* **Animation/Visuals:** Framer Motion (UI transitions) + Three.js/React Three Fiber (for a background 3D visualization of a protoplanetary disk in the Hero section).

## 4. Design System & Visual Guidelines
* **Theme:** "Deep Space Modern". Default to a sophisticated Dark Mode.
* **Color Palette:** Deep space blacks/navys (`#0B0F19`), accented with accretion disk oranges/golds and nebula blues.
* **Typography:** Modern sans-serif (e.g., Inter or Geist) for UI readability.
* [cite_start]**Hero Section:** A visually striking Hero component with an interactive 3D WebGL particle animation simulating a dust/gas disk[cite: 2].

## 5. Information Architecture & Content Mapping

### 5.1. Navigation Bar (Global)
* Logo (KIAA/PKU)
* Links: Home | Speakers | Agenda | Application | Contact
* Action: `[EN/中]` Language Toggle Button

### 5.2. Core Pages
* **Home (`/`):**
    * [cite_start]Hero: Event Title ("原行星盘与行星形成暑期学校及讨论班") [cite: 1] [cite_start]and Dates (July 20 - Aug 28, 2026)[cite: 5].
    * [cite_start]Location Info: 北京市海淀区颐和园路5号北京大学科维理研究所[cite: 4].
* **Speakers (`/speakers`):**
    * [cite_start]Lecturers Grid: 白雪宁、陈卓、邓洪平、董若冰、刘尚飞、龙凤、任彬、王力乐、杨海峰、Aoyama Yuhiko[cite: 14].
    * [cite_start]Scientific Committee: 白雪宁、董若冰、龙凤 (chair)、王力乐 (co-chair)[cite: 21].
    * [cite_start]Local Committee: 陈弦、孙敏、董若冰 (chair)、龙凤、孙赫、孙敏[cite: 22].
* **Agenda (`/agenda`):**
    * [cite_start]Week 1: 原行星盘的观测特性和动力学与演化 [cite: 10][cite_start], 行星和行星系统的形成 [cite: 11][cite_start], 数值模拟方法及其应用[cite: 12].
    * [cite_start]Weeks 2-6: 课题双向选择，日常学术交流与讨论，第六周末进行汇报总结[cite: 15].
* **Contact (`/contact`):**
    * [cite_start]龙凤 (学术事务): `long.feng@pku.edu.cn`[cite: 24].
    * [cite_start]孙敏 (会议事务): `minsun1206@pku.edu.cn`[cite: 25].

## 6. Application Form Logic (Core Feature)
The `/application` route must implement a dynamic, multi-step form utilizing React Hook Form, supporting three distinct user journeys. 

**Global Application Constraints:**
* [cite_start]**Deadline:** 2026年5月11日[cite: 7].
* [cite_start]**Quotas:** 暑期学校预计不超过80人，讨论班预计12-15人[cite: 19].
* [cite_start]**Fees/Accommodation:** 暑期学校不收取注册费，统一提供餐食 [cite: 20][cite_start]。交通费和住宿费原则上由学员自行承担 [cite: 20]。

**Form Category 1: 只参加暑期学校 (Jul 20-24)**
* **姓名 (Full Name)**: Text input.
* **身份证号 (ID Number)**: Text input (用于办理出入校门凭证).
* **手机号 (Phone Number)**: Text input (用于办理饭卡).
* **饮食习惯 (Dietary)**: Radio button (是否清真饮食).
* **附件上传 (Document Upload)**: Drag & Drop zone supporting `.zip`. [cite_start]Must contain Resume and Transcripts[cite: 17]. [cite_start]Front-end validation for filename string: `暑期学校申请材料-学校名-学生姓名`[cite: 17].
* [cite_start]**酒店代订 (Hotel Booking)**: Radio button (是否需要代订富驿时尚酒店，～350元/标准间，可住两人平摊费用)[cite: 20].

**Form Category 2: 参加暑期学校+讨论班 (Jul 20-Aug 28)**
* **基础信息**: Inherits all fields from Category 1 (Name, ID, Phone, Dietary, Hotel Booking).
* **附件上传 (Document Upload)**: Drag & Drop zone supporting `.zip`. [cite_start]Must contain Resume, Transcripts, and a 1-page English Research Statement[cite: 18]. [cite_start]Optional: TOEFL/IELTS scores[cite: 18]. [cite_start]Front-end validation for filename string: `暑期学校和讨论班申请材料-学校名-学生姓名`[cite: 18].
* [cite_start]**推荐人信息 (Referee Details)**: Text inputs for `推荐人姓名` and `推荐人邮件`[cite: 18]. (System will trigger an automated email to this address containing the upload link).
* [cite_start]**经费资助 (Funding Request)**: Optional file upload for justification if travel/accommodation funding is needed[cite: 20].

**Form Category 3: 推荐人 (Referee Portal)**
* **推荐信上传 (Letter Upload)**: Accessed via direct link. [cite_start]Drag & Drop zone supporting PDF/`.zip`[cite: 18]. Front-end validation for filename string: `讨论班-学校名-学生姓名`.

## 7. Supabase Database Schema (Headless CMS & App State)
Initialize the following tables via SQL migrations in Supabase to support dynamic rendering and the application workflows.

```sql
-- Table: speakers (For dynamic /speakers page)
CREATE TYPE speaker_role AS ENUM ('lecturer', 'scientific_committee', 'local_committee');
CREATE TABLE speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text,
  name_zh text,
  affiliation_en text,
  affiliation_zh text,
  role speaker_role,
  avatar_url text
);

-- Table: applications (For Category 1 & 2 forms)
CREATE TYPE apply_enum AS ENUM ('school_only', 'school_and_workshop');
CREATE TYPE status_enum AS ENUM ('pending', 'approved', 'rejected');
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apply_type apply_enum,
  full_name text NOT NULL,
  id_number text NOT NULL, -- Ensure RLS policies restrict read access
  phone text,
  is_halal boolean DEFAULT false,
  file_url text NOT NULL, -- Supabase Storage path
  hotel_needed boolean DEFAULT false,
  funding_reason_url text, -- Supabase Storage path
  referee_name text,
  referee_email text,
  status status_enum DEFAULT 'pending',
  created_at timestamp DEFAULT now()
);

-- Table: recommendations (For Category 3 form)
CREATE TABLE recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id),
  referee_email text NOT NULL,
  letter_url text NOT NULL, -- Supabase Storage path
  uploaded_at timestamp DEFAULT now()
);
```

## 8. Execution Directives for Codex
1.  **Phase 1 (Init):** Scaffold a Next.js App Router project with Tailwind CSS, `next-intl`, and `lucide-react`.
2.  **Phase 2 (UI & Layout):** Build the shell (`[locale]` routing, Navbar, Footer) and reusable UI components. Implement Framer Motion for `AnimatePresence` transitions between application form tabs.
3.  **Phase 3 (Forms & State):** Construct the `/application` route. Use React Hook Form with conditional rendering based on the selected `apply_type`. Implement strict front-end Regex validation for the required `.zip` filenames before enabling the Supabase Storage upload function.
4.  **Phase 4 (Backend):** Set up Supabase Client. Generate API routes or Server Actions to handle form submissions (writing to `applications` table) and triggering email webhooks for referees.
5.  **Phase 5 (Visuals):** Implement a modular Three.js WebGL particle system inside the Hero component to fulfill the "modern, design-driven" requirement.