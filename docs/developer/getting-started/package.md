---
sidebar_position: 20
---
# What is Steedos Package?

A Steedos Package stores custom objects and custom object translations in intuitive subdirectories. Source format makes it much easier to find what you want to change or update. And you can say goodbye to messy merges.

## Package Types: Managed vs. Unlocked

Steedos offers different packaging mechanisms that cater to various deployment strategies and business models. Two prominent types are Managed Packages and Unlocked Packages. Each serves unique purposes, especially concerning application lifecycle management, proprietary software distribution, and customization flexibility.

Managed and Unlocked Packages address diverse needs within the Steedos arena. Managed Packages suit developers distributing finalized, often commercial, applications to end-users. In contrast, Unlocked Packages are tailored for organizations seeking enhanced internal development processes, promoting agility, and customization in building Steedos solutions.

### Managed Packages

Managed Packages are primarily used by Steedos partners developing applications for distribution on the Steedos AppExchange. They're also used by developers who need to distribute their applications to multiple customers or instances.

- **Upgrade Path:** Facilitates updates (new versions) without necessitating a complete reinstall, preserving user data and customizations.
- **Code Encapsulation:** Contains proprietary logic within components, shielding it from the client organization and maintaining intellectual property confidentiality.
- **Restrictive Customization:** Post-installation, the core components and logic cannot be altered by the client, ensuring application consistency.

### Unlocked Packages (In Development)

Unlocked Packages, integral to the Steedos DX approach, cater to Steedos customers favoring a modular, source-driven development and deployment model devoid of commercial intent.

- **Editable Components:** Post-deployment, subscribers can freely modify package components, fostering an adaptable development environment.
- **Source-Driven Development:** Compatible with version control systems, enhancing team collaboration and trackability of changes.
- **Versioning and Dependency Management:** Simplifies internal version control and inter-package dependencies, streamlining the development process.

### Comparing Managed and Unlocked Packages

1. **Purpose:** Managed Packages target application distribution, often for commercial use, whereas Unlocked Packages optimize collaborative development efforts internally within organizations.
2. **Code Accessibility:** Managed Packages conceal proprietary code, while Unlocked Packages grant subscribers full code access, permitting extensive customization.
3. **Update Mechanism:** Both package types support versioning, but Managed Packages emphasize seamless upgrades for external users, contrasting with Unlocked Packages' focus on internal development fluidity.
