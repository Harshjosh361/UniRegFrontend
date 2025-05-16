export const semesterSubjectMap = {
  1: [
    "Essential Mathematics 1",
    "Applied Physics",
    "Principles of Programming using C",
    "Introduction to Electronics Engineering",
    "Introduction to Cloud Computing",
    "Communicative English",
    "Indian Constitution",
    "Scientific Foundation of Health and Happiness"
  ],
  2: [
    "Essential Mathematics 2",
    "Applied Chemistry",
    "Computer Aided Engineering Drawing",
    "Introduction to Electrical Engineering",
    "Introduction to Python Programming",
    "Professional Writing Skills in English",
    "Balake Kannada",
    "Innovation and Design Thinking"
  ],
  3: [
    "Mathematics",
    "Data Structures with Applications",
    "Operating System",
    "Web Development Lab",
    "Digital Logic Design",
    "Regression in Python",
    "Social Connect and Responsibility"
  ],
  4: [
    "Discrete Mathematical Structure",
    "Computer Organization and Architecture",
    "Design and Analysis of Algorithms",
    "Database and Management Systems",
    "Java Laboratory",
    "Advanced Java Programming",
    "Web Development Laboratory",
    "Universal Human Values",
    "Mini-Project - I"
  ],
  5: [
    "Automata and Compiler Design",
    "Artificial Intelligence and Machine Learning",
    "Computer Networks",
    "Mobile Application Development Lab",
    "Blockchain Technology",
    "Object Oriented Modeling and Design",
    "Research Methodology and IPR",
    "Environmental Studies"
  ],
  6: [
    "Big Data Analytics",
    "Full Stack Development",
    "Software Engineering and Testing",
    "Cyber Security and Digital Forensics",
    "Data Warehousing and Data Mining",
    "5G and Internet of Things",
    "Biology for Engineers",
    "Introduction to Java",
    "Generative AI",
    "Introduction to Agile/DevOps Integration"
  ],
  7: [
    "Artificial Intelligence and Machine Learning",
    "Big Data Analytics",
    "Software Architecture and Design Patterns",
    "Internet of Things",
    "User Interface Design",
    "Advanced Computer Architectures",
  ],
  8: [
    "Internet of Things (IoT)",
    "Project Work Phase II",
    "Internship / Professional Practise",
  ],
};

export const getSubjectsForSemester = (semester) => {
  return semesterSubjectMap[semester] || [];
}; 