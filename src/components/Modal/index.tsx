import { FC } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({
  header,
  footer,
  isVisible,
  onClose,
  children,
}) => {
  return isVisible ? (
    ReactDOM.createPortal(
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden transition ease-in-out duration-300 z-[999]">
        <div
          className="bg-white z-[999] lg:max-w-3xl xl:max-w-5xl m-auto p-4 relative overflow-auto rounded-xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-row justify-center items-baseline">
            <h1 className="flex-grow text-center">{header}</h1>
            <button
              type="button"
              onClick={onClose}
              className="text-3xl lg:text-5xl"
            >
              <IoClose />
            </button>
          </div>
          <div>{children}</div>
          <h2 className="flex-grow text-center">{footer}</h2>
        </div>
        <div className="fixed top-0 left-0 w-full h-full z-[99] bg-black opacity-75"></div>
      </div>,
      document.getElementById("root") || document.body
    )
  ) : (
    <></>
  );
};
