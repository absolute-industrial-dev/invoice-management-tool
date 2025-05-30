import ParticleBackground from "../particles/Particles";
import "./Searchbar.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Searchbar({ className = '' }) {
  return (
    <div className={`searchbar ${className}`}>
      <ParticleBackground/>
      <MagnifyingGlassIcon className="search-icon" />
      <input
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}
