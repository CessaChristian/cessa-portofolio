import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TechStack {
  label: string;
  items: string[];
}

export interface Social {
  label: string;
  url: string;
  icon: LucideIcon;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  university: string;
  specialization: string;
  shortBio: string;
  techStacks: TechStack[];
  socials: Social[];
  cvUrl: string;
}

const profile: Profile = {
  name: "Cessa",
  role: "Software Engineering",
  location: "Salatiga, Indonesia",
  university: "Universitas Kristen Satya Wacana",
  specialization: "Software Engineering",
  shortBio:
    "I build web and mobile applications — from backend APIs to polished UIs. Currently studying Informatics Engineering (Software Engineering) at UKSW and interning as IT Business Solution at Alfamidi.",

  techStacks: [
    {
      label: "Languages",
      items: ["TypeScript", "Golang", "PHP", "Python", "Dart"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "Flutter"],
    },
    {
      label: "Backend",
      items: ["Node.js", "Go Echo", "Laravel","Flask"],
    },
    {
      label: "Database",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
    },
    {
      label: "Tools",
      items: ["Git", "Docker", "Postman", "Figma", "VS Code"],
    },
  ],

  socials: [
    {
      label: "GitHub",
      url: "https://github.com/CessaChristian",
      icon: Github,
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/cessachristian",
      icon: Linkedin,
    },
    {
      label: "Email",
      url: "mailto:cessachristian27@gmail.com",
      icon: Mail,
    },
  ],

  cvUrl: "/cv.pdf",
};

export default profile;