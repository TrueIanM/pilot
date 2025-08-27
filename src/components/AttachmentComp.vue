<!--
  AttachmentComp.vue
  Displays an image attachment and opens it in a new window on click
-->

<template>
  <div @click="openImageWindow" class="cont">
    <img :src="attachment" alt="Attachment" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props for the Question object
const props = defineProps({ Question: Object });

// Determine port for current environment
const port = window.location.port === "" ? "" : `:${window.location.port}`;

// Set default image if attachment is null
function setDefault() {
  if (
    props.Question.attachment === null ||
    props.Question.attachment === "null"
  ) {
    return `${window.location.protocol}//${window.location.hostname}${port}/src/assets/missing.png`;
  } else {
    return props.Question.attachment;
  }
}

const attachment = ref(setDefault());

// Open the attachment in a new window
function openImageWindow() {
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
        <html>
          <head>
            <title>Image</title>
            <style>
              body, html {
                margin: 0;
                padding: 0;
                height: 100%;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${attachment.value}" alt="Image" />
          </body>
        </html>
      `);
}
</script>
