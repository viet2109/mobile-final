import { CameraView, useCameraPermissions } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { AppState, SafeAreaView, StyleSheet } from "react-native";
import { Overlay } from "../../../components/overlay";

const Scanner: React.FC = () => {
  const isQrLock = useRef<boolean>(false);
  const appState = useRef(AppState.currentState);
  const [, requestPermission] = useCameraPermissions();
  const [, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status === "granted") {
        setIsLoading(false);
      } else {
        console.log("Camera permission denied");
      }
    })();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        isQrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [requestPermission]);

  const handleBarcodeScanned = async ({ data }: { data: any }) => {
    if (data && !isQrLock.current) {
      isQrLock.current = true;

      try {
        const parsedData = JSON.parse(data);
        if (parsedData.method === "receive") {
          router.push({
            pathname: "/send/amount",
            params: {
              recipient: JSON.stringify({
                ...parsedData.data.recipient,
              }),
              purpose: parsedData.data.purpose,
            },
          });
        }
      } catch (error) {
        console.error("Failed to parse data as JSON:", error);
      } finally {
        // Reset isQrLock sau 1 giây
        setTimeout(() => {
          isQrLock.current = false;
        }, 1000);
      }
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* {Platform.OS === "android" ? <StatusBar hidden /> : null} */}
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
