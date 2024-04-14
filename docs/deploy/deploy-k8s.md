---
sidebar_label: Kubernetes
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Steedos Docker Deployment Guide

This document will guide you on how to deploy the Steedos platform on your server using Docker.

## Prerequisites

Before you begin, ensure that your system meets the following requirements:

1. Ubuntu 22.04
2. [AWS CLI](https://docs.amazonaws.cn/cli/latest/userguide/getting-started-install.html)
3. [kubectl](https://docs.amazonaws.cn/eks/latest/userguide/install-kubectl.html) (Kubernetes 1.23)
4. Ensure that server ports (such as 80, 443) are open for external access
5. If deploying Steedos Enterprise Edition, you need to obtain a license first


Ensure you back up your data before updating.

## Further Reading

* [Configuring Steedos Instances](/deploy/steedos-config)