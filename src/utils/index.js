const cancelStream = (stream) => {
  stream.getTracks().forEach((track) => track.stop());
};

export const requestPermissionAndGetDevices = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
    },
  });
  const devices = await navigator.mediaDevices.enumerateDevices();
  cancelStream(stream);
  return devices;
};
