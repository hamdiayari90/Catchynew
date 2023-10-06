import React, { useState, useEffect } from 'react';
import storage from '@react-native-firebase/storage';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

const ReelsScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [buffering, setBuffering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedVideos, setUploadedVideos] = useState([]);

    const fetchVideosFromFirebase = async () => {
        const videosRef = storage().ref('videos');
        const videosList = await videosRef.listAll();
        const videoURLPromises = videosList.items.map(videoRef => videoRef.getDownloadURL());
        const videoURLs = await Promise.all(videoURLPromises);
        setUploadedVideos(videoURLs);
        videoURLs.push(null);
        
        setUploadedVideos(videoURLs);
    };

    useEffect(() => {
        fetchVideosFromFirebase();
    }, []);
    useEffect(() => {
        // Detect when the user has swiped to the "loading" screen
        if (currentIndex === uploadedVideos.length - 1) {
            fetchVideosFromFirebase();
        }
    }, [currentIndex]);
    const handleUpload = async () => {
        const options = {
            mediaType: 'video',
            noData: true,
        };

        try {
            const response = await launchImageLibrary(options);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const videoUri = response.assets[0].uri;
                const filename = response.assets[0].fileName;

                if (videoUri && filename) {
                    const reference = storage().ref(`/videos/${filename}`);
                    const task = reference.putFile(videoUri);

                    task.on('state_changed', (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);

                        if (snapshot.state === 'running' && progress < 100) {
                            setIsUploading(true);
                        } else {
                            setIsUploading(false);
                        }
                    });

                    await task;

                    const downloadURL = await reference.getDownloadURL();
                    console.log('Uploaded video accessible at:', downloadURL);
                    setUploadSuccess(true);

                    // Fetch updated videos from Firebase
                    fetchVideosFromFirebase();
                } else {
                    console.error('Invalid video URI or filename:', videoUri, filename);
                }
            } else {
                console.error('No valid video URI found in response:', response);
            }
        } catch (error) {
            setIsUploading(false);
            console.error('Upload failed:', error);
        }
    };
   const handleGoToAnotherScreen = () => {
        navigation.navigate('Home');
    };

    setTimeout(() => {
        setUploadSuccess(false);
    }, 3000);

    return (
        <View style={styles.container}>
            {!isFullScreen && (
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Catchy Share</Text>
                        <TouchableOpacity onPress={handleGoToAnotherScreen}>
                            <Text style={styles.headerIcon}>❮</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.leftIcons}>
                            <TouchableOpacity style={styles.button} onPress={() => alert('Vous avez Liké cette vidéo')}>
                                <Text style={styles.buttonText}>💛</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => alert('Shared')}>
                                <Text style={styles.buttonText}>🔗</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Text style={styles.uploadButtonText}>+</Text>
            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
                 <ScrollView
            style={styles.scrollView}
            pagingEnabled
            snapToInterval={height} // Ensure scrollview snaps to each video boundary
            vertical
            onMomentumScrollEnd={(event) => {
                setCurrentIndex(Math.floor(event.nativeEvent.contentOffset.y / height));
            }}
        >
            {uploadedVideos.map((videoUrl, index) => {
                    if (videoUrl === null) {
                        // Render the loading screen
                        return (
                            <View style={styles.videoContainer} key={index}>
                                <ActivityIndicator size="large" color="#FFF" />
                            </View>
                        );
                    }
                    // Render the video
                    return (
                
                <TouchableOpacity 
                    key={index} 
                    activeOpacity={1} 
                    style={styles.videoContainer} // Style to ensure the container occupies full height
                >
                    <Video
                        source={{ uri: videoUrl }}
                        style={isFullScreen ? styles.fullScreenVideo : styles.backgroundVideo}
                        repeat
                        resizeMode="cover"
                        muted={index !== currentIndex}
                        onLoadStart={() => setBuffering(true)}
    onLoad={() => setBuffering(false)}
    onError={() => setBuffering(false)}
                        playInBackground={false}
                        playWhenInactive={false}
                    />
                    {buffering && <ActivityIndicator size="large" color="#FFF" />}
                    </TouchableOpacity>
                    );
                })}
            </ScrollView>
        {uploadSuccess && (
    <View style={styles.successMessageContainer}>
        <Text style={styles.successMessageText}>Téléchargé avec succès</Text>
    </View>
)}
        {isUploading && (
            <View style={styles.progressBarContainer}>
                <View style={{...styles.progressBar, width: `${uploadProgress}%`}} />
            </View>
        )}
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollView: {
        flex: 1,
    },
    videoContainer: {
        width,
        height,
    },
    uploadButton: {
        position: 'absolute',
        left: 135,
        bottom: 20,
        alignSelf: 'center',
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FED544',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
    },
    uploadButtonText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    backgroundVideo: {
        width,
        height,
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 5,
        backgroundColor: 'gray',
    },
    successMessageContainer: {
        position: 'absolute',
        bottom: 10, // adjust this as needed
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.7)', // semi-transparent black background
        borderRadius: 5,
    },
    successMessageText: {
        color: 'white',
        fontSize: 16,
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'gold',
    },
    fullScreenVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        zIndex: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerIcon: {
        color: 'white',
        fontSize: 24,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 15,
        zIndex: 10,
    },
    leftIcons: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    },
});

export default ReelsScreen;
