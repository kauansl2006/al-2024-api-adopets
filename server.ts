import { config } from "dotenv";

config({ path: ".env.development.local" });

import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
