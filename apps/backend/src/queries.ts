import { DaySlots } from "@repo/time-slot";

const getFirst = <T>({ results }: D1Result<Record<string, unknown>>) =>
  results.at(0) as T | undefined;

export const SyncQueries = {
  create(db: D1Database) {
    return {
      selectById: (id: string) =>
        db
          .prepare("select title, data from sync where id = ? limit 1")
          .bind(id)
          .run()
          .then(getFirst<{ title: string; data: string }>),
      updateById: (id: string, data: DaySlots) =>
        db
          .prepare("update sync set data = ? where id = ?")
          .bind(JSON.stringify(data), id)
          .run()
          .then(() => {}),
      insertSync: (id: string, title: string, data: DaySlots) =>
        db
          .prepare("insert into sync(id, title, data) values (?, ?, ?)")
          .bind(id, title, JSON.stringify(data))
          .run()
          .then(() => {}),
    };
  },
};
