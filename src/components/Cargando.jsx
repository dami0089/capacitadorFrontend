import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import Lottie from "lottie-react";
import animation from "../Lotties/Animation - 1702045917203.json";
import useAuth from "@/hooks/useAuth";

const Cargando = () => {
  const { cargandoModal, handleCargando } = useAuth();

  return (
    <Transition.Root show={cargandoModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto "
        onClose={handleCargando}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <ToastContainer pauseOnFocusLoss={false} />

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-gray-200 px-4 pb-4 pt-5 text-left   shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle md:h-40">
              {/* <button
                onClick={handleCargando}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
              ></button> */}
              <div className="mt-5 flex h-8 items-center justify-center bg-transparent">
                {/* <FallingLines
                  color="#E8600E"
                  width="100"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                /> */}
                <Lottie
                  loop
                  autoplay
                  style={{ width: "400px", height: "400px" }}
                  animationData={animation}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cargando;
