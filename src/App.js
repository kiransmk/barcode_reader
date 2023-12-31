import { useState, useEffect } from "react";

import Barcode from "./components/Barcode";
import Scanner from "./components/Scanner";
import { requestPermissionAndGetDevices } from "./utils";

import "./App.css";
import useDeviceLocalStorage from "./hooks/useLocalStorage";

function App({ callback }) {
  const { getDeviceId, storeDeviceId } = useDeviceLocalStorage();
  const [startScan, setStartScan] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(
    getDeviceId() || undefined
  );
  const [barcode, setBarcode] = useState(null);

  useEffect(() => {
    callback.onUpdate = () => {
      console.log("service worker update waiting");
    };
  }, [callback]);

  useEffect(() => {
    requestPermissionAndGetDevices().then((devices) => {
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      if (!selectedDevice && videoDevices.length) {
        storeDeviceId(videoDevices[0].deviceId);
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
    setStartScan((prevStartScan) => !prevStartScan);
  };

  const handleChangeDevice = (e) => {
    storeDeviceId(e.target.value);
    setSelectedDevice(e.target.value);
  };

  return (
    <div className="App">
      {devices && (
        <div className="select-device">
          <select onChange={handleChangeDevice} value={selectedDevice}>
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedDevice && (
        <div className="button-wrapper">
          <button type="button" onClick={handleStartScan}>
            {startScan ? "Stop Scanning" : "Scan Barcode"}
          </button>
        </div>
      )}
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
