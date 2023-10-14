import { useZxing } from "react-zxing";

function Scanner({ deviceId, onResult }) {
  const { ref: scannerRef } = useZxing({
    deviceId,
    onDecodeResult(result) {
      onResult(result.getText());
    },
  });

  return <video ref={scannerRef} />;
}

export default Scanner;
