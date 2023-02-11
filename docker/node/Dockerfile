ARG NODE_VERSION=18.14.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY docker/node/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["node"]

COPY . ./

RUN set -eux; \
    npm install

