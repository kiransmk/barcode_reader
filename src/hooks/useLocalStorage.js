const useDeviceLocalStorage = () => {
  const cacheName = "BarcodeReader";
  const storeDeviceId = (id) => {
    localStorage.setItem(cacheName, String(id));
  };

  const getDeviceId = () => {
    return localStorage.getItem(cacheName);
  };

  const clearCache = () => {
    localStorage.removeItem(cacheName);
  };
  return { storeDeviceId, getDeviceId, clearCache };
};

export default useDeviceLocalStorage;
