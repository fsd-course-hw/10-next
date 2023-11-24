import { Server } from "socket.io";

import express from "express";
import cors from "cors";
import { getHandlers } from "./src/handlers";

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON payloads
app.use(express.json());

// Endpoint to receive JSON data and send a JSON response
app.use(await getHandlers());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(3334, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join-board", (data) => {
    socket.join(data.boardId);
  });

  socket.on("board-updated", (data) => {
    socket.broadcast.to(data.boardId).emit("refresh-board", data);
  });

  socket.on("leave-board", (data) => {
    socket.leave(data.boardId);
  });
});

console.log("ws server start listen on port 3000");
