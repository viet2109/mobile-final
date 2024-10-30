import { CameraView, useCameraPermissions } from "expo-camera";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Overlay } from "../../../components/overlay";

const Scanner: React.FC = () => {
  const qrLock = useRef<boolean>(false);
  const appState = useRef(AppState.currentState);
  const [, requestPermission] = useCameraPermissions();
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status === "granted") {
        setLoading(false);
      } else {
        console.log("Camera permission denied");
      }
    })();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [requestPermission]);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;

      try {
        // await Linking.openURL(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to open URL:", error);
      } finally {
        setTimeout(() => {
          qrLock.current = false;
        }, 1000);
      }
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay />
    </SafeAreaView>
  );
};

export default Scanner;
