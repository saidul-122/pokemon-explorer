
import { cn } from "@/lib/utils";

interface PokemonTypeBadgeProps {
  type: string;
  className?: string;
}

const PokemonTypeBadge = ({ type, className }: PokemonTypeBadgeProps) => {
  // Pokemon type colors
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      normal: "bg-gray-400 hover:bg-gray-500",
      fire: "bg-orange-500 hover:bg-orange-600",
      water: "bg-blue-500 hover:bg-blue-600",
      electric: "bg-yellow-400 hover:bg-yellow-500",
      grass: "bg-green-500 hover:bg-green-600",
      ice: "bg-blue-300 hover:bg-blue-400",
      fighting: "bg-red-600 hover:bg-red-700",
      poison: "bg-purple-500 hover:bg-purple-600",
      ground: "bg-amber-600 hover:bg-amber-700",
      flying: "bg-indigo-300 hover:bg-indigo-400",
      psychic: "bg-pink-500 hover:bg-pink-600",
      bug: "bg-lime-500 hover:bg-lime-600",
      rock: "bg-stone-500 hover:bg-stone-600",
      ghost: "bg-purple-600 hover:bg-purple-700",
      dragon: "bg-indigo-600 hover:bg-indigo-700",
      dark: "bg-gray-700 hover:bg-gray-800",
      steel: "bg-slate-400 hover:bg-slate-500",
      fairy: "bg-pink-400 hover:bg-pink-500",
      all: "bg-gray-300 hover:bg-gray-400",
    };
    
    return colors[type] || "bg-gray-500 hover:bg-gray-600";
  };
  
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full text-white capitalize shadow-sm",
        getTypeColor(type),
        className
      )}
    >
      {type}
    </span>
  );
};

export default PokemonTypeBadge;
