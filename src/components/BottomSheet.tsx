import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';

interface BottomSheetProps {
  children: React.ReactNode;
  isDisplayed: boolean;
  onCloseCallback?: () => void;
}

export default function BottomSheet({ children, isDisplayed, onCloseCallback }: BottomSheetProps) {
  useEffect(() => {
    if (isDisplayed) handlePresentModalOpen();
    else handlePresentModalClose();
  }, [isDisplayed]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(snapPoints);

  const handlePresentModalOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    if (onCloseCallback) onCloseCallback();
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      style={styles.container}
      detached
      backdropComponent={renderBackdrop}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      onDismiss={handlePresentModalClose}
      bottomInset={46}
    >
      <BottomSheetView onLayout={handleContentLayout}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16 }
});
