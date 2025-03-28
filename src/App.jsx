import Dropdown from "./Dropdown";

function App() {

  return (
    <div>
      <h1>Test Dropdown</h1>
      <label htmlFor='department'>Department</label>
      <Dropdown
        options={[
          { label: "Pomme", value: "apple" },
          { label: "Banane", value: "banana" },
          { label: "Poire", value: "pear" },
        ]}
        onChange={(val) => console.log("Valeur sélectionnée :", val)}
      />
    </div>
  )
}

export default App;