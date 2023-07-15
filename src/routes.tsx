import { createHashRouter } from "react-router-dom";
import App from "./App";
import R6dle from "./r6dle/r6dle";
import Quotes from "./quotes/quotes";
import MarkGenerator from "./markgen/markGenerator";
import Proof from "./proof/proof";
import CurriculumVitae from "./cv/CV";

export const HashRoutes = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/r6dle",
    element: <R6dle />,
  },
  {
    path: "/quotes",
    element: <Quotes />,
  },
  {
    path: "/mark",
    element: <MarkGenerator />,
  },
  {
    path: "/proof",
    element: <Proof />,
  },
  {
    path: "/cv",
    element: <CurriculumVitae />,
  },
]);
