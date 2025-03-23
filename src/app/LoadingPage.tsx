import Lottie from "lottie-react";
import dogLoading from "../assets/animations/dog_loading.json";
export function LoadingPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Lottie animationData={dogLoading} />
      <h3 className="tracking-light px-4 pt-5 pb-3 text-center text-[22px] leading-tight font-bold text-[#141414]">
        Carregando...
      </h3>
    </div>
  );
}
