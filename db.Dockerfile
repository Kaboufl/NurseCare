FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=DBtodo
ENV MYSQL_USER=todo
ENV MYSQL_PASSWORD=todo

COPY db/init.sql /docker-entrypoint-initdb.d

EXPOSE 3306
