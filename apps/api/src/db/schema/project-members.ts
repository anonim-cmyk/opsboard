import { pgEnum, pgTable, timestamp, uuid, unique } from "drizzle-orm/pg-core";

import { projects } from "./projects.js";
import { users } from "./users.js";

export const projectMemberRoleEnum = pgEnum("project_member_role", [
  "OWNER",
  "DEVELOPER",
  "VIEWER",
]);

export const projectMembers = pgTable(
  "project_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    role: projectMemberRoleEnum("role").notNull().default("VIEWER"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("project_members_project_user_unique").on(
      table.projectId,
      table.userId
    ),
  ]
);
