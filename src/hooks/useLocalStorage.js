const useDeviceLocalStorage = () => {
  const cacheName = "BarcodeReader";
  const storeDeviceId = (id) => {
    localStorage.setItem(cacheName, String(id));
  };

  const getDeviceId = () => {
    const storedDevice = localStorage.getItem(cacheName);
    return storedDevice;
  };

  const clearCache = () => {
    localStorage.removeItem(cacheName);
  };
  return { storeDeviceId, getDeviceId, clearCache };
};

export default useDeviceLocalStorage;
