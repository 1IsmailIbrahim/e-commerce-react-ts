import { useToast } from "@chakra-ui/react";
import { ReactNode, useEffect, useRef } from "react";
import { CiWifiOff, CiWifiOn } from "react-icons/ci";
import CustomToast from "../components/CustomToast";
import { useAppDispatch } from "../app/store";
import { networkMode } from "../app/features/networkSlice";

interface IProps {
  children: ReactNode;
}

const InternetConnectionProvider = ({ children }: IProps) => {
  const toast = useToast();
  const toastIdRef = useRef<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOnline = () => {
      dispatch(networkMode(true));
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
        toastIdRef.current = undefined;
      }
      toast({
        duration: 3000,
        position: "bottom-right",
        render: ({ onClose }) => (
          <CustomToast
            title="Restored Internet connection"
            status="success"
            onClose={onClose}
            icon={<CiWifiOn />}
          />
        ),
      });
    };

    const handleOffline = () => {
      dispatch(networkMode(false));
      if (!toastIdRef.current) {
        toastIdRef.current = toast({
          duration: 8000,
          position: "bottom-right",
          render: ({ onClose }) => (
            <CustomToast
              title="You are currently offline"
              status="warning"
              onClose={onClose}
              icon={<CiWifiOff />}
            />
          ),
        }) as string;
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [toast, dispatch]);

  return <>{children}</>;
};

export default InternetConnectionProvider;
