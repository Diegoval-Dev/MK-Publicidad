# MK-Publicidad
Este proyecto desarrolla una solución de software integral diseñada para una empresa líder en serigrafía y publicidad. Su objetivo principal es facilitar a los clientes el acceso a un catálogo digital interactivo, donde puedan visualizar, personalizar y solicitar cotizaciones de productos personalizados con facilidad y eficiencia. Desde tazas personalizadas hasta indumentaria y señalización con vinilo, el catálogo ofrece una amplia gama de productos personalizables al gusto del cliente.

Por el lado del administrador, el sistema está equipado con un robusto dashboard que permite a diferentes roles dentro de la empresa gestionar cotizaciones, comunicarse con los clientes, y actualizar el catálogo de productos. Esto incluye perfiles de administración de contenido, ventas, y contabilidad, cada uno con acceso y funcionalidades específicas adaptadas a sus necesidades operativas y estratégicas.

Desarrollado utilizando tecnologías modernas como Node.js, Express, React, y MySQL, y orquestado en contenedores Docker para una implementación eficiente, este proyecto promete transformar la manera en que la empresa interactúa con sus clientes y gestiona su inventario de productos personalizados, ofreciendo una experiencia de usuario inmejorable y optimizando los procesos internos de serigrafía y publicidad.

## Índice

- [Introducción](#introducción)
- [Objetivo General](#objetivo-general)
- [Objetivos Específicos](#objetivos-específicos)
- [Prerequisitos](#prerrequisitos)
- [Instalacion](#instalación)
    -[Clonar el repositorio](#Clonar-el-Repositorio)
    -[Configuración de Docker](#Configuración-de-Docker)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contacto](#contacto)
## Introducción

MK Platform es una solución digital y automatizada que simplifica el proceso de ventas de MK Publicidad, un negocio dirigido por la emprendedora Marielos. La empresa, que gestiona sus ventas a través de redes sociales, enfrenta desafíos como la falta de presencia digital y altos costos en publicidad. Este proyecto introduce una plataforma que permite la personalización y solicitud automática de cotizaciones, mejorando la experiencia del usuario y la eficiencia operativa.

## Objetivo General

Optimizar el proceso de ventas de MK Publicidad, mejorando la eficiencia y precisión durante las etapas iniciales del proceso de ventas con un enfoque particular en la personalización de productos y la automatización del proceso de solicitud de cotizaciones.
## Objetivos Específicos

- Facilitar la personalización de productos a través de una interfaz intuitiva.
- Automatizar la solicitud de cotización para reducir el tiempo y esfuerzo necesarios.
- Organizar el catálogo de productos de manera clara e intuitiva para mejorar la accesibilidad.


## Prerrequisitos

Para configurar y ejecutar este proyecto, necesitarás instalar lo siguiente en tu máquina de desarrollo:

1. **Node.js y npm**: Necesarios para ejecutar el backend y el frontend. Node.js es el entorno de ejecución para JavaScript del lado del servidor, y npm es el sistema de gestión de paquetes para JavaScript. Puedes descargarlos e instalarlos desde [https://nodejs.org/](https://nodejs.org/).

2. **Docker**: Utilizado para contenerizar y ejecutar la aplicación, asegurando la consistencia entre los entornos de desarrollo y producción. Descarga Docker desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).

3. **MySQL**: El sistema de gestión de bases de datos. Necesitarás MySQL para la persistencia de datos. Puedes instalar MySQL siguiendo las instrucciones en [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/).

4. **Git**: Esencial para la clonación del repositorio y el control de versiones. Instala Git desde [https://git-scm.com/downloads](https://git-scm.com/downloads).

5. **Un editor de código o IDE**: Recomendado para escribir y editar tu código. Algunas opciones populares incluyen Visual Studio Code [https://code.visualstudio.com/](https://code.visualstudio.com/), Sublime Text [https://www.sublimetext.com/](https://www.sublimetext.com/), y JetBrains WebStorm [https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/).

6. **Ubuntu (opcional para entorno de producción)**: Si planeas desplegar la aplicación en un servidor Ubuntu, necesitarás acceso a uno. Puedes instalar Ubuntu en una máquina virtual para pruebas locales, o utilizar un servidor en la nube. Información sobre Ubuntu está disponible en [https://ubuntu.com/](https://ubuntu.com/).

7. **Nginx (opcional para entorno de producción)**: Si usarás Nginx como servidor web y proxy inverso, instálalo en tu servidor. Las instrucciones de instalación están disponibles en [http://nginx.org/en/docs/install.html](http://nginx.org/en/docs/install.html).
## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu entorno local.

#### Clonar el Repositorio

Primero, clona el repositorio a tu máquina local usando Git:

```bash
git clone https://github.com/Diegoval-Dev/MK-Publicidad.git MKPublicidad
cd MKPublicidad
```
### Configuración de Docker

Ejecuta el siguiente comando para construir y levantar los contenedores necesarios para el proyecto:

```bash
docker-compose up -d
```

## Tecnologías Utilizadas

- **Frontend**: React JS, Tailwind CSS
- **Backend**: Express, Sequelize, BCrypt, Json Web Token
- **Persistencia de Datos**: MySQL
- **Herramientas de Desarrollo**: Docker, Vite

## Autores
Un reconocimiento a las personas que han contribuido al desarrollo y éxito de MK Platform. Su dedicación, conocimiento y habilidades han sido fundamentales para llevar el proyecto a su estado actual.
- **Diego Valenzuela** - *Desarrollo Backend y Frontend* - [Perfil de Diego](https://github.com/diegoval-dev)
- **Ruth de Leon** - *a* - [Perfil de Ruth](https://github.com/Anaru03)
- **Silvia Illescas** - *a* - [Perfil de Silvia](https://github.com/Silviaillescas)
- **Héctor Penedo** - *a* - [Perfil de Héctor](https://github.com/DANdelion-0908)
- **Michelle Mejia** - *a* - [Perfil de Michelle](https://github.com/michellemej22596)
