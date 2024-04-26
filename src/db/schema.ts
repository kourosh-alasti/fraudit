import { relations } from "drizzle-orm";
import {
  pgTable,
  boolean,
  text,
  timestamp,
  uuid,
  integer,
  primaryKey,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { comment } from "postcss";

export const universities = pgTable("universities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  abbreviation: text("abbreviation").notNull(),
  rating: doublePrecision("rating").default(5),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const universityRelations = relations(universities, ({ one, many }) => ({
  courses: many(courses),
  professors: many(professors),
}));

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  universityId: uuid("university_id").references(() => universities.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  courseNumber: text("course_number").notNull(),
  abbreviation: text("abbreviation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const courseRelations = relations(courses, ({ one, many }) => ({
  university: one(universities, {
    fields: [courses.universityId],
    references: [universities.id],
  }),
  professorsToCourses: many(professorsToCourses),
}));

export const professors = pgTable("professors", {
  id: uuid("id").defaultRandom().primaryKey(),
  universityId: uuid("university_id").references(() => universities.id, {
    onDelete: "cascade",
  }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  rating: doublePrecision("rating").default(5.0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const professorsRelations = relations(professors, ({ one, many }) => ({
  university: one(universities, {
    fields: [professors.universityId],
    references: [universities.id],
  }),
  professorsToCourses: many(professorsToCourses),
}));

export const professorsToCourses = pgTable("professors_to_courses", {
  professorId: uuid("professor_id").references(() => professors.id, {
    onDelete: "cascade",
  }),
  courseId: uuid("course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
});

export const professorsToCoursesRelations = relations(
  professorsToCourses,
  ({ one }) => ({
    professor: one(professors, {
      fields: [professorsToCourses.professorId],
      references: [professors.id],
    }),
    course: one(courses, {
      fields: [professorsToCourses.courseId],
      references: [courses.id],
    }),
  }),
);

export const userToFraudits = pgTable(
  "users_to_fraudits",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    frauditId: uuid("fraudit_id")
      .notNull()
      .references(() => fraudits.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.frauditId],
    }),
  }),
);

export const userToFrauditsRelations = relations(userToFraudits, ({ one }) => ({
  fraudit: one(fraudits, {
    fields: [userToFraudits.frauditId],
    references: [fraudits.id],
  }),
  user: one(users, {
    fields: [userToFraudits.userId],
    references: [users.id],
  }),
}));

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  userToFraudits: many(userToFraudits),
  ownerOf: many(fraudits),
  threads: many(threads),
  comments: many(comments),
}));

export const fraudits = pgTable("fraudits", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull().unique(),
  descripton: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  memberCount: integer("member_count").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  ownerId: text("owner_id").references(() => users.id, {
    onDelete: "cascade",
  }),
});

export const frauditRelations = relations(fraudits, ({ one, many }) => ({
  owner: one(users, { fields: [fraudits.ownerId], references: [users.id] }),
  userToFraudits: many(userToFraudits),
  threads: many(threads),
  comments: many(comments),
}));

export const threads = pgTable("threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  title: text("title").notNull(),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  frauditId: uuid("fraudit_id").references(() => fraudits.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const threadRelations = relations(threads, ({ one, many }) => ({
  fraudit: one(fraudits, {
    fields: [threads.frauditId],
    references: [fraudits.id],
  }),
  user: one(users, {
    fields: [threads.userId],
    references: [users.id],
  }),
  comments: many(comments),
}));

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  frauditId: uuid("fraudit_id").references(() => fraudits.id, {
    onDelete: "cascade",
  }),
  threadId: uuid("thread_id").references(() => threads.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const commentRelations = relations(comments, ({ one, many }) => ({
  fraudit: one(fraudits, {
    fields: [comments.frauditId],
    references: [fraudits.id],
  }),
  user: one(users, { fields: [comments.userId], references: [users.id] }),
  threads: one(threads, {
    fields: [comments.threadId],
    references: [threads.id],
  }),
}));
