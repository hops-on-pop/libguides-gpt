--  RUN 1st
create extension vector;

-- RUN 2nd
create table lg (
  id bigserial primary key,
  guide_title text,
  guide_url text,
  page_title text,
  box_title text,
  box_content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts
create or replace function lg_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  guide_title text,
  guide_url text,
  page_title text,
  box_title text,
  box_content text,
  content_length bigint,
  content_tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    lg.id,
    lg.guide_title,
    lg.guide_url,
    lg.page_title,
    lg.box_title,
    lg.box_content,
    lg.content_length,
    lg.content_tokens,
    1 - (lg.embedding <=> query_embedding) as similarity
  from lg
  where 1 - (lg.embedding <=> query_embedding) > similarity_threshold
  order by lg.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on lg 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);