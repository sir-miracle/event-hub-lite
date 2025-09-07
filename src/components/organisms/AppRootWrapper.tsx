import {
  Keyboard,
  NativeScrollEvent,
  RefreshControl,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../../utils/theme/colors/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { horizontalScale } from '../../utils/scaling';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { height, width } from '../../utils/utility-functions/UntilityFunctions';

interface Props {
  style?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  children: any;
  Header?: () => React.ReactNode;
  enableScroll?: boolean;
  useScrollFlex?: boolean;
  headerWrapperStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
  canRefresh?: boolean;
  statusBarbackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  onScrollToEnd?: () => void;
  notifyOnScrollToEnd?: boolean;
  useStatusBar?: boolean;
}
const AppRootWrapper: FC<Props> = ({
  onScrollToEnd,
  notifyOnScrollToEnd = false,
  children,
  style,
  safeAreaStyle,
  Header,
  enableScroll = false,
  useScrollFlex = false,
  headerWrapperStyle,
  contentContainerStyle,
  refreshing = false,
  onRefresh = () => {},
  canRefresh = false,
  statusBarbackgroundColor = null,
  statusBarStyle = 'dark-content',
  useStatusBar = true,
}) => {
  const insets = useSafeAreaInsets();

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View
      style={[
        styles.container,
        { width: width, height: height },
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        safeAreaStyle,
      ]}
    >
      {useStatusBar && (
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={
            statusBarbackgroundColor ? statusBarbackgroundColor : Colors.black
          }
          animated={true}
        />
      )}
      <View style={[styles.header, headerWrapperStyle]}>
        {Header && <Header />}
      </View>
      <View style={[styles.root, style]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            onScroll={({ nativeEvent }) => {
              if (notifyOnScrollToEnd)
                if (isCloseToBottom(nativeEvent)) {
                  onScrollToEnd && onScrollToEnd();
                }
            }}
            scrollEventThrottle={400}
            enableOnAndroid
            extraScrollHeight={5}
            extraHeight={5}
            style={{ width: '100%' }}
            contentContainerStyle={
              useScrollFlex
                ? // @ts-ignore
                  {
                    ...styles.scrollContent,
                    ...{ flex: 1, justifyContent: 'space-between', padding: 0 },
                    ...contentContainerStyle,
                  }
                : // @ts-ignore
                  { ...styles.scrollContent, ...contentContainerStyle }
            }
            showsVerticalScrollIndicator={false}
            scrollEnabled={enableScroll}
            refreshControl={
              canRefresh ? (
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              ) : undefined
            }
          >
            {children}
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default AppRootWrapper;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: '100%',
    paddingHorizontal: horizontalScale(10),
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: horizontalScale(16),
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
