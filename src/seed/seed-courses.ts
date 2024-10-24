export interface SeedCourse {
  courseCode: string;
  name: string;
  description: string;
  icon: string;
}

export const initialData = {
  courses: [
    {
      courseCode: 'MGMT8680',
      name: 'Information Technology Operations and Project Management (2020)',
      description:
        'IT organizations execute practices based on defined processes to ensure consistent service delivery. Projects must be planned and implemented in a well-organized manner to maximize success. This course introduces structured IT operations through ITIL, the most commonly used system in IT management. As well, students will learn how to manage an IT project from concept to conclusion using industry standard project management techniques.',
      icon: 'fa-solid fa-bars-progress',
    },
    {
      courseCode: 'CSE-102',
      name: 'Introduction to Software Engineering',
      description: 'This course is an introduction to software engineering.',
      icon: 'fa-solid fa-bars-progress',
    },
    {
      courseCode: 'CSE-103',
      name: 'Introduction to Data Structures and Algorithms',
      description:
        'This course is an introduction to data structures and algorithms.',
      icon: 'fa-solid fa-bars-progress',
    },
  ],
};
