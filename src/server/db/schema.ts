import { int, text, bigint, index, singlestoreTableCreator } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => 'nuvem_' + name
);

export const users = createTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});

export const file_items = createTable("file_items", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: int("size").notNull(),
  modified: text("modified").notNull(),
  path: text("path").notNull(),
  parentId: bigint("parent_id", { mode: "number", unsigned: true }).notNull(),
}, (t) => {
  return [index("parent_id").on(t.parentId)]
});