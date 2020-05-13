FROM node:13.3.0
RUN mkdir -p /gast0s
WORKDIR /gast0s
COPY . /gast0s
EXPOSE 5000
