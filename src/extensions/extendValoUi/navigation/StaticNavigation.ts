import { ExtensionService, IntranetLocation } from "@valo/extensibility";


export class StaticNavigation {

  public static create(extensionService: ExtensionService) {

    extensionService.registerExtension({
      id: "MegaMenuStaticBefore",
      location: IntranetLocation.MegaMenuBeforeNavigationItems,
      element: [
        {
          title: "Global portal",
          link: "https://www.valointranet.com"
        },
        {
          title: "Global HR",
          link: "https://www.eliostruyf.com",
          items: [
            {
              id: "1",
              title: "Phone policy",
              link: "https://www.eliostruyf.com",
              items: [
                {
                  id: "3",
                  title: "Android",
                  link: "https://www.eliostruyf.com",
                  items: [],
                  properties: {
                    staticLink: true
                  }
                },
                {
                  id: "4",
                  title: "Apple",
                  link: "https://www.eliostruyf.com",
                  items: [],
                  properties: {
                    staticLink: true
                  }
                }
              ],
              myStaticCustomProperty: true
            } as any,
            {
              id: "2",
              title: "Car policy",
              link: "https://www.eliostruyf.com",
              items: [],
              properties: {
                staticLink: true
              },
              myStaticCustomProperty: true,
              renderDefault: true
            } as any
          ]
        }
      ]
    });
  }
}
