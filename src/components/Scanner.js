import { useZxing } from "react-zxing";

function Scanner({ onResult }) {
  const { ref: scannerRef } = useZxing({
    onDecodeResult(result) {
      onResult(result.getText());
    },
  });

  return <video ref={scannerRef} />;
}

export default Scanner;
