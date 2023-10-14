import { useState, useEffect } from "react";

import Barcode from "./components/Barcode";
import Scanner from "./components/Scanner";

import "./App.css";

function App({ callback }) {
  const [startScan, setStartScan] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [barcode, setBarcode] = useState(null);

  useEffect(() => {
    callback.onUpdate = () => {
      console.log("service worker update waiting");
    };
  }, [callback]);

  useEffect(() => {
    async function getMediaDevices() {
      return await navigator.mediaDevices.enumerateDevices();
    }
    getMediaDevices().then((devices) => {
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      if (videoDevices.length) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
      setDevices(videoDevices);
    });
  }, []);

  const handleResult = (resultString) => {
    setStartScan(false);
    setBarcode(resultString);
  };

  const handleStartScan = () => {
    setBarcode(null);
    setStartScan(true);
  };

  return (
    <div className="App">
      {devices && (
        <div className="select-device">
          <select onChange={(e) => setSelectedDevice(e.target.value)}>
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="button-wrapper">
        <button type="button" onClick={handleStartScan}>
          Scan Barcode
        </button>
      </div>
      {barcode && (
        <div className="barcode">
          <Barcode barcode={barcode} />
        </div>
      )}
      <div className="scanner">
        {startScan && (
          <Scanner onResult={handleResult} deviceId={selectedDevice} />
        )}
      </div>
    </div>
  );
}

export default App;
