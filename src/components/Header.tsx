
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full bg-pokemon-red text-white py-4 px-6 shadow-md", className)}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full border-4 border-pokemon-red flex items-center justify-center">
            <div className="w-4 h-4 bg-pokemon-red rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold">PokéPal Explorer</h1>
        </div>
        <div className="text-sm hidden md:block">
          Powered by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="underline hover:text-pokemon-yellow">PokéAPI</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
