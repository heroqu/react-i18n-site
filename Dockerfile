ARG DISTRO=node:10.6.0-alpine

ARG SERVE_VERSION=9.2.0

FROM $DISTRO as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM $DISTRO as deploy

RUN npm i -g serve@$SERVE_VERSION

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build/ .

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

CMD ["serve"]
