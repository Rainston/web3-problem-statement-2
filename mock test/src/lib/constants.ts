import { Code2, Database, Layout, Palette, BookOpen, Brain, Globe, Terminal, Server, Smartphone } from 'lucide-react';

export const courseCategories = {
  'Web Development': { icon: Code2, color: 'text-blue-500' },
  'Programming': { icon: Terminal, color: 'text-green-500' },
  'Data Science': { icon: Database, color: 'text-purple-500' },
  'Design': { icon: Palette, color: 'text-pink-500' },
  'Backend Development': { icon: Server, color: 'text-orange-500' },
  'Mobile Development': { icon: Smartphone, color: 'text-cyan-500' },
  'AI & Machine Learning': { icon: Brain, color: 'text-red-500' },
  'Cloud Computing': { icon: Globe, color: 'text-indigo-500' },
  'DevOps': { icon: Layout, color: 'text-yellow-500' },
  'Software Architecture': { icon: BookOpen, color: 'text-emerald-500' },
} as const;

export const courses = [
  // Web Development
  { id: 1, title: 'Introduction to React', category: 'Web Development', difficulty: 'Beginner' },
  { id: 2, title: 'Advanced React Patterns', category: 'Web Development', difficulty: 'Advanced' },
  { id: 3, title: 'Vue.js Fundamentals', category: 'Web Development', difficulty: 'Beginner' },
  { id: 4, title: 'Next.js & Server Components', category: 'Web Development', difficulty: 'Intermediate' },
  { id: 5, title: 'Web Performance Optimization', category: 'Web Development', difficulty: 'Advanced' },

  // Programming
  { id: 6, title: 'Advanced JavaScript', category: 'Programming', difficulty: 'Advanced' },
  { id: 7, title: 'TypeScript Mastery', category: 'Programming', difficulty: 'Intermediate' },
  { id: 8, title: 'Rust Programming', category: 'Programming', difficulty: 'Advanced' },
  { id: 9, title: 'Go for Backend', category: 'Programming', difficulty: 'Intermediate' },
  { id: 10, title: 'Python Advanced Concepts', category: 'Programming', difficulty: 'Advanced' },

  // Data Science
  { id: 11, title: 'Machine Learning Basics', category: 'Data Science', difficulty: 'Beginner' },
  { id: 12, title: 'Data Analysis with Python', category: 'Data Science', difficulty: 'Intermediate' },
  { id: 13, title: 'Big Data Processing', category: 'Data Science', difficulty: 'Advanced' },
  { id: 14, title: 'Statistical Learning', category: 'Data Science', difficulty: 'Intermediate' },
  { id: 15, title: 'Data Visualization', category: 'Data Science', difficulty: 'Beginner' },

  // Design
  { id: 16, title: 'UI/UX Design Principles', category: 'Design', difficulty: 'Beginner' },
  { id: 17, title: 'Advanced UI Patterns', category: 'Design', difficulty: 'Advanced' },
  { id: 18, title: 'Design Systems', category: 'Design', difficulty: 'Intermediate' },
  { id: 19, title: 'Mobile UX Design', category: 'Design', difficulty: 'Intermediate' },
  { id: 20, title: 'Design Psychology', category: 'Design', difficulty: 'Advanced' },

  // Backend Development
  { id: 21, title: 'Node.js Fundamentals', category: 'Backend Development', difficulty: 'Beginner' },
  { id: 22, title: 'Microservices Architecture', category: 'Backend Development', difficulty: 'Advanced' },
  { id: 23, title: 'API Design', category: 'Backend Development', difficulty: 'Intermediate' },
  { id: 24, title: 'Database Design', category: 'Backend Development', difficulty: 'Intermediate' },
  { id: 25, title: 'GraphQL APIs', category: 'Backend Development', difficulty: 'Advanced' },

  // Mobile Development
  { id: 26, title: 'React Native Basics', category: 'Mobile Development', difficulty: 'Beginner' },
  { id: 27, title: 'iOS Development', category: 'Mobile Development', difficulty: 'Intermediate' },
  { id: 28, title: 'Android with Kotlin', category: 'Mobile Development', difficulty: 'Intermediate' },
  { id: 29, title: 'Cross-Platform Development', category: 'Mobile Development', difficulty: 'Advanced' },
  { id: 30, title: 'Mobile App Testing', category: 'Mobile Development', difficulty: 'Intermediate' },

  // AI & Machine Learning
  { id: 31, title: 'Deep Learning Fundamentals', category: 'AI & Machine Learning', difficulty: 'Intermediate' },
  { id: 32, title: 'Natural Language Processing', category: 'AI & Machine Learning', difficulty: 'Advanced' },
  { id: 33, title: 'Computer Vision', category: 'AI & Machine Learning', difficulty: 'Advanced' },
  { id: 34, title: 'Reinforcement Learning', category: 'AI & Machine Learning', difficulty: 'Advanced' },
  { id: 35, title: 'AI Ethics', category: 'AI & Machine Learning', difficulty: 'Intermediate' },

  // Cloud Computing
  { id: 36, title: 'AWS Essentials', category: 'Cloud Computing', difficulty: 'Beginner' },
  { id: 37, title: 'Azure Solutions', category: 'Cloud Computing', difficulty: 'Intermediate' },
  { id: 38, title: 'Cloud Security', category: 'Cloud Computing', difficulty: 'Advanced' },
  { id: 39, title: 'Serverless Architecture', category: 'Cloud Computing', difficulty: 'Intermediate' },
  { id: 40, title: 'Container Orchestration', category: 'Cloud Computing', difficulty: 'Advanced' },

  // DevOps
  { id: 41, title: 'CI/CD Pipelines', category: 'DevOps', difficulty: 'Intermediate' },
  { id: 42, title: 'Infrastructure as Code', category: 'DevOps', difficulty: 'Advanced' },
  { id: 43, title: 'Monitoring & Logging', category: 'DevOps', difficulty: 'Intermediate' },
  { id: 44, title: 'DevOps Security', category: 'DevOps', difficulty: 'Advanced' },
  { id: 45, title: 'Site Reliability Engineering', category: 'DevOps', difficulty: 'Advanced' },

  // Software Architecture
  { id: 46, title: 'Design Patterns', category: 'Software Architecture', difficulty: 'Intermediate' },
  { id: 47, title: 'Domain-Driven Design', category: 'Software Architecture', difficulty: 'Advanced' },
  { id: 48, title: 'Event-Driven Architecture', category: 'Software Architecture', difficulty: 'Advanced' },
  { id: 49, title: 'Clean Architecture', category: 'Software Architecture', difficulty: 'Intermediate' },
  { id: 50, title: 'System Design', category: 'Software Architecture', difficulty: 'Advanced' },
] as const;