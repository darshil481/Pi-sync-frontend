// =================== import packages ==================
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getToast, removeAllToast } from "../../redux/slices/toastSlice";
import { store } from "../../redux/store";
// =====================================
const Toast = () => {
  const toastMessage = useSelector(getToast);

  useEffect(() => {
    store.dispatch(removeAllToast());
  }, []);

  return (
    <>
      {toastMessage.length ? (
        <>
          <div className="toast-wrapper fixed bottom-5 right-5 z-50 rounded-l">
            {toastMessage.map((toast, index) => (
              <div
                key={index}
                className={`inner px-4 py-3 my-2 shadow-md rounded-10 text-white transition-all duration-300 ease-in-out
        ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}
              >
                <div className="relative pl-8">
                  <span
                    className={`icon absolute left-0 top-0 w-6 h-6 flex items-center justify-center 
            ${toast.type === "error" ? "text-red-100" : "text-green-100"}`}
                  >
                    {toast.type === "error" ? <span>❌</span> : <span>✅</span>}
                  </span>
                  <span className="text-base whitespace-nowrap">
                    {toast.message}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
