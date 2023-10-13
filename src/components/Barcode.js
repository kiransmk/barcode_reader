import { useRef, useEffect } from "react";
import JsBarcode from "JsBarcode";

function Barcode({ barcode }) {
  const renderElementRef = useRef();

  useEffect(() => {
    try {
      new JsBarcode(renderElementRef.current, barcode, {
        format: "CODE128",
        renderer: "svg",
        width: 2,
        height: 100,
        displayValue: true,
        fontOptions: "",
        font: "monospace",
        textAlign: "center",
        textPosition: "bottom",
        textMargin: 2,
        fontSize: 20,
        background: "#ffffff",
        lineColor: "#000000",
        margin: 10,
      });
    } catch (e) {
      // prevent stop the parent process
      window.console.error(e);
    }
  }, [barcode]);

  return <svg ref={renderElementRef} />;
}

export default Barcode;
