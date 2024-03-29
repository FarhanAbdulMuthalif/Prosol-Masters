import ClientContext from "@/Provides/WholeWrapper/ClientContext";
import Login from "@/app/Login/page";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
jest.mock("next/navigation");
describe("Login Page", () => {
  it("Renders Login Page", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(<Login />, {
      wrapper: ClientContext,
    });
  });
  it("Header Text Check", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(<Login />, {
      wrapper: ClientContext,
    });
    const heading = screen.getByText("LOGIN");
    expect(heading).toBeInTheDocument();
  });
});

// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
//   usePathname: jest.fn().mockReturnValue("/Login"),
// }));
