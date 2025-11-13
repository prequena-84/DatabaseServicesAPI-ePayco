## Inico de Proyecto Development Local
-----------
bash
npm run start:dev 
------------

## Inico de Proyecto Production Local
-------------
bash
npm run build
npm run start:prod
-------------

## Inicio de Base de Datos Contenedor Docker MySQL + Adminer Necesarias para que funcione el Sistema

bash
docker compose up db                -> Arranca imagen MySQl

bash
docker compose up --build adminer   -> Arranca y compila imagen de Adminer

-----------------------------------------------------------------------------

## Inicio del contener del Stage de desarrollo de la API - base de datos 
bash
docker compose up --build development

-------------------------------------------------------------------------------

## Inicio del contener del Stage de producción de la API - base de datos 
bash
docker compose up --build production

--------------------------------------------------------------------------------


## Instalación de las librerias
Se necesita ejecutar el siguiente código en la consola y debe estar en la ruta raiz del proyecto npm install, y luego crear una carpeta en la misma raiz del proyecto llamada build, es donde se agregara los archivos de la compilación del proyecto, y para crear la compilación se debe ejecutar npm run build.

## Configuración MySQL
Ya el contenedor Docker contiene la imagen de Adminer que contiene la base de datos para los Stage de production y Development, con el usuario: "userdev" y password:"dev1234" en el localhost:8080.

## Configuración del Docker.
Para desplegar los Stage de Docker:

- Base de Datos
docker compose up --build db

- Adminer
docker compose up --build adminer

- Development
docker compose up --build development

- production
docker compose up --build production

- All 
docket compose up --build

Con esta configuración el primer microservicio estara operativo para recibir los datos de registro de cliente y transacciones serializado en Base64 y tambien genera el reporte de clientes.

Para las pruebas puedes ingresar datos desde el Adminer con sentencias SQL.