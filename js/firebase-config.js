// Firebase Configuration - 新莊國小成績管理系統
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8m4nHUZ9jjZadMaUxZtXau7G44ChZeJY",
  authDomain: "sjps-scoresystem.firebaseapp.com",
  projectId: "sjps-scoresystem",
  storageBucket: "sjps-scoresystem.firebasestorage.app",
  messagingSenderId: "786097431395",
  appId: "1:786097431395:web:1469342ed3c53b6c1ee956",
  measurementId: "G-2ZXWWWSLN2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 管理員清單（初始化，之後由 Firestore admins collection 管理）
export const INITIAL_ADMIN = "issac@sjps.kh.edu.tw";

// 老師通關密碼
export const TEACHER_PASSWORD = "sjps";

// 學期設定（預設，管理員可覆蓋）
export function getCurrentSemester() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();
  // 民國年換算
  const rocYear = year - 1911;

  if ((month === 2 && day >= 23) || (month >= 3 && month <= 6) || (month === 6 && day <= 30)) {
    return { year: rocYear - 1, semester: 2, label: `${rocYear - 1}學年度 第二學期` };
  } else if (month >= 9 || (month === 1 && day <= 31) || (month === 2 && day <= 22)) {
    const y = month >= 9 ? rocYear : rocYear - 1;
    return { year: y, semester: 1, label: `${y}學年度 第一學期` };
  } else {
    // 7-8月暑假，顯示剛過去的下學期
    return { year: rocYear - 1, semester: 2, label: `${rocYear - 1}學年度 第二學期` };
  }
}

// 科目資料
export const SUBJECTS = {
  low: [ // 1-2年級
    { id: "chinese", name: "國語文", domain: "language" },
    { id: "native", name: "本土語文/新住民語文", domain: "language" },
    { id: "life", name: "生活課程", domain: "life", hours: 6 },
    { id: "math", name: "數學", domain: "math" },
    { id: "health", name: "健康", domain: "health_pe" },
    { id: "pe", name: "體育", domain: "health_pe" },
    { id: "flex1", name: "彈性一（世界之窗）", domain: "flex", hours: 1 },
    { id: "flex2", name: "彈性二（新莊萬花筒）", domain: "flex", hours: 1 },
    { id: "flex3", name: "彈性三（國際+閱讀）", domain: "flex", hours: 1 },
  ],
  mid: [ // 3-4年級
    { id: "chinese", name: "國語文", domain: "language" },
    { id: "english", name: "英語", domain: "language" },
    { id: "native", name: "本土語文/新住民語文", domain: "language" },
    { id: "social", name: "社會", domain: "social" },
    { id: "science", name: "自然科學", domain: "science" },
    { id: "math", name: "數學", domain: "math" },
    { id: "health", name: "健康", domain: "health_pe" },
    { id: "pe", name: "體育", domain: "health_pe" },
    { id: "art_music", name: "藝術－音樂（藝音）", domain: "art" },
    { id: "art_perf", name: "藝術－表演（藝表）", domain: "art" },
    { id: "art_visual", name: "藝術－視覺（藝視）", domain: "art" },
    { id: "comprehensive", name: "綜合活動", domain: "comprehensive" },
    { id: "flex1", name: "彈性一（世界之窗）", domain: "flex", hours: 1 },
    { id: "flex2", name: "彈性二（新莊E學院）", domain: "flex", hours: 1 },
    { id: "flex3", name: "彈性三（新莊萬花筒）", domain: "flex", hours: 1 },
    { id: "flex4", name: "彈性四（國際+閱讀）", domain: "flex", hours: 1 },
  ],
  high: [ // 5-6年級
    { id: "chinese", name: "國語文", domain: "language" },
    { id: "english", name: "英語", domain: "language" },
    { id: "native", name: "本土語文/新住民語文", domain: "language" },
    { id: "social", name: "社會", domain: "social" },
    { id: "science", name: "自然科學", domain: "science" },
    { id: "math", name: "數學", domain: "math" },
    { id: "health", name: "健康", domain: "health_pe" },
    { id: "pe", name: "體育", domain: "health_pe" },
    { id: "art_music", name: "藝術－音樂（藝音）", domain: "art" },
    { id: "art_perf", name: "藝術－表演（藝表）", domain: "art" },
    { id: "art_visual", name: "藝術－視覺（藝視）", domain: "art" },
    { id: "comprehensive", name: "綜合活動", domain: "comprehensive" },
    { id: "flex1", name: "彈性一（走過時代邁向國際）", domain: "flex", hours: 1 },
    { id: "flex2", name: "彈性二（閱讀培力）", domain: "flex", hours: 1 },
    { id: "flex3", name: "彈性三（世界之窗）", domain: "flex", hours: 1 },
    { id: "flex4", name: "彈性四（新莊E學院）", domain: "flex", hours: 1 },
    { id: "flex5", name: "彈性五（新莊萬花筒）", domain: "flex", hours: 1 },
    { id: "flex6", name: "彈性六（進擊的學吧）", domain: "flex", hours: 1 },
  ]
};

export const DOMAIN_NAMES = {
  language: "語文",
  life: "生活課程",
  math: "數學",
  health_pe: "健康與體育",
  social: "社會",
  science: "自然科學",
  art: "藝術",
  comprehensive: "綜合活動",
  flex: "彈性課程"
};

export function getSubjectsByGrade(grade) {
  if (grade <= 2) return SUBJECTS.low;
  if (grade <= 4) return SUBJECTS.mid;
  return SUBJECTS.high;
}

// 班級列表
export const ALL_CLASSES = [
  "101","102","103","104","105","106",
  "201","202","203","204","205","206",
  "301","302","303","304","305","306","307",
  "401","402","403","404","405","406","407","408","409",
  "501","502","503","504","505","506","507","508",
  "601","602","603","604","605","606","607","608"
];

export function getGradeFromClass(classId) {
  return parseInt(classId.charAt(0));
}
