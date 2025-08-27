// counter.js
// Manages exam data, user info, history, and interactions with API

import axios from "axios";
import { defineStore } from "pinia";
import { createQuery, cleanFetchExam } from "../scripts/modes";

export const useQuestionsStore = defineStore("questions", {
  state: () => ({
    exams: [], // User exam history
    currentIndex: 0, // Currently selected exam index
    questionsTotalCount: 0, // Total questions in history
    currentPage: 1,
    currentSet: 1,
    exam: {
      questions: [], // Array of questions for the current exam
      current_question: 0,
      progress: 0,
      time_taken: "",
      isTestMode: false,
      level: "",
      subject: "",
      date: "",
      exam_id: "",
      feedback: "", // Feedback string storing answer selections
      isReview: false,
      isRetry: false,
    },
    user: {
      id: 0,
      names: "",
      username: "",
      phone: "",
      email: "",
      isLoggedIn: false,
      userImage: "",
    },
    key: 0, // generic key for reactive updates
    userProgress: 0, // Progress percentage
    overlayVisibility: false, // UI overlay visibility
    open_close: false, // For modals
    choices: ["A", "B", "C", "D"], // Choices for multiple choice questions
    levels: ["CPL", "CPL(H)", "ATPL", "ATPL(H)"],
    subjects: [
      "Airlaw",
      "Aircraft General Knowledge",
      "Flight Performance and Planning",
      "General Navigation",
      "Human Performance",
      "IFR Communication",
      "Meterology",
      "Operational Procedures",
      "Principles Of Flight",
      "VFR Communication",
    ],
  }),

  getters: {
    // Get a slice of questions for pagination
    getFiveItems: (state) => (start, end) =>
      state.exam.questions.slice(start, end),

    // Get question string from feedback for a specific index
    getQuestionString: (state) => (index) =>
      state.exam.feedback.split(":")[index],

    // Get comments count for a specific question
    getCommentsCount: (state) => (index) => {
      const question = state.exam.questions[index];
      return question && question.comments ? question.comments : 0;
    },
  },

  actions: {
    // Increment comment count for a question
    increaseCommentsCount(index) {
      this.exam.questions[index].comments++;
    },

    // Fetch questions for an exam
    async getExamQuestions(data) {
      try {
        const res = await axios.get("/exam" + createQuery(data));
        cleanFetchExam(this.exam); // reset exam state
        this.exam.questions = res.data;

        // Initialize radio button states
        this.exam.questions.forEach((el) => {
          el.radio = false;
          el.radio1 = false;
          el.radio2 = false;
        });
        return true;
      } catch (error) {
        return error;
      }
    },

    // Register a new user
    async registerUser(details) {
      const res = await axios.put("/user", details);
      return res.data;
    },

    // User login
    async loginUser(details) {
      const res = await axios.post("/login", details, {
        withCredentials: true,
      });
      return res.data;
    },

    // Get total number of exams for pagination
    async getHistoryCount(obj) {
      const res = await axios.get("history/count" + createQuery(obj));
      this.questionsTotalCount = res.data.data.count;
    },

    // Fetch user exam history
    async getHistory(details) {
      const res = await axios.get("/history" + createQuery(details));
      this.exams = res.data;
    },

    // Delete a history record
    async deleteHistory(details) {
      const res = await axios.delete("/history" + createQuery(details));
      return res;
    },

    // Save current exam results
    async saveExam(details) {
      const res = await axios.put("/history", details);
      if (res.data.result === "success") {
        this.exam.exam_id = res.data.last_insert_id;
      }
    },

    // Get selected exams for a level/subject
    async getSelectExams(details) {
      try {
        const res = await axios.post("/select", details);
        this.exam.questions = res.data;

        this.exam.questions.forEach((el) => {
          if (details.op === 1) {
            el.selections.forEach(
              (selection) => (selection.isSelected = false)
            );
            el.isAttempted = false;
            el.isCorrect = false;
          }
          el.radio = el.rad === "1";
          el.radio1 = el.rad === "2";
          el.radio2 = el.rad === "3";
        });

        return true;
      } catch (error) {
        return false;
      }
    },

    // Edit a saved exam
    async editExams(details) {
      const res = await axios.patch("/history", details);
      return res.data;
    },
  },
});
