# Etapa de construcción para crear los archivos estáticos
FROM node:18-alpine as build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package.json ./
COPY vite.config.ts ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine

# Copiar archivos estáticos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Opcionalmente, puedes añadir tu propia configuración de Nginx
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para el servicio HTTP
EXPOSE 80

# Al ejecutar el contenedor, Nginx se iniciará automáticamente
CMD ["nginx", "-g", "daemon off;"]
