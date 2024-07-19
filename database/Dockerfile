FROM postgres:13

ENV POSTGRES_DB=avaliacoes
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

COPY init.sql /docker-entrypoint-initdb.d/
