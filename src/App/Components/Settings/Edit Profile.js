import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ProfileHeader from './ProfileHeader';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, ToastAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../Home/Loading';
import { IP_ADDRESS } from '../../global';


function EditProfile() {
  const route = useRoute();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const userData = route.params?.data;
    if (userData) {
      setName(userData.name);
      setImage(userData.image);
    }
  }, []);

  const selectPhoto = () => {
    setLoading(true);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
    }).then(imageData => {
      const data = `data:${imageData.mime};base64,${imageData.data}`;
      setImage(data);
    }).catch(error => {
      console.log('Image picker error: ', error);
    })
    .finally(() => {
      setLoading(false); // Set loading state to false after request completion
    });
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = {
        token: token,
        name: name,
        image: image
      };
      const res = await axios.post(`${IP_ADDRESS}/updateuser`, formData);
      if (res.data.message === "User data updated successfully") {
      ToastAndroid.show('Profile Updated Successfully', ToastAndroid.SHORT);
      navigation.navigate('Settings');
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ProfileHeader />
      <View style={styles.container}>
        <Avatar.Image
          size={140}
          style={styles.avatar}
          source={{
            uri: image ? image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
          }}
        />
        <TouchableOpacity onPress={selectPhoto}>
          <Text style={styles.linktext}>Change Photo</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={'#999797'}
            style={styles.inputText}
            onChangeText={text => setName(text)}
            value={name}
          />
          <Feather name="user" size={20} color="#999" style={styles.inputIcon} />
        </View>
        <TouchableOpacity onPress={updateProfile}>
          <LinearGradient
            colors={['#2C398B', '#01AAEC']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.loginText}>UPDATE PROFILE</Text>
          </LinearGradient>
        </TouchableOpacity>
        {loading && <LoadingScreen />}
      </View>
    </ScrollView>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    width: '90%',
    height: 600,
    alignSelf: 'center',
    elevation: 20,
    borderRadius: 8,
  },
  linktext: {
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#01AAEC',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  inputText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(31, 61, 77, 0.1)',
    width: '90%',
    height: 48,
    borderRadius: 8,
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: 'rgba(242, 243, 250, 1)',
  },
  inputIcon: {
    marginRight: 10,
  },
  linearGradient: {
    width: 338,
    height: 48,
    borderRadius: 5,
    marginTop: 170,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
  avatar: {
    borderRadius: 80,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: 'white',
    height: 160,
    width: 160,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
