# Package Installation

The Steedos platform can extend its capabilities by installing additional packages. Below is the process for installing Steedos packages from npm repositories or private repositories.

## Installation Steps

### Step 1: Obtain the Package Name and Version

You should get the exact name and version of the package from the software developer.

For instance, if you need to install the [contract management sample](https://github.com/steedos-labs/contract), you would enter the following name:

```bash
@steedos-labs/contract-ce
```

If this package is publicly released to the npm repository, you can usually find it on [npmjs.com](https://npmjs.com).

If you need to install a specific version, you can add the version number. If no version number is specified, the latest version will be installed automatically.

```bash
@steedos-labs/contract-ce@0.0.2
```

### Step 2: Log in to the Steedos Platform

1. Open your browser and navigate to the Steedos login page.
2. Log in to your Steedos platform using your username and password.

:::tip
You must first deploy a set of Steedos platforms before you can install and run Steedos packages.
:::

### Step 3: Package Installation

1. Go to the Settings - Packages page, click the `Install` button.
2. Paste the package name and version you obtained earlier and start the installation.
3. Following npm specifications, the system will install the current package along with all dependent packages. The installation process may take some time, depending on the size and complexity of the package.
4. After installation, Steedos will display a confirmation message and may provide additional steps or instructions.

:::tip
If installing a private package, you need to configure `authentication information` first.
:::

### Step 7: Enable the Package

1. After the package installation is complete, it is enabled by default.
2. Clicking the `Enable` button will enable this package, and this operation will also enable all dependent packages.

### Step 8: Verify the Installation

1. In the Steedos package list, ensure the new package is listed and enabled.
2. Test the package functions to ensure they work as expected and comply with your organization's security and compliance requirements.

### Step 9: Notify Team Members

1. If the installed package affects other team members, please inform them about the use of the new tools.
2. Provide necessary training or documentation to help users understand how to use new features.

### Step 10: Get Support (if needed)

- If you encounter any issues during the installation, or find any during subsequent verification, you may need to contact the package vendor or developers for support.
- Likewise, the Steedos community and help documentation are valuable resources for resolving common issues.

Installing packages is a great way to expand Steedos functionalities, but it is crucial to ensure that what you are installing meets the needs and standards of your organization. Always proceed with caution and be involved throughout the installation process to ensure the best outcomes.

## Private Packages

For npm private packages or packages in private repositories, you should obtain authentication information from the software developer and configure it in the Steedos platform. Authentication information is used to configure the `.npmrc` file in the package installation environment.

### Configuring npm Private Packages

```plaintext
@NAMESPACE:registry=https://registry.npmjs.org/:_authToken=YOUR_AUTH_TOKEN
```

- Please replace `YOUR_AUTH_TOKEN` with your actual authentication token.
- Replace `NAMESPACE` with the name of the user or organization account to which the package will be scoped.

### Configuration for Installation from Github Repositories

```plaintext
@NAMESPACE:registry=https://npm.pkg.github.com
```

- Replace `NAMESPACE` with the name of the user or organization account to which the package will be scoped.
