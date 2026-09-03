import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["ADMIN", "USER"]);
export const authProviderEnum = pgEnum("auth_provider", ["LOCAL", "GOOGLE"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  passwordHash: varchar("password_hash", { length: 255 }),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  avatarUrl: varchar("avatar_url", { length: 500 }),

  provider: authProviderEnum("provider").notNull().default("LOCAL"),

  role: userRoleEnum("role").notNull().default("USER"),

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
