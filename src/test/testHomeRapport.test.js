// import { render, waitFor } from "@testing-library/react";
// import { getDocs } from "firebase/firestore/lite";
// import HomeRapports from "../homeRapport/HomeRapports";
// import { MemoryRouter } from "react-router-dom";

// jest.mock("firebase/firestore/lite", () => ({
//   ...jest.requireActual("firebase/firestore/lite"),
//   getDocs: jest.fn(),
// }));

// describe("HomeRapport component", () => {
//   render(
//     <MemoryRouter>
//       <HomeRapports />
//     </MemoryRouter>
//   );
//   // render(<HomeRapports />);

//   test("get all rapport", async () => {
//     await waitFor(() => {
//       expect(getDocs).toHaveBeenCalledWith();
//     });
//   });
// });
