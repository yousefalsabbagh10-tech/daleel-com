import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Field } from './Controls';
import { CreateAdForm } from './data';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../../constants/theme';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  form: CreateAdForm;
  setField: (key: keyof CreateAdForm, value: any) => void;
};

export function MediaStep({ form, setField }: Props) {
  const images = form.images || [];
  const videos = form.videos || [];

  const pickMedia = async (type: 'image' | 'video') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('عذراً', 'نحتاج إذن الوصول إلى الوسائط لتتمكن من اختيار ملفات.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const newAssets = result.assets.map(asset => {
         if (asset.base64 && type === 'image') {
            return `data:image/jpeg;base64,${asset.base64}`;
         }
         return asset.uri;
      });
      
      if (type === 'image') {
        const updatedImages = [...images.filter(i => !i.includes('images.unsplash.com')), ...newAssets];
        setField('images', updatedImages);
        if (updatedImages.length > 0) setField('imageUrl', updatedImages[0]);
      } else {
        const updatedVideos = [...videos, ...newAssets];
        setField('videos', updatedVideos);
        if (updatedVideos.length > 0) setField('videoUrl', updatedVideos[0]);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setField('images', newImages);
    if (newImages.length > 0) {
        setField('imageUrl', newImages[0]);
    } else {
        setField('imageUrl', '');
    }
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setField('videos', newVideos);
    if (newVideos.length > 0) {
        setField('videoUrl', newVideos[0]);
    } else {
        setField('videoUrl', '');
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.note}>قم بإضافة صور ومقاطع فيديو للإعلان من جهازك لزيادة فرصة البيع.</Text>
      
      <View style={styles.mediaContainer}>
        <TouchableOpacity style={styles.button} onPress={() => pickMedia('image')}>
          <Text style={styles.buttonText}>+ اختيار صور</Text>
        </TouchableOpacity>
        
        {images.length > 0 && (
          <ScrollView horizontal style={styles.previewList}>
            {images.map((uri, index) => (
              <View key={index} style={styles.mediaWrapper}>
                <Image source={{ uri }} style={styles.preview} />
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(index)}>
                  <Text style={styles.removeText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.mediaContainer}>
        <TouchableOpacity style={styles.button} onPress={() => pickMedia('video')}>
          <Text style={styles.buttonText}>+ اختيار فيديو</Text>
        </TouchableOpacity>
        
        {videos.length > 0 && (
          <View style={styles.previewList}>
            {videos.map((uri, index) => (
              <View key={index} style={[styles.mediaWrapper, { marginBottom: 10 }]}>
                <View style={[styles.preview, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{color: '#fff'}}>فيديو مرفق</Text>
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeVideo(index)}>
                  <Text style={styles.removeText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={{marginTop: 20}}>
        <Text style={styles.note}>أو يمكنك إضافة روابط خارجية:</Text>
        <Field
          label="رابط الصورة الخارجية"
          value={form.imageUrl}
          onChangeText={value => setField('imageUrl', value)}
          placeholder="https://..."
        />
        <Field
          label="فيديو خارجي (اختياري)"
          value={form.videoUrl}
          onChangeText={value => setField('videoUrl', value)}
          placeholder="رابط YouTube أو MP4"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  note: {
    color: COLORS.gray500,
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  mediaContainer: {
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: '#0d6efd',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.md,
  },
  previewList: {
    flexDirection: 'row',
  },
  mediaWrapper: {
    position: 'relative',
    marginRight: SPACING.sm,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray100,
  },
  removeBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#dc3545',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
