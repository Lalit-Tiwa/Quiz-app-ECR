# Use lightweight Nginx image
FROM nginx:alpine

# Copy your HTML file into the default Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
