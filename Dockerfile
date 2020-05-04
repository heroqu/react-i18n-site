ARG DISTRO=node:13-alpine

FROM $DISTRO as deploy

ARG SERVE_VERSION=11.3

RUN yarn global add serve@$SERVE_VERSION

WORKDIR /usr/src/app

COPY ./build/ ./build

# port for serve
ENV PORT=3010

EXPOSE $PORT

CMD ["serve", "-s", "build"]
