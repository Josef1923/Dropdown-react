import Dropdown from "./Dropdown";
import icon from "../src/asset/icon.svg"

function App() {

  return (
    <div>
      <h1>Test Dropdown</h1>
      <label htmlFor='department'>Department</label>
      <Dropdown
        options={[
          { label: "Sales", value: "sales" },
          { label: "Marketing", value: "marketing" },
          { label: "Engineering", value: "engineering" },
          { label: "Human Resources", value: "hr" },
          { label: "Legal", value: "legal" }
        ]}
        onChange={(value) => console.log("Valeur sélectionnée :", value)}
        icon={<img src={icon} alt="icon" />}
      />
    </div>
  )
}

export default App;