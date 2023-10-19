const cancelStream = (stream) => {
  stream.getTracks().forEach((track) => track.stop());
};

const requestPermission = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
    },
  });
  cancelStream(stream);
};

export async function getMediaDevices() {
  await requestPermission();
  return await navigator.mediaDevices.enumerateDevices();
}
