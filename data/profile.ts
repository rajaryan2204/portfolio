/**
 * ===================================================================
 * PROFILE CONFIGURATION
 * ===================================================================
 * Edit your personal information, skills, and links below.
 * Everything on the website updates automatically from this file!
 */

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  details: string;
  coursework: string[];
}

export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  tag?: string;
}

export interface Profile {
  name: string;
  displayName: string;
  username: string; // Your GitHub username for live API fetching
  email: string;
  phone?: string;
  location: string;
  timezone: string;
  resumeUrl: string;
  bio: string;
  aboutText: string[];
  education: EducationItem[];
  interests: string[];
  social: {
    github: string;
    linkedin: string;
    instagram?: string;
    twitter?: string;
  };
  skills: {
    languages: string[];
    web: string[];
    engineeringAndEmbedded: string[];
    tools: string[];
  };
  currently: {
    building: string;
    learning: string;
    exploring: string;
    reading: string;
  };
  projectLiveUrls: Record<string, string>;
  projectDescriptions: Record<string, string>;
  projectLanguages: Record<string, string>;
  projectHighlights: Record<string, string[]>;
  journey: JourneyItem[];
}

export const profile: Profile = {
  // --- Personal Info ---
  name: "Raj Aryan",
  displayName: "Raj Aryan",

  // GitHub username connected directly to live API
  username: "rajaryan2204",

  // Contact email & phone
  email: "raj.aryan9242@gmail.com",
  phone: "+91 9288522520",
  location: "India",
  timezone: "IST (UTC+5:30)",
  resumeUrl: "mailto:raj.aryan9242@gmail.com?subject=Resume%20Request%20-%20Raj%20Aryan",

  // Short bio statement for hero
  bio: "1st year Instrumentation & Control Engineering student at SLIET & developer building intelligent software, desktop tools, and cross-device systems.",

  // About section narrative
  aboutText: [
    "I'm a 1st-year Diploma student in Instrumentation and Control Engineering at Sant Longowal Institute of Engineering and Technology (SLIET), joined in 2026. My interest lies at the intersection of engineering hardware, control systems, and practical software engineering.",
    "Alongside my formal engineering coursework, I actively build real-world software—such as computer vision assistants (VisionX), cross-device tools (SyncBridge), campus platforms (slietvoice), and AI assessment platforms (interviewx-ai).",
    "I love exploring how low-level systems, signal concepts, and modern programming languages come together to create responsive, intelligent tools."
  ],

  // Academic Education Details
  education: [
    {
      degree: "Diploma in Engineering (1st Year)",
      field: "Instrumentation and Control Engineering",
      institution: "Sant Longowal Institute of Engineering & Technology (SLIET)",
      period: "2026 — Present (1st Year)",
      details: "1st year technical engineering curriculum focusing on engineering sciences, circuit fundamentals, computing architectures, and introduction to instrumentation and control concepts.",
      coursework: [
        "Applied Physics & Electrical Sciences",
        "Introduction to Control & Instrumentation",
        "Basic Electronics & Circuit Fundamentals",
        "C / C++ & Python Programming",
        "Digital Logic & Engineering Mathematics",
        "Computer Fundamentals & Systems"
      ]
    }
  ],

  // Currently interested in topics
  interests: [
    "Instrumentation & Control Systems",
    "Computer Vision & AI (YOLO / OpenCV)",
    "Cross-Device Ecosystems (Android + macOS)",
    "Embedded Systems & Microcontrollers",
    "Full-Stack Web Architecture (Next.js / TS)",
    "Industrial Automation & Robotics"
  ],

  // Social links
  social: {
    github: "https://github.com/rajaryan2204",
    linkedin: "https://www.linkedin.com/in/raj-aryan2204/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
  },

  // Technical skills
  skills: {
    languages: [
      "Python",
      "TypeScript",
      "JavaScript",
      "C++",
      "C",
      "SQL"
    ],
    web: [
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "REST APIs"
    ],
    engineeringAndEmbedded: [
      "Control Systems Basics",
      "Process Instrumentation Fundamentals",
      "OpenCV & YOLOv8",
      "PyQt6 Desktop GUI",
      "Microcontrollers (Arduino / AVR)",
      "Sensors & Circuit Prototyping",
      "Industrial Automation Concepts"
    ],
    tools: [
      "Git",
      "GitHub",
      "Linux",
      "Docker",
      "VS Code",
      "Postman"
    ]
  },

  // Personal "Currently" status
  currently: {
    building: "VisionX (Desktop AI vision assistant) & SyncBridge (Android-Mac sync)",
    learning: "1st Year Engineering Sciences, Control Theory & Next.js full-stack",
    exploring: "Cross-platform socket communication and edge computer vision",
    reading: "Instrumentation fundamentals and modern software design patterns"
  },

  // Direct Live App / Demo Links for projects
  projectLiveUrls: {
    "slietvoice": "https://slietvoice.vercel.app",
    "interviewx-ai": "https://interviewx-ai-one.vercel.app/",
    "SyncBridge": "https://github.com/rajaryan2204/SyncBridge/releases",
    "VisionX": "https://github.com/rajaryan2204/VisionX",
    "RajJarvis": "https://github.com/rajaryan2204/RajJarvis",
    "mac-controller": "https://github.com/rajaryan2204/mac-controller"
  },

  // Professional Curated Descriptions for GitHub Projects
  projectDescriptions: {
    "slietvoice": "CampusVoice / SLIET Voice — Full-stack campus portal and voice-integrated student feedback platform engineered with Next.js, TypeScript, and Prisma ORM for college grievance management, polls, and news boards.",
    "interviewx-ai": "InterviewX AI — AI-driven technical mock interview platform featuring automated question synthesis, real-time speech evaluation, and comprehensive skill assessment analytics.",
    "VisionX": "VisionX — Desktop AI computer vision assistant built with Python, PyQt6, OpenCV, and YOLOv8 for real-time object detection, screen region tracking, and visual task automation.",
    "SyncBridge": "SyncBridge — Cross-device ecosystem application connecting Android and macOS for instantaneous bi-directional clipboard sync, remote screen lock, and system volume control.",
    "RajJarvis": "RajJarvis — Custom AI voice assistant in Python for system task automation, speech recognition, command execution, and conversational AI interactions.",
    "mac-controller": "Mac Controller — Lightweight macOS system automation utility for programmatic control of media playback, volume, and display triggers."
  },

  // Key Feature Highlights per Project
  projectHighlights: {
    "slietvoice": ["Role-based grievance flow", "Anonymous reporting", "Live campus polls", "Verified news board"],
    "interviewx-ai": ["AI mock assessments", "Real-time speech analysis", "Skill scoring matrix", "Next.js & TypeScript"],
    "VisionX": ["YOLOv8 real-time detection", "PyQt6 desktop UI", "OpenCV video processing", "Task automation"],
    "SyncBridge": ["Sub-50ms clipboard sync", "Android + macOS ecosystem", "Remote lock trigger", "Local network security"],
    "RajJarvis": ["Voice command parser", "Speech synthesis", "Desktop automation", "Python AI backend"],
    "mac-controller": ["System volume control", "Media playback hooks", "macOS AppleScript triggers"]
  },

  // Custom Language mappings for repos with mixed/unspecified languages
  projectLanguages: {
    "SyncBridge": "TypeScript / Android",
    "interviewx-ai": "TypeScript / Next.js",
    "slietvoice": "TypeScript / Next.js",
    "mac-controller": "Python",
    "VisionX": "Python",
    "RajJarvis": "Python"
  },

  // Journey & milestones
  journey: [
    {
      year: "2026",
      title: "Joined SLIET — 1st Year Diploma in Instrumentation & Control",
      description: "Commenced formal engineering studies at SLIET while actively developing AI vision software (VisionX), campus platforms (slietvoice), and ecosystem apps (SyncBridge).",
      tag: "Academic & Tech"
    },
    {
      year: "2025",
      title: "AI Voice Assistants & Desktop Automation",
      description: "Developed RajJarvis voice assistant and modular tools for desktop & cross-device systems.",
      tag: "Engineering Projects"
    },
    {
      year: "2024",
      title: "Foundations in Programming & Web Development",
      description: "Explored core algorithms, C/C++ syntax, Python scripting, and modern web frameworks.",
      tag: "Self-Taught"
    }
  ]
};
