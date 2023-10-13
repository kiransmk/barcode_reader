import { useState, useEffect } from "react";

import Barcode from "./components/Barcode";
import Scanner from "./components/Scanner";

import "./App.css";

function App({ callback }) {
  const [startScan, setStartScan] = useState(false);
  const [barcode, setBarcode] = useState(null);

  useEffect(() => {
    callback.onUpdate = () => {
      console.log("service worker update waiting");
    };
  }, [callback]);

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
        {startScan && <Scanner onResult={handleResult} />}
      </div>
    </div>
  );
}

export default App;
