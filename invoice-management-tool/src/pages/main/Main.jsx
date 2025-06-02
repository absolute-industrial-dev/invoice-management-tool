import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import ThemeToggle from "../../components/themetoggle/Theme";
import "./Main.css";

export default function Main() {
  return (
    <div className="table-container">
      <ThemeToggle className="mode" />
      <header>
        <Navbar />
      </header>
      <main>
        <Table />
      </main>
    </div>
  );
}
