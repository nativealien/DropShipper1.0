# Docs

## Postgres and Docker

```
docker --version

docker run hello-world

docker run --name dev-postgres \
  -e POSTGRES_USER=devuser \
  -e POSTGRES_PASSWORD=devpass \
  -e POSTGRES_DB=devdb \
  -p 5432:5432 \
  -d postgres:16

docker ps

docker stop dev-postgres

docker start dev-postgres
```
