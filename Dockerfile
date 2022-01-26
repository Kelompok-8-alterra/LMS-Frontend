FROM node:14.17.6-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm run build
COPY . ./

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# setting nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]