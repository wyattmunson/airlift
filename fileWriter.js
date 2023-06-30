import fs from "fs";

// FILE WRITER
const openAndAppendFile = (message, filename) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filename, message + "\n", "utf-8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Written");
      }
    });
  });
};

export const writeToFile = (message, file = "output.txt") => {
  console.log(message);
  const sanitizedMessage = JSON.stringify(message);
  openAndAppendFile(sanitizedMessage, file).catch((err) => {
    console.error("Error appending", err);
  });
};
