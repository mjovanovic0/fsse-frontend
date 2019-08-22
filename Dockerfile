FROM nginxinc/nginx-unprivileged

# Add and build all as root
COPY build /usr/share/nginx/html