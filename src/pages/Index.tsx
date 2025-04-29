
import Header from "@/components/Header";
import PokemonExplorer from "@/components/PokemonExplorer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full">
        <PokemonExplorer />
      </main>
      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        <p>© 2025 PokéPal Explorer | All Pokémon data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-pokemon-red hover:underline">PokéAPI</a></p>
      </footer>
    </div>
  );
};

export default Index;
