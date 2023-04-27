import { ActionSheetIOS } from 'react-native';

export default function useActionSheet() {
  const displayActionSheet = (
    buttons: {
      name: string;
      isCancel?: boolean;
      isDestructive?: boolean;
      fcn: any;
    }[]
  ) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: buttons.map((b) => b.name),
        destructiveButtonIndex: buttons.findIndex((b) => b.isDestructive),
        cancelButtonIndex: buttons.findIndex((b) => b.isCancel)
      },
      (buttonIndex) => buttons[buttonIndex].fcn?.()
    );
  };

  return {
    displayActionSheet
  };
}
