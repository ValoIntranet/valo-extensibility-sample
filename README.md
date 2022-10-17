# Valo Extensibility Framework Sample

This is a sample of how you can use the Valo Extensibility Framework [@valo/extensibility](https://www.npmjs.com/package/@valo/extensibility).

## Documentation

Documentation about the framework can be found here: [Modern Valo Extensibility Documentation](https://valomoderndocumentation.azurewebsites.net/intranet/extend/extensibility/).


## Adding this sample to your site

Once the solution is deployed on your tenant, you can add it manually like this (uses the Office 365 CLI):

```
o365 spo customaction add -t "custom-valo-ui-extensions" -c 7d190fa2-c4ae-42b2-8537-431bf7bb8b41 -u https://<your-site-URL> -l "ClientSideExtension.ApplicationCustomizer" -n "custom-valo-ui-extension"
```
Or:
```
m365 spo customaction add --name 'ValoCustomToolboxAction' --title "custom-valo-ui-extensions" --location "ClientSideExtension.ApplicationCustomizer" --clientSideComponentId 7d190fa2-c4ae-42b2-8537-431bf7bb8b41 --clientSideComponentProperties '{}' --url "https://<your-site-URL>"
```
