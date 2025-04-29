
import { Loader } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <Loader className="h-12 w-12 text-pokemon-red animate-spin mb-4" />
      <p className="text-lg font-medium text-gray-600">Loading Pokémon data...</p>
      <p className="text-sm text-gray-500">Catching 'em all, please wait!</p>
    </div>
  );
};

export default LoadingState;
