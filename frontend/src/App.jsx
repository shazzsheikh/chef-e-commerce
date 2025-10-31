import { useState } from "react";
import "./App.css";
import AppRoutes from "./Routes";
import { SearchProvider } from "./contextapi/searchcontext";
import { Toaster } from 'react-hot-toast';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </SearchProvider>
    </>
  );
}

export default App;
