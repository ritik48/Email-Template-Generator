import { Provider } from "@/Provider";
import NavBar from "../_components/NavBar";
import { ItemSelectionSideBar } from "../_components/ItemSelectionSideBar";
import { Canvas } from "../_components/Canvas";
import { Settings } from "../_components/Settings";

export default function Page() {
  return (
    <div>
      <Provider>
        <NavBar />

        <div className="flex items-start justify-between h-[calc(100vh-55px)] overflow-hidden">
          <ItemSelectionSideBar />

          <Canvas />

          <Settings />
        </div>
      </Provider>
    </div>
  );
}
