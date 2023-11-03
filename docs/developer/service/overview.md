---
sidebar_label: Overview
sidebar_position: 10
---

# Overview of Steedos Microservices Architecture

In traditional monolithic applications, all functionalities and components are bundled into one large application. Over time, such an application can become extremely large and intricate, making maintenance, scaling, and deployment challenging. Microservices architecture tackles these challenges by breaking down large applications into small, independent, and interoperable services.

Steedos embraces the philosophy of microservices and builds its platform upon this foundation. This means that each function or module of Steedos, such as authentication, database access, UI rendering, etc., is implemented as a separate microservice.

### Packages as Microservices

Within the Steedos platform, each package operates as a microservice. This design comes with several advantages:

1. **Modularity & Reusability**: As each package functions as an independent microservice, it can be developed, tested, deployed, and updated separately. This also implies that if you need the same functionality in different Steedos projects, you can easily reuse this microservice.

2. **Scalability**: Since every package is an individual microservice, if a particular service needs to be scaled to meet higher performance demands, you can expand just that specific service, instead of the entire application.

3. **Fault Tolerance**: The microservices structure ensures that a failure in one service doesn't impact the entire system. If one service fails, other services can still operate normally.

4. **Rapid Iteration & Deployment**: Each microservice can be deployed independently of others. This means teams can quickly iterate on a single service without waiting for the entire application's deployment.

Leveraging the strengths of the Moleculer microservices framework, the Steedos platform provides developers and businesses with a flexible, scalable, and efficient development environment. With each package serving as a microservice, the system ensures modularity, maintainability, and high availability.
