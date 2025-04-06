# Automatización de Pruebas de Carga y Rendimiento con k6, Prometheus y Grafana

## 1. Introducción

La automatización de pruebas de carga y rendimiento es fundamental para evaluar la eficiencia y capacidad de respuesta de aplicaciones web o APIs. En esta práctica, se utilizó k6 como herramienta principal para realizar pruebas de carga automatizadas, en combinación con Prometheus para la recopilación de métricas y Grafana para la visualización gráfica de los resultados.

El objetivo fue simular múltiples usuarios concurrentes accediendo a una aplicación web hospedada en [https://loupaws.pythonanywhere.com/](https://loupaws.pythonanywhere.com/), evaluando el comportamiento del sistema bajo carga, validando respuestas HTTP y generando métricas de rendimiento para su posterior análisis.

## 2. Requisitos Previos y Configuración del Entorno

### 2.1. Herramientas necesarias

1. **k6** – Herramienta principal de pruebas de carga.  
   Sitio oficial: [https://k6.io](https://k6.io)

2. **Prometheus** – Para recolectar métricas expuestas por k6.  
   Sitio oficial: [https://prometheus.io/](https://prometheus.io/)

3. **Grafana** – Para visualizar dichas métricas de forma gráfica.  
   Sitio oficial: [https://grafana.com/](https://grafana.com/)

### 2.2. Pasos de instalación

Existen diversos métodos para la instalación de estas herramientas, tanto como un ejecutable (En el caso de k6 y Prometheus), como instalarlos o usar un script en tu sistema.

**Métodos utilizados en este documento:**

#### 1. Instalar k6:
- Si usas el gestor de paquetes **Chocolatey** puedes instalar el paquete no oficial k6 con:
  ```bash
  choco install k6

- Si usas el Administrador de Paquetes de Windows (Método usado):
  ```bash
   winget install k6 --source winget

#### 2. Descargar y configurar Prometheus:

- Descargar desde: https://prometheus.io/download/
- Configurar el archivo prometheus.yml:
    ```bash
   global:
     scrape_interval: 1s  # Frecuencia de recolección de métricas

   scrape_configs:
     - job_name: 'k6'  # Nombre del trabajo para las métricas de k6
       static_configs:
         - targets: ['localhost:6000']  # Reemplazar con el endpoint de métricas de k6 si es necesario

   remote_write:
     - url: "http://localhost:9090/api/v1/write"  # Endpoint remoto de Prometheus

#### 3. Instalar Grafana:

- Descargar desde: [https://grafana.com/grafana/download](https://grafana.com/grafana/download)
- De ser necesario, iniciarlo con:
    ```bash
   grafana-server
- Acceder a Grafana en: http://localhost:3000
  Usuario: admin, Contraseña: admin




