import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_BAf7eRKbVx5m@ep-cool-unit-a514180t-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  }
});