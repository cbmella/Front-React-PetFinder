# Utiliza una imagen de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto al contenedor
COPY package.json ./
COPY vite.config.ts ./

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Inicia el servidor de desarrollo de Vite cuando se ejecute el contenedor
CMD ["npm", "run", "dev"]