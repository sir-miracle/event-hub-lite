import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../utils/theme/colors/Colors';
import { CustomText } from '../atoms';
import { FontsCatalogue } from '../../assets/fontsCatalogue';
import Avatar from '../../assets/images/avatar.png';
import React from 'react';

interface Props {
  name: string;
  onNotificationPress: () => void;
  onAvatarPress: () => void;
}

const HomeHeader: React.FC<Props> = ({
  name = '',
  onNotificationPress,
  onAvatarPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onAvatarPress} style={styles.tierContainer}>
          <Image
            source={Avatar}//can be replaced with real user image url assuming user has an image
            resizeMode="cover"
            style={styles.avatarImage}
          />
        </TouchableOpacity>
        <CustomText style={styles.greetingText}>{`Hello ${name}!`}</CustomText>
      </View>
      <TouchableOpacity onPress={() => onNotificationPress()}>
        <CustomText style={styles.notificationText}>🔔</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tierContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderWidth: 1,
    borderColor: Colors.brightGrey,
    borderRadius: 25,
  },
  tierText: {
    fontSize: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.raisinBlack,
    fontFamily: FontsCatalogue.mazzardSemiBold,
  },
  notificationText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.raisinBlack,
    fontFamily: FontsCatalogue.mazzardSemiBold,
    lineHeight: 24,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
});

export default HomeHeader;
