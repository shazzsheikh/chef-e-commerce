import { useState } from "react";
import "./App.css";
import AppRoutes from "./Routes";
import { SearchProvider } from "./contextapi/searchcontext";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchProvider>
        <AppRoutes />
      </SearchProvider>
    </>
  );
}

export default App;
