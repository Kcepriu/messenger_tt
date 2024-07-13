import { FC } from "react";
import { Bars } from "react-loader-spinner";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

const MainLoader: FC = () => {
  if (!modalRoot) return <>...Loading</>;

  return createPortal(
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 bg-black_loader z-50">
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>,
    modalRoot
  );
};

export { MainLoader };
