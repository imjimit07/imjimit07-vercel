export type CourseContent = {
  name: string;
  slug?: string;
  description?: string;
  content?: CourseContent[];
};

export interface Course {
  title: string;
  slug: string;
  banner: string;
  description: string;
  content: CourseContent[];
}

export const courseSlugMap = {
  go: 'Learn Go',
  'system-design': 'System Design',
};

export const courses: Course[] = [
  {
    title: 'Learn Python',
    slug: 'learn-python',
    banner: '/static/courses/system-design/banner.png',
    description:
      'Learn how to write Python and use it in Real-life situations',
    content: [
      {
        name: 'Getting Started',
        content: [
          {
            name: 'Welcome to the course',
            slug: 'welcome-to-the-course',
          },
          {
            name: 'What is system design?',
            slug: 'what-is-system-design',
          },
        ],
      },
    ],
  },
];
