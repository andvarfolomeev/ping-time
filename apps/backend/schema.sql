drop table if exists sync;
create table if not exists sync(
    id string primary key, -- uuid4
    title text,
    data TEXT -- JSON
);
