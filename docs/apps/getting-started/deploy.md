---
title: Self Hosting
---

Follow these steps to deploy Steedos Apps on Docker.

## Prerequisites

1. [Docker](https://docs.docker.com/get-docker/) (version 20.10.7 or later)
2. [Docker-Compose](https://docs.docker.com/compose/install/) (version 1.29.2 or later)
3. Steedos Enterprise License


## Install Steedos Apps

Create a folder named `steedos-apps` on your machine for deployment and data storage. Then, navigate to this folder using the `cd` command and follow the steps below:


1. Contact us to request a trial license key.

2. Create a new file `docker-compose.yml`

```bash
version: "3.9"

services:

  steedos-apps:
    image: steedos/steedos-apps
    ports:
      - "80:80"    
      - "443:443"  
      - "9001:9001"  
    environment:
      - ROOT_URL=http://127.0.0.1
      - STEEDOS_LICENSE=trial
    tty: true
    volumes:
      - "./storage:/steedos-storage"
```

This saves the file in the current directory.

3. Start the Docker container using the following command. You may need to run with `sudo` if you don't have permission to run `docker-compose`. 

```bash
docker-compose up -d
```

If the image doesn't exist locally, this command downloads the necessary Docker image and starts the container.

4. Open [http://localhost](http://localhost) and wait for the server to come up. This can take up to 5 minutes. Once the server is up and running, you can access Steedos at [http://localhost](http://localhost).

If you continue to face issues, reach out to [support@steedos.com](mailto:support@steedos.com).

## Further reading

* [Configure Steedos instance](/deploy/steedos-config)

