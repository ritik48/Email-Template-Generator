import { Provider } from "@/Provider";
import NavBar from "../_components/NavBar";

export default function Page() {
  return (
    <div>
      <Provider>
        <NavBar />

        {/* <SideBar /> */}

        {/* <Canvas />

        <Settings /> */}
      </Provider>
    </div>
  );
}
