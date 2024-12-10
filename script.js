let userName;
let userNum;
let socketState = false;

const socket = io("http://000.000.000.000:3001", {
  query: {
    Password: "WEB_CLUBFESTIVAL",
  },
});

socket.on("connect", () => {
  console.log("성공!");
  socketState = true;
});

socket.on("connect_error", (err) => {
  console.log("실패", err);
  socketState = false;
});

let timeset;
const errMess = () => {
  clearTimeout(timeset);
  const errMessage = document.getElementById("error-message");

  errMessage.style.display = "block";

  timeset = setTimeout(() => {
    errMessage.style.display = "none";
  }, 3000);
};

const setUser = (StudentNum, Name) => {
  if (socketState) {
    socket.timeout(5000).emit("login", Name, StudentNum, (err,state) => {
      console.log(state);
      if (state) {
        userName = Name;
        userNum = StudentNum;
      } else {
        errMess();
      }
    });
  } else {
    errMess();
  }
};

const Record = (value) => {
  if (!userName || !userNum) return new Error("please setUser");

  socket.emit("addPoint", userName, userNum, value);
  socket.emit("PlayDataRecord", userName, userNum, value);
};

const input = document.getElementById("logForm");

input.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = document.getElementById("inputStudentNum").value;

  const none = value.replace(/\s+/g, "");
  const studentName = none.substr(5);
  const studentNum = none.substr(0, 5);

  setUser(studentNum, studentName);
});
