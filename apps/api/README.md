# @vnphanquang/api

## Database

```bash
   docker run -d --name vnphanquang -p 5454:5432 \
   -e POSTGRES_PASSWORD="dev" \
   -e POSTGRES_DB="vnphanquang" \
   -v /home/.../postgres-volume:/var/lib/postgresql/data \
   postgres

   docker build -f Dockerfile.api -t vnphanquang:api .
```
