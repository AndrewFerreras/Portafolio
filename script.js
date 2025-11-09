// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".skill-bento-card, .project-showcase-card, .about-content")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  const skillLevelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-level-fill")
          if (fill) {
            const width = fill.style.width
            fill.style.width = "0%"
            setTimeout(() => {
              fill.style.width = width
            }, 200)
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".skill-level").forEach((el) => {
    skillLevelObserver.observe(el)
  })

  document.querySelectorAll(".project-showcase-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10"
    })

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1"
    })
  })

  document.querySelectorAll(".skill-bento-card").forEach((card, cardIndex) => {
    const tags = card.querySelectorAll(".skill-tag")
    tags.forEach((tag, tagIndex) => {
      tag.style.opacity = "0"
      tag.style.transform = "scale(0.8)"
      tag.style.transition = "all 0.3s ease"

      setTimeout(
        () => {
          tag.style.opacity = "1"
          tag.style.transform = "scale(1)"
        },
        cardIndex * 100 + tagIndex * 50,
      )
    })
  })

  initTechModal()
})

// Header shadow on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 10) {
    header.style.boxShadow = "var(--shadow-md)"
  } else {
    header.style.boxShadow = "none"
  }
})

function initTechModal() {
  const modal = document.getElementById("techModal")
  const modalOverlay = modal.querySelector(".tech-modal-overlay")
  const closeBtn = document.getElementById("closeModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalIcon = document.getElementById("modalIcon")
  const modalDescription = document.getElementById("modalDescription")
  const modalLevel = document.getElementById("modalLevel")
  const modalFeatures = document.getElementById("modalFeatures")

  // Base de datos de tecnologías con información detallada
  const techInfo = {
    "C#": {
      icon: "C#",
      description:
        "Lenguaje de programación moderno, orientado a objetos y con tipado fuerte desarrollado por Microsoft. Es mi herramienta principal para construir aplicaciones empresariales robustas y escalables.",
      level: 95,
      years: "2+",
      features: [
        "Desarrollo de aplicaciones web con ASP.NET Core",
        "Construcción de APIs RESTful de alto rendimiento",
        "Implementación de arquitecturas limpias y patrones SOLID",
        "Programación asíncrona avanzada con async/await",
        "Gestión de dependencias con inyección de dependencias",
      ],
    },
    ".NET 8": {
      icon: ".NET",
      description:
        "Framework multiplataforma de código abierto para construir aplicaciones modernas. Utilizo .NET 8 para desarrollar sistemas empresariales de alto rendimiento con las últimas características del ecosistema Microsoft.",
      level: 95,
      years: "2+",
      features: [
        "Desarrollo de APIs con minimal APIs y controladores",
        "Implementación de middlewares personalizados",
        "Configuración avanzada de servicios y dependency injection",
        "Optimización de rendimiento y memory management",
        "Integración con Entity Framework Core y Dapper",
      ],
    },
    "ASP.NET Core": {
      icon: "ASP",
      description:
        "Framework web de alto rendimiento para construir aplicaciones web modernas y APIs. Es mi elección principal para desarrollar servicios backend escalables y mantenibles.",
      level: 95,
      years: "2+",
      features: [
        "Creación de APIs RESTful con routing avanzado",
        "Implementación de autenticación y autorización",
        "Manejo de filtros, middlewares y action filters",
        "Validación de modelos y model binding",
        "Configuración de CORS y políticas de seguridad",
      ],
    },
    "RESTful APIs": {
      icon: "API",
      description:
        "Arquitectura de servicios web que utiliza HTTP para comunicación cliente-servidor. Diseño y construyo APIs RESTful siguiendo las mejores prácticas de la industria.",
      level: 92,
      years: "2+",
      features: [
        "Diseño de endpoints siguiendo convenciones REST",
        "Implementación de versionado de APIs",
        "Documentación con Swagger/OpenAPI",
        "Manejo de códigos de estado HTTP apropiados",
        "Implementación de HATEOAS cuando es necesario",
      ],
    },
    Microservicios: {
      icon: "μS",
      description:
        "Arquitectura de software que estructura una aplicación como colección de servicios independientes. He diseñado e implementado sistemas basados en microservicios para mejorar la escalabilidad.",
      level: 85,
      years: "1+",
      features: [
        "Diseño de servicios desacoplados y autónomos",
        "Implementación de comunicación inter-servicios",
        "Gestión de bases de datos distribuidas",
        "Configuración de API Gateways",
        "Implementación de patrones de resiliencia",
      ],
    },
    "Entity Framework": {
      icon: "EF",
      description:
        "ORM moderno para .NET que simplifica el acceso a datos. Lo utilizo para implementar patrones Repository y Unit of Work en aplicaciones empresariales.",
      level: 90,
      years: "2+",
      features: [
        "Code-first y database-first migrations",
        "Consultas LINQ avanzadas y optimizadas",
        "Configuración de relaciones y restricciones",
        "Implementación de soft deletes y auditoría",
        "Optimización de consultas con Include y AsNoTracking",
      ],
    },
    LINQ: {
      icon: "LQ",
      description:
        "Language Integrated Query permite escribir consultas de manera declarativa en C#. Lo uso extensivamente para manipular colecciones y consultar datos de manera elegante.",
      level: 92,
      years: "2+",
      features: [
        "Consultas complejas con Where, Select, GroupBy",
        "Agregaciones y operaciones de conjunto",
        "Joins y navegación de relaciones",
        "Proyecciones y transformaciones de datos",
        "Optimización de consultas para mejor rendimiento",
      ],
    },
    Dapper: {
      icon: "DP",
      description:
        "Micro ORM de alto rendimiento que mapea directamente SQL a objetos. Lo prefiero para consultas complejas donde necesito control total sobre el SQL generado.",
      level: 88,
      years: "1+",
      features: [
        "Consultas SQL parametrizadas y seguras",
        "Mapeo automático a objetos y DTOs",
        "Ejecución de stored procedures",
        "Queries con múltiples resultados",
        "Operaciones batch de alto rendimiento",
      ],
    },
    "SQL Server": {
      icon: "SQL",
      description:
        "Sistema de gestión de bases de datos relacional de Microsoft. Es mi base de datos principal para aplicaciones empresariales, donde implemento schemas complejos y optimizaciones.",
      level: 90,
      years: "2+",
      features: [
        "Diseño de esquemas normalizados y eficientes",
        "Creación de stored procedures y funciones",
        "Optimización de queries con índices y estadísticas",
        "Implementación de transacciones y locks",
        "Configuración de backups y disaster recovery",
      ],
    },
    MongoDB: {
      icon: "MDB",
      description:
        "Base de datos NoSQL orientada a documentos que ofrece flexibilidad y escalabilidad. La utilizo para aplicaciones que requieren esquemas dinámicos y alta velocidad de escritura.",
      level: 85,
      years: "1+",
      features: [
        "Modelado de documentos y colecciones",
        "Consultas avanzadas con aggregation pipeline",
        "Implementación de índices para optimización",
        "Operaciones CRUD de alto rendimiento",
        "Replicación y sharding para escalabilidad",
      ],
    },
    MySQL: {
      icon: "MY",
      description:
        "Sistema de gestión de bases de datos relacional open-source. Lo he utilizado en diversos proyectos por su confiabilidad y comunidad activa.",
      level: 82,
      years: "1+",
      features: [
        "Diseño de bases de datos relacionales",
        "Optimización de queries con EXPLAIN",
        "Configuración de replicación master-slave",
        "Implementación de triggers y stored procedures",
        "Gestión de usuarios y permisos",
      ],
    },
    PostgreSQL: {
      icon: "PG",
      description:
        "Sistema de base de datos relacional avanzado con características enterprise. Aprecio sus capacidades avanzadas como tipos de datos personalizados y funciones window.",
      level: 80,
      years: "1+",
      features: [
        "Uso de tipos de datos avanzados (JSON, Arrays)",
        "Funciones window y CTEs complejas",
        "Implementación de full-text search",
        "Configuración de extensiones como PostGIS",
        "Gestión de transacciones ACID",
      ],
    },
    Redis: {
      icon: "RD",
      description:
        "Almacén de estructuras de datos en memoria usado como cache, message broker y base de datos. Lo implemento para mejorar significativamente el rendimiento de aplicaciones.",
      level: 80,
      years: "1+",
      features: [
        "Implementación de cache distribuido",
        "Uso de estructuras de datos (Lists, Sets, Hashes)",
        "Configuración de pub/sub para mensajería",
        "Gestión de sesiones y tokens",
        "Implementación de rate limiting",
      ],
    },
    Elasticsearch: {
      icon: "ES",
      description:
        "Motor de búsqueda y análisis distribuido. Lo utilizo para implementar búsquedas de texto completo y análisis de logs en tiempo real.",
      level: 75,
      years: "1+",
      features: [
        "Indexación de documentos para búsqueda rápida",
        "Queries de búsqueda full-text avanzadas",
        "Agregaciones para análisis de datos",
        "Configuración de analyzers personalizados",
        "Integración con sistemas de logging",
      ],
    },
    HTML5: {
      icon: "H5",
      description:
        "Lenguaje de marcado estándar para estructurar contenido web. Utilizo HTML5 semántico para crear interfaces accesibles y bien estructuradas.",
      level: 90,
      years: "2+",
      features: [
        "Markup semántico con tags apropiados",
        "Formularios avanzados con validación nativa",
        "APIs modernas (Geolocation, LocalStorage, etc)",
        "Accesibilidad con ARIA attributes",
        "Estructura responsive y mobile-first",
      ],
    },
    CSS3: {
      icon: "CSS",
      description:
        "Lenguaje de estilos para diseñar interfaces web modernas. Domino CSS3 para crear layouts responsivos y animaciones fluidas.",
      level: 88,
      years: "2+",
      features: [
        "Layouts con Flexbox y CSS Grid",
        "Animaciones y transiciones suaves",
        "Variables CSS y custom properties",
        "Media queries para diseño responsive",
        "Metodologías como BEM para organización",
      ],
    },
    JavaScript: {
      icon: "JS",
      description:
        "Lenguaje de programación esencial para desarrollo web. Lo uso para crear interfaces interactivas y lógica client-side robusta.",
      level: 85,
      years: "2+",
      features: [
        "Manipulación del DOM y eventos",
        "Programación asíncrona con Promises y async/await",
        "Trabajo con APIs REST mediante Fetch",
        "ES6+ features (arrow functions, destructuring, etc)",
        "Manejo de estado y eventos en aplicaciones",
      ],
    },
    React: {
      icon: "⚛",
      description:
        "Biblioteca de JavaScript para construir interfaces de usuario. La utilizo para desarrollar SPAs modernas y componentes reutilizables.",
      level: 80,
      years: "1+",
      features: [
        "Componentes funcionales con Hooks",
        "Gestión de estado con useState y useContext",
        "Side effects con useEffect",
        "Optimización de rendimiento con useMemo",
        "Integración con APIs backend",
      ],
    },
    "Razor Pages": {
      icon: "RZ",
      description:
        "Framework de páginas web basado en ASP.NET Core. Lo uso para crear aplicaciones web tradicionales con rendering server-side.",
      level: 85,
      years: "2+",
      features: [
        "Páginas con modelo PageModel pattern",
        "Tag Helpers para markup limpio",
        "Model binding y validación",
        "Partial views y view components",
        "Integración con Identity para autenticación",
      ],
    },
    Bootstrap: {
      icon: "BS",
      description:
        "Framework CSS para desarrollo frontend responsive. Lo utilizo para prototipar rápidamente y crear interfaces consistentes.",
      level: 85,
      years: "2+",
      features: [
        "Grid system responsive",
        "Componentes pre-diseñados personalizables",
        "Utilities para spacing y layout",
        "JavaScript components (modals, tooltips, etc)",
        "Customización con variables Sass",
      ],
    },
    "Tailwind CSS": {
      icon: "TW",
      description:
        "Framework CSS utility-first para diseño rápido y customizable. Mi elección preferida para proyectos modernos por su flexibilidad.",
      level: 82,
      years: "1+",
      features: [
        "Diseño con utility classes",
        "Customización con archivo de configuración",
        "Responsive design con prefijos",
        "Dark mode implementation",
        "Optimización con PurgeCSS",
      ],
    },
    Docker: {
      icon: "🐋",
      description:
        "Plataforma de contenedores para empaquetar aplicaciones. Lo uso para crear entornos consistentes y facilitar el deployment.",
      level: 85,
      years: "1+",
      features: [
        "Creación de Dockerfiles optimizados",
        "Docker Compose para multi-container apps",
        "Gestión de volúmenes y networks",
        "Optimización de imágenes y layers",
        "Integration con CI/CD pipelines",
      ],
    },
    Azure: {
      icon: "AZ",
      description:
        "Plataforma cloud de Microsoft con servicios completos. La utilizo para hospedar aplicaciones y aprovechar servicios PaaS.",
      level: 80,
      years: "1+",
      features: [
        "Deployment de App Services y Functions",
        "Configuración de Azure SQL y Storage",
        "Implementación de Azure DevOps pipelines",
        "Gestión de identidades con Azure AD",
        "Monitoring con Application Insights",
      ],
    },
    AWS: {
      icon: "AWS",
      description:
        "Plataforma cloud líder con amplio ecosistema de servicios. He trabajado con servicios core para hospedar y escalar aplicaciones.",
      level: 75,
      years: "1+",
      features: [
        "EC2 para hosting de aplicaciones",
        "S3 para almacenamiento de archivos",
        "RDS para bases de datos managed",
        "Lambda para funciones serverless",
        "CloudWatch para monitoring y logs",
      ],
    },
    "CI/CD": {
      icon: "CI",
      description:
        "Prácticas de integración y deployment continuo. Implemento pipelines automatizados para garantizar entregas rápidas y confiables.",
      level: 82,
      years: "1+",
      features: [
        "Configuración de pipelines en Azure DevOps",
        "Automated testing en builds",
        "Deployment automatizado a múltiples environments",
        "Gestión de variables y secrets",
        "Rollback strategies y blue-green deployments",
      ],
    },
    Kubernetes: {
      icon: "K8s",
      description:
        "Sistema de orquestación de contenedores para automatizar deployment y scaling. Lo uso en proyectos que requieren alta disponibilidad.",
      level: 70,
      years: "1+",
      features: [
        "Configuración de deployments y services",
        "Gestión de pods y replicas",
        "ConfigMaps y Secrets management",
        "Ingress controllers para routing",
        "Health checks y auto-scaling",
      ],
    },
    Git: {
      icon: "GIT",
      description:
        "Sistema de control de versiones distribuido. Es mi herramienta diaria para gestionar código y colaborar en equipo.",
      level: 92,
      years: "2+",
      features: [
        "Branching strategies (GitFlow, trunk-based)",
        "Resolución de conflictos y merges",
        "Commits semánticos y bien documentados",
        "Uso de tags y releases",
        "Git hooks para automation",
      ],
    },
    "Visual Studio": {
      icon: "VS",
      description:
        "IDE completo de Microsoft para desarrollo .NET. Mi herramienta principal para desarrollo backend con características avanzadas de debugging.",
      level: 90,
      years: "2+",
      features: [
        "Debugging avanzado con breakpoints condicionales",
        "Refactoring tools y code analysis",
        "Gestión de NuGet packages",
        "Integración con Git y Azure DevOps",
        "Extensiones para productividad",
      ],
    },
    "VS Code": {
      icon: "VSC",
      description:
        "Editor de código ligero y extensible. Lo uso para desarrollo frontend y scripts, aprovechando su ecosistema de extensiones.",
      level: 88,
      years: "2+",
      features: [
        "Configuración con extensiones especializadas",
        "Terminal integrado para comandos",
        "Debugging de JavaScript y TypeScript",
        "Git integration nativa",
        "Snippets y shortcuts personalizados",
      ],
    },
    Postman: {
      icon: "PM",
      description:
        "Plataforma para testing de APIs. La uso diariamente para probar endpoints y documentar APIs durante el desarrollo.",
      level: 90,
      years: "2+",
      features: [
        "Testing de endpoints REST y SOAP",
        "Creación de collections organizadas",
        "Variables de entorno para múltiples ambientes",
        "Scripts pre-request y tests automatizados",
        "Generación de documentación de APIs",
      ],
    },
    Swagger: {
      icon: "SW",
      description:
        "Herramienta para documentar y probar APIs RESTful. Implemento Swagger en todos mis proyectos para facilitar la integración.",
      level: 88,
      years: "2+",
      features: [
        "Generación automática de documentación",
        "Interfaz interactiva para probar endpoints",
        "Annotations para enriquecer documentación",
        "Generación de clientes desde spec",
        "Versionado de especificaciones OpenAPI",
      ],
    },
    JIRA: {
      icon: "JR",
      description:
        "Herramienta de gestión de proyectos y tracking de issues. La uso para planificar sprints y seguir el progreso de tareas.",
      level: 85,
      years: "2+",
      features: [
        "Creación y gestión de user stories",
        "Planning de sprints ágiles",
        "Tracking de bugs y issues",
        "Configuración de workflows personalizados",
        "Reporting y dashboards de progreso",
      ],
    },
    "REST APIs": {
      icon: "API",
      description:
        "Interfaces de programación de aplicaciones basadas en REST. Diseño APIs siguiendo principios REST para comunicación eficiente.",
      level: 92,
      years: "2+",
      features: [
        "Diseño de recursos y URIs semánticos",
        "Implementación de métodos HTTP apropiados",
        "Versionado de APIs estratégico",
        "Manejo de errores consistente",
        "Documentación con OpenAPI/Swagger",
      ],
    },
    SOAP: {
      icon: "SP",
      description:
        "Protocolo de comunicación basado en XML para web services. Lo he utilizado en integraciones con sistemas legacy empresariales.",
      level: 75,
      years: "1+",
      features: [
        "Consumo de web services SOAP",
        "Manejo de WSDL y XML schemas",
        "Implementación de servicios SOAP",
        "WS-Security para autenticación",
        "Interoperabilidad con sistemas legacy",
      ],
    },
    GraphQL: {
      icon: "GQL",
      description:
        "Lenguaje de consulta para APIs que permite a los clientes solicitar exactamente los datos que necesitan. Lo uso para APIs modernas y flexibles.",
      level: 75,
      years: "1+",
      features: [
        "Definición de schemas y types",
        "Resolvers para queries y mutations",
        "Subscriptions para datos en tiempo real",
        "DataLoader para optimización",
        "Integración con clientes Apollo/Relay",
      ],
    },
    SignalR: {
      icon: "SR",
      description:
        "Biblioteca para agregar funcionalidad en tiempo real a aplicaciones web. La implemento para features como chat y notificaciones live.",
      level: 82,
      years: "1+",
      features: [
        "Implementación de hubs para comunicación",
        "Broadcasting de mensajes a grupos",
        "Manejo de conexiones y reconexión",
        "Integración con autenticación",
        "Scaling con backplanes (Redis, Azure)",
      ],
    },
    gRPC: {
      icon: "gR",
      description:
        "Framework RPC de alto rendimiento desarrollado por Google. Lo uso para comunicación entre microservicios donde el performance es crítico.",
      level: 70,
      years: "1+",
      features: [
        "Definición de servicios con Protocol Buffers",
        "Implementación de servicios unary y streaming",
        "Comunicación bidireccional eficiente",
        "Autenticación y seguridad con TLS",
        "Interceptors para cross-cutting concerns",
      ],
    },
    WebSockets: {
      icon: "WS",
      description:
        "Protocolo para comunicación bidireccional en tiempo real. Lo implemento cuando necesito intercambio de datos de baja latencia.",
      level: 80,
      years: "1+",
      features: [
        "Implementación de conexiones persistentes",
        "Manejo de eventos y mensajes",
        "Broadcasting y rooms",
        "Autenticación de conexiones",
        "Fallback strategies para compatibilidad",
      ],
    },
    xUnit: {
      icon: "xU",
      description:
        "Framework de testing unitario para .NET. Es mi elección principal para escribir tests por su simplicidad y extensibilidad.",
      level: 85,
      years: "2+",
      features: [
        "Tests unitarios con [Fact] y [Theory]",
        "Parametrización de tests con [InlineData]",
        "Fixtures para setup compartido",
        "Aserciones con FluentAssertions",
        "Integración con coverage tools",
      ],
    },
    NUnit: {
      icon: "NU",
      description:
        "Framework de testing maduro para .NET. Lo he utilizado en proyectos legacy y aprecio sus features avanzadas de parametrización.",
      level: 82,
      years: "1+",
      features: [
        "Tests con [Test] y [TestCase]",
        "SetUp y TearDown para inicialización",
        "TestFixtures parametrizados",
        "Constraints para aserciones expresivas",
        "Parallel test execution",
      ],
    },
    Moq: {
      icon: "MQ",
      description:
        "Biblioteca de mocking para .NET. La uso extensivamente para crear mocks y aislar dependencies en unit tests.",
      level: 88,
      years: "2+",
      features: [
        "Creación de mocks con Mock<T>",
        "Setup de comportamientos esperados",
        "Verificación de invocaciones",
        "Mocking de properties y events",
        "Callbacks para lógica de test avanzada",
      ],
    },
    "Integration Tests": {
      icon: "IT",
      description:
        "Tests que verifican la interacción entre componentes. Los implemento para asegurar que los módulos funcionen correctamente juntos.",
      level: 82,
      years: "1+",
      features: [
        "Tests con WebApplicationFactory",
        "Configuración de bases de datos de test",
        "Testing de APIs end-to-end",
        "Uso de TestContainers para dependencias",
        "Verificación de flujos completos",
      ],
    },
    "Unit Testing": {
      icon: "UT",
      description:
        "Práctica de testing de unidades individuales de código. Escribo tests unitarios para garantizar calidad y facilitar refactoring.",
      level: 88,
      years: "2+",
      features: [
        "Tests de métodos y funciones aisladas",
        "Uso de mocks para dependencies",
        "Cobertura de casos edge y errores",
        "Tests rápidos y determinísticos",
        "Red-Green-Refactor cycle",
      ],
    },
    TDD: {
      icon: "TD",
      description:
        "Desarrollo guiado por tests donde los tests se escriben primero. Aplico TDD para diseñar APIs más limpias y mantenibles.",
      level: 80,
      years: "1+",
      features: [
        "Escribir test antes de implementación",
        "Refactoring continuo con red-green cycle",
        "Diseño emergente desde los tests",
        "Alta cobertura de código naturalmente",
        "Código más desacoplado y testeable",
      ],
    },
    "Clean Architecture": {
      icon: "CA",
      description:
        "Arquitectura que separa concerns en capas independientes. La aplico para crear sistemas mantenibles y testeables.",
      level: 90,
      years: "2+",
      features: [
        "Separación en capas (Domain, Application, Infrastructure)",
        "Dependency Rule hacia el centro",
        "Entities y Use Cases en el core",
        "Independencia de frameworks y UI",
        "Testabilidad y flexibilidad maximizada",
      ],
    },
    SOLID: {
      icon: "SO",
      description:
        "Principios de diseño orientado a objetos. Los aplico religiosamente para escribir código mantenible y extensible.",
      level: 92,
      years: "2+",
      features: [
        "Single Responsibility Principle en clases",
        "Open/Closed con extensibilidad",
        "Liskov Substitution en herencia",
        "Interface Segregation para contratos específicos",
        "Dependency Inversion con abstracciones",
      ],
    },
    DDD: {
      icon: "DD",
      description:
        "Domain-Driven Design enfoca el diseño en el dominio del negocio. Lo uso en proyectos complejos para modelar lógica empresarial.",
      level: 85,
      years: "1+",
      features: [
        "Modelado con Entities y Value Objects",
        "Aggregates para consistencia transaccional",
        "Repository pattern para persistencia",
        "Domain Events para desacoplamiento",
        "Ubiquitous Language con el negocio",
      ],
    },
    MVC: {
      icon: "MV",
      description:
        "Patrón arquitectónico que separa Model, View y Controller. Lo implemento en aplicaciones web tradicionales con ASP.NET.",
      level: 90,
      years: "2+",
      features: [
        "Separación clara de responsabilidades",
        "Controllers para lógica de presentación",
        "Models para datos y validación",
        "Views con Razor syntax",
        "Routing y filtros personalizados",
      ],
    },
    CQRS: {
      icon: "CQ",
      description:
        "Patrón que separa operaciones de lectura y escritura. Lo implemento cuando necesito optimizar reads y writes independientemente.",
      level: 80,
      years: "1+",
      features: [
        "Commands para operaciones de escritura",
        "Queries para operaciones de lectura",
        "Modelos separados para read/write",
        "Event Sourcing complementario",
        "Escalabilidad independiente",
      ],
    },
    "Repository Pattern": {
      icon: "RP",
      description:
        "Patrón que abstrae el acceso a datos. Lo uso para desacoplar la lógica de negocio de la persistencia.",
      level: 90,
      years: "2+",
      features: [
        "Interfaces de repositorio genéricas",
        "Implementaciones específicas por tecnología",
        "Unit of Work para transacciones",
        "Specifications pattern para queries",
        "Testabilidad con repositorios mock",
      ],
    },
    "Dependency Injection": {
      icon: "DI",
      description:
        "Patrón para invertir el control de dependencias. Lo uso en todos mis proyectos para lograr código desacoplado y testeable.",
      level: 92,
      years: "2+",
      features: [
        "Configuración de servicios en startup",
        "Lifetimes (Transient, Scoped, Singleton)",
        "Constructor injection predominante",
        "Factory patterns cuando es necesario",
        "Testing con dependencies mockeadas",
      ],
    },
    "Event-Driven": {
      icon: "ED",
      description:
        "Arquitectura basada en producción y consumo de eventos. La implemento para sistemas desacoplados y reactivos.",
      level: 80,
      years: "1+",
      features: [
        "Domain Events para comunicación interna",
        "Event Bus para distribución de eventos",
        "Event Sourcing para auditoría completa",
        "Eventual consistency en sistemas distribuidos",
        "Message brokers (RabbitMQ, Azure Service Bus)",
      ],
    },
    Java: {
    icon: "☕",
    description:
      "Lenguaje de programación orientado a objetos ampliamente utilizado en entornos empresariales. Su máquina virtual (JVM) permite desarrollar aplicaciones portables, seguras y con alta performance.",
    level: 90,
    years: "2+",
    features: [
      "Programación orientada a objetos con clases y interfaces",
      "Manejo de hilos y concurrencia avanzada",
      "Uso de Streams y programación funcional",
      "Gestión de memoria y Garbage Collector",
      "Amplio ecosistema de librerías y frameworks",
    ],
  },

  "Spring Boot": {
    icon: "SB",
    description:
      "Framework para la creación de aplicaciones en Java con configuración mínima. Lo utilizo para desarrollar servicios backend robustos, escalables y bien estructurados siguiendo las mejores prácticas.",
    level: 88,
    years: "2+",
    features: [
      "Creación de APIs REST con Spring Web",
      "Inyección de dependencias con Spring IoC",
      "Acceso a datos con Spring Data JPA",
      "Gestión de configuración y perfiles de ambiente",
      "Documentación automática con SpringDoc / Swagger",
    ],
  },
  }

  // Agregar click listeners a todos los tags de tecnología
  const techTags = document.querySelectorAll(".skill-tag")

  techTags.forEach((tag) => {
    // Hacer los tags clickeables
    tag.style.cursor = "pointer"

    tag.addEventListener("click", () => {
      const techName = tag.textContent.trim()
      const tech = techInfo[techName]

      if (tech) {
        showModal(techName, tech)
      }
    })
  })

  // Función para mostrar el modal
  function showModal(name, tech) {
    modalTitle.textContent = name
    modalIcon.textContent = tech.icon
    modalDescription.textContent = tech.description
    modalLevel.style.width = tech.level + "%"

    // Limpiar y llenar la lista de features
    modalFeatures.innerHTML = ""
    tech.features.forEach((feature) => {
      const li = document.createElement("li")
      li.textContent = feature
      modalFeatures.appendChild(li)
    })

    // Mostrar modal con animación
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  // Función para cerrar el modal
  function closeModal() {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Event listeners para cerrar el modal
  closeBtn.addEventListener("click", closeModal)
  modalOverlay.addEventListener("click", closeModal)

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal()
    }
  })
}
