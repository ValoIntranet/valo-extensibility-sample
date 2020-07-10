import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ProviderService, IntranetProvider, INotificationProvider, InformationMessage } from '@valo/extensibility';
import { lorem, internet } from 'faker';
import { Guid } from '@microsoft/sp-core-library';

export interface ICustomNotificationsProps {}

let notificationProvider: INotificationProvider = null;

// Notification service (1.7 BETA)
export const CustomNotifications: React.FunctionComponent<ICustomNotificationsProps> = (props: ICustomNotificationsProps) => {
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    const loadProvider = async () => {
      const providerService = ProviderService.getInstance();
      const notificationInstance = await providerService.getProvider<INotificationProvider>(IntranetProvider.Notifications);
      if (notificationInstance && notificationInstance.instance) {
        notificationProvider = notificationInstance.instance;
      }
    };

    loadProvider();
  }, []);

  /**
   * Hide notification call back when a particular notification gets removed
   * @param id
   */
  const hideNotification = (id: string) => {
    let copy = [...notifications].filter(n => n.id !== id);
    setNotifications(copy);
  };

  /**
   * Create a new notification
   * Info: Here we just generate notification on the fly. In your applicaiton you will need to have a store / reference where you will get the notification to show.
   */
  const createNotification = () => {
    if (notificationProvider) {
      let copy = [...notifications];
      const newNotification = {
        id: Guid.newGuid().toString(),
        details: lorem.sentence(),
        link: internet.url(),
        linkTitle: lorem.words(5),
        timestamp: new Date().toString()
      } as InformationMessage;

      copy.push(newNotification);

      setNotifications(copy);

      notificationProvider.push("CustomNotifications", [newNotification], hideNotification);
    }
  };

  /**
   * Updates the first notification
   */
  const updateNotification = () => {
    let copy: InformationMessage[] = [...notifications];
    const firstNotification = copy[0];
    if (firstNotification) {
      const newDetails = lorem.sentence();
      const newLinkTitle = lorem.words(5);
      console.log("OLD:", firstNotification.details, "NEW:", newDetails);
      firstNotification.details = newDetails;
      firstNotification.linkTitle = newLinkTitle;

      setNotifications(copy);
      notificationProvider.update(firstNotification.id as string, firstNotification);
    }
  };

  return (
    <>
      <PrimaryButton onClick={createNotification}>Create notification</PrimaryButton>
      {
        notifications.length > 0 && (
          <PrimaryButton onClick={updateNotification}>Update first notification</PrimaryButton>
        )
      }
      <span>Notifications: {notifications.length}</span>
    </>
  );
};
