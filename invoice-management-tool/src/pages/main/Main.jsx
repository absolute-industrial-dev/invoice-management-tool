import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import "./Main.css" ;

export default function Main() {
  return (
    <div className="table-container">
      <header>
        <Navbar />
      </header>
      <main>
        <Table />
      </main>
    </div>
  );
}
