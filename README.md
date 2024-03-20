# MK-Publicidad
Este proyecto desarrolla una solución de software integral diseñada para una empresa líder en serigrafía y publicidad. Su objetivo principal es facilitar a los clientes el acceso a un catálogo digital interactivo, donde puedan visualizar, personalizar y solicitar cotizaciones de productos personalizados con facilidad y eficiencia. Desde tazas personalizadas hasta indumentaria y señalización con vinilo, el catálogo ofrece una amplia gama de productos personalizables al gusto del cliente.

Por el lado del administrador, el sistema está equipado con un robusto dashboard que permite a diferentes roles dentro de la empresa gestionar cotizaciones, comunicarse con los clientes, y actualizar el catálogo de productos. Esto incluye perfiles de administración de contenido, ventas, y contabilidad, cada uno con acceso y funcionalidades específicas adaptadas a sus necesidades operativas y estratégicas.

Desarrollado utilizando tecnologías modernas como Node.js, Express, React, y MySQL, y orquestado en contenedores Docker para una implementación eficiente, este proyecto promete transformar la manera en que la empresa interactúa con sus clientes y gestiona su inventario de productos personalizados, ofreciendo una experiencia de usuario inmejorable y optimizando los procesos internos de serigrafía y publicidad.
## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Para configurar y ejecutar este proyecto, necesitarás instalar lo siguiente en tu máquina de desarrollo:

1. **Node.js y npm**: Necesarios para ejecutar el backend y el frontend. Node.js es el entorno de ejecución para JavaScript del lado del servidor, y npm es el sistema de gestión de paquetes para JavaScript. Puedes descargarlos e instalarlos desde [https://nodejs.org/](https://nodejs.org/).

2. **Docker**: Utilizado para contenerizar y ejecutar la aplicación, asegurando la consistencia entre los entornos de desarrollo y producción. Descarga Docker desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).

3. **MySQL**: El sistema de gestión de bases de datos. Necesitarás MySQL para la persistencia de datos. Puedes instalar MySQL siguiendo las instrucciones en [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/).

4. **Git**: Esencial para la clonación del repositorio y el control de versiones. Instala Git desde [https://git-scm.com/downloads](https://git-scm.com/downloads).

5. **Un editor de código o IDE**: Recomendado para escribir y editar tu código. Algunas opciones populares incluyen Visual Studio Code [https://code.visualstudio.com/](https://code.visualstudio.com/), Sublime Text [https://www.sublimetext.com/](https://www.sublimetext.com/), y JetBrains WebStorm [https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/).

6. **Ubuntu (opcional para entorno de producción)**: Si planeas desplegar la aplicación en un servidor Ubuntu, necesitarás acceso a uno. Puedes instalar Ubuntu en una máquina virtual para pruebas locales, o utilizar un servidor en la nube. Información sobre Ubuntu está disponible en [https://ubuntu.com/](https://ubuntu.com/).

7. **Nginx (opcional para entorno de producción)**: Si usarás Nginx como servidor web y proxy inverso, instálalo en tu servidor. Las instrucciones de instalación están disponibles en [http://nginx.org/en/docs/install.html](http://nginx.org/en/docs/install.html).
### Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu entorno local.

#### Clonar el Repositorio

Primero, clona el repositorio a tu máquina local usando Git:

```bash
git clone https://github.com/Diegoval-Dev/MK-Publicidad.git MKPublicidad
cd MKPublicidad
```
