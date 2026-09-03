import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const projectStatusEnum = pgEnum("project_status", [
  "ACTIVE",
  "ARCHIVED",
]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  description: text("description"),

  status: projectStatusEnum("status").notNull().default("ACTIVE"),

  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
