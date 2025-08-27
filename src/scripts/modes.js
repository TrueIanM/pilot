// Utility functions for exams, users, validation, date formatting, and general helpers

function createQuery(Obj) {
  // Converts an object into URL query string
  let queryString = Object.keys(Obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(Obj[key])}`)
    .join("&");
  return "?" + queryString;
}

function cleanExam(exam) {
  // Reset exam data
  exam.questions = [];
  exam.current_question = 0;
  exam.progress = 0;
  exam.time_taken = "";
  exam.isTestMode = false;
  exam.level = "";
  exam.subject = "";
  exam.date = "";
}

function isPasswordValid(val) {
  // Validate password complexity
  if (val < 8) return false;
  if (!/[a-z]/.test(val)) return false;
  if (!/[A-Z]/.test(val)) return false;
  if (!/\d/.test(val)) return false;
  if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(val)) return false;
  return true;
}

function getCurrentTime() {
  // Return current time as HH:MM:SS
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${hours}:${minutes}:${seconds}`;
}

function cleanFetchExam(exam) {
  // Reset exam for fetching new test
  exam.questions = [];
  exam.current_question = 0;
  exam.progress = 0;
  exam.time_taken = "";
  exam.isTestMode = true;
  exam.date = getDate();
}

function getDate() {
  // Return current date as DD-MM-YYYY
  let d = new Date();
  return d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
}

function setUser(user, store) {
  // Set user data in store and localStorage
  store.user.id = user.id;
  localStorage.setItem("id", user.id);
  store.user.names = user.names;
  localStorage.setItem("names", user.names);
  store.user.username = user.username;
  localStorage.setItem("username", user.username);
  store.user.email = user.email;
  localStorage.setItem("email", user.email);
  store.user.phone = user.phone;
  localStorage.setItem("phone", user.phone);
  store.user.isLoggedIn = true;
}

function deleteUser(store) {
  // Clear user data from store and localStorage
  store.user.id = "";
  store.user.names = "";
  store.user.username = "";
  store.user.email = "";
  store.user.phone = "";
  store.user.isLoggedIn = false;

  localStorage.removeItem("id");
  localStorage.removeItem("names");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("phone");
}

function setUserLocal(store) {
  // Load user data from localStorage into store
  store.user.id = localStorage.getItem("id");
  store.user.names = localStorage.getItem("names");
  store.user.username = localStorage.getItem("username");
  store.user.email = localStorage.getItem("email");
  store.user.phone = localStorage.getItem("phone");
  store.user.isLoggedIn = true;
}

function checkCookie(cookieName) {
  // Check if cookie exists
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) return true;
  }
  return false;
}

function checkLocalStorage() {
  // Check if user id exists in localStorage
  return localStorage.getItem("id") !== null;
}

function formatDateForDisplay(dateString) {
  // Format date string as human-readable HTML
  const date = new Date(dateString);
  if (isNaN(date)) return '<div class="date">Invalid date</div>';
  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const daySuffix = getDaySuffix(day);
  return `<div class="date">${day}<sup>${daySuffix}</sup> ${month} ${year}</div>`;
}

function getRandomValue() {
  // Return random integer 0-20
  return Math.floor(Math.random() * 21);
}

function getDaySuffix(day) {
  // Return proper suffix for a given day
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function errorMessage(item) {
  // Return generic error message string
  return `there was an error fetching ${item}`;
}

export {
  createQuery,
  cleanExam,
  getDate,
  cleanFetchExam,
  setUser,
  checkCookie,
  setUserLocal,
  checkLocalStorage,
  getCurrentTime,
  formatDateForDisplay,
  errorMessage,
  getRandomValue,
  deleteUser,
  isPasswordValid,
};
