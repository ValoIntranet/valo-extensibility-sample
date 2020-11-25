

```typescript
this.extensionService.registerExtension({
  id: "ToolboxPanelCreationAction3",
  location: IntranetLocation.ToolboxPanelCreationAction,
  element: [
    {
      title: "Generic list",
      icon: "List",
      description: "Create a generic list item",
      onClick: async () => {
        const trigger = await this.triggerService.registerTrigger(IntranetTrigger.GenericPanel);
        if (trigger) {
          trigger.invokeTrigger({
            siteUrl: ctx.pageContext.site.absoluteUrl,
            webUrl: ctx.pageContext.web.absoluteUrl,
            listId: "90bca00f-7b09-409b-9131-a35c5b9d5b8c", // The id of the list
            contextActionType: ContextActionType.create
          });
        }
      }
    } as ExtensionPointToolboxPanelCreationAction
  ]
});
```
