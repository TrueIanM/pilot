// commentsStore.js
// Manages fetching, adding, and replying to comments

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { createQuery } from "../scripts/modes";

export const useCommentsStore = defineStore("commentsStore", () => {
  const comments = ref([]); // Holds all comments

  // Fetch comments or replies from the server
  async function fetchComments(obj) {
    try {
      let res = await axios.get("/comments" + createQuery(obj));
      if (res.data.result) {
        if (obj.table === "comments")
          comments.value = res.data.comments.reverse();
        else comments.value[obj.index]["replys"] = res.data.comments.reverse();
      }
      return res.data.result;
    } catch (error) {
      return false;
    }
  }

  // Add a new comment
  async function addComment(obj) {
    try {
      let res = await axios.put("/comment", obj);
      if (res.data.result) {
        comments.value.unshift(obj);
      }
      return res.data.result;
    } catch (error) {
      return false;
    }
  }

  // Add a reply to an existing comment
  async function addReply(obj) {
    try {
      let res = await axios.put("/reply", obj);
      if (res.data.result) {
        comments.value[obj.index].replys.unshift(obj);
      }
      return res.data.result;
    } catch (error) {
      return false;
    }
  }

  return { addComment, fetchComments, addReply, comments };
});
