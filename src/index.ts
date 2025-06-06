// src/index.ts
// import "module-alias/register";      Uncomment this line for Production
import app from "@/app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} ...`);
});
