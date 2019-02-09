ARG DISTRO=node:11.9-alpine

FROM $DISTRO as deploy

ARG SERVE_VERSION=10.1.2

# RUN npm i -g serve@$SERVE_VERSION
RUN yarn global add serve@$SERVE_VERSION

WORKDIR /usr/src/app

RUN pwd

COPY ./build/ ./build

# Starting from version 9.1.0 `serve` can read the PORT value
# from process.env.PORT, which is a good news for us, as Docker
# currently does not do var expansion inside CMD parameters
# in `exec` form, thus we couldn't just write
#  CMD ["serve", "-p", "$PORT"]
# - this would not work.
#
# Let's use that feature to make the port configurable
# simultaneously in container and serve:
ENV PORT=3010

EXPOSE $PORT

CMD ["serve", "-s", "build"]
