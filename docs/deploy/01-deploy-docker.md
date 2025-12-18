
# 5-Minute Quick Start (Docker)

:::info Learning Objectives

* No need for complex installation commands.
* Understand what **Docker** is (just think of it as an "App Player").
* Successfully launch a brand-new Steedos system on your own computer.
:::

## Why Use Docker?

Installing Steedos the traditional way requires setting up a database (MongoDB), a caching service (Redis), and the runtime environment (Node.js), followed by complex network configurations. For beginners, this can be overwhelming.

**Docker** acts like an **"App Player."** The Steedos team has already packaged all the necessary software and configurations into an **"Image"** (think of it as a pre-loaded DVD). You simply install Docker, "insert the disc," and the system runs automatically.

---

## Preparation

### 1. Install Docker Desktop

Go to the official Docker website to download and install **Docker Desktop** for your operating system (Windows or Mac).

* [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
* After installation, launch Docker Desktop and ensure the status icon in the bottom-left corner is green (showing "Engine running").

### 2. Create a Project Folder

On your desktop (or any preferred location), create a new folder named `my-steedos-app`.

---

## Launch Your First System

### Step 1: Create the Configuration File

Open your `my-steedos-app` folder. Create a new text file and name it **`docker-compose.yml`** (ensure the extension is `.yml`, not `.txt`).

Open it with Notepad (or VS Code), copy and paste the following content:

```yaml
version: "3"

services:
  steedos:
    image: steedos/steedos-community:3.0
    restart: always
    ports:
      - "5100:80"
    environment:
      - ROOT_URL=http://localhost:5100
    volumes:
      - "./steedos-storage:/steedos-storage"

```

:::tip What does this code do?
It tells Docker: "Please start the Steedos main program and make the system accessible via port 5100."
:::

### Step 2: One-Click Startup

1. Open your **Terminal** (Mac/Linux) or **PowerShell** (Windows).
2. Type `cd ` (with a space), drag your `my-steedos-app` folder into the window, and press Enter to enter the directory.
3. Type the following "magic command" and press Enter:

```bash
docker-compose up -d

```

Docker will automatically begin downloading the required images (this may take a few minutes the first time depending on your internet speed). When you see green `Done` or `Started` messages, your system is up!

### Step 3: Access the System

1. Open your browser (Chrome is recommended).
2. Enter the following in the address bar: `http://localhost:5100`
3. Wait a moment (the first launch may take 30–60 seconds to initialize data).
4. You will see the **Steedos Welcome/Registration page**.

🎉 **Congratulations! You now have your own low-code platform running.**

---

## Common Operations

### How to Stop the System?

In your terminal, type:

```bash
docker-compose down

```

### How to View Logs?

If the system isn't opening, you can check the logs to find the reason:

```bash
docker-compose logs -f

```

### Where is My Data?

Don't worry about losing data when Docker is removed. Look inside your `my-steedos-app` folder; you should see a new directory:

* `steedos-storage`: This folder stores your uploaded images and attachments.
As long as you keep this folder, your data is safe.

---

## FAQ

**Q: I get the error "Bind for 0.0.0.0:5100 failed: port is already allocated" during startup.**
A: This means port `5100` on your computer is already being used by another application.

* **Solution**: Edit your `docker-compose.yml` file. Change `ports: - "5100:80"` to `"8080:80"`. Save the file, run the startup command again, and access the system via `http://localhost:8080`.

**Q: The browser keeps loading/spinning and won't open.**
A: During the first launch, Steedos generates a large amount of base metadata in the background. Please wait a minute and refresh the page. If it still doesn't work after 1 minute, check your Docker Desktop settings to ensure it has enough memory (we recommend at least 4GB).
