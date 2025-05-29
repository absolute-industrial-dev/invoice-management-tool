import Searchbar from "../searchbar/Searchbar";
import Searchby from "../searchby/Searchby";
import "./Table.css";

export default function Table() {
  return (
    <div>
      <div className="contain">
        <Searchbar />
        <Searchby />
      </div>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Apple</td>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Mango</td>
            <td>2</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Orange</td>
            <td>1</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>Total</td>
            <td>5</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
