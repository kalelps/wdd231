/* Dates */
document.getElementById("currentyear").textContent =
  new Date().getFullYear();

document.getElementById("lastModified").textContent =
  document.lastModified;

/* Responsive Menu */
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

/* Courses Array */
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    technology: ['HTML','CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    technology: ['Python'],
    completed: false
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    technology: ['HTML','CSS','JavaScript'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    technology: ['HTML','CSS','JavaScript'],
    completed: false
  }
];

/* Display Courses */
const container = document.getElementById("courses");
const creditDisplay = document.getElementById("totalCredits");

function displayCourses(courseList) {
  container.innerHTML = "";

  courseList.forEach(course => {
    const card = document.createElement("div");
    card.className = course.completed ? "course completed" : "course";

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>Credits: ${course.credits}</p>
    `;

    container.appendChild(card);
  });

  const totalCredits = courseList.reduce(
    (sum, course) => sum + course.credits, 0
  );

  creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}

displayCourses(courses);
