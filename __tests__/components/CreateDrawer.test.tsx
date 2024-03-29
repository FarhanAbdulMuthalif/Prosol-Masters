import ClientContext from "@/Provides/WholeWrapper/ClientContext";
import CreateDreawer from "@/components/DynamicFields/Drawer/Create/CreateDreawer";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
jest.mock("next/navigation");
jest.mock("@/components/api");
describe("CreateDrawer Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Renders CreateDrawer Page", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(<CreateDreawer OpenDrawer={true} HandlerCloseDrawer={() => {}} />, {
      wrapper: ClientContext,
    });
  });
  it("Header Text Check", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(<CreateDreawer OpenDrawer={true} HandlerCloseDrawer={() => {}} />, {
      wrapper: ClientContext,
    });
    const heading = screen.getByText(/Create Field \(.*\)/i);
    expect(heading).toBeInTheDocument();
  });
  it("Render Dropdown, Button", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(<CreateDreawer OpenDrawer={true} HandlerCloseDrawer={() => {}} />, {
      wrapper: ClientContext,
    });
    // Check if the select field type dropdown is rendered
    expect(screen.getByLabelText("Select Field")).toBeInTheDocument();

    // Check if the cancel and save buttons are rendered
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
  it("calls HandlerCloseDrawer when Cancel button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <CreateDreawer OpenDrawer={true} HandlerCloseDrawer={handleClose} />,
      {
        wrapper: ClientContext,
      }
    );

    // Click on the Cancel button
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    // Expect that the HandlerCloseDrawer function is called
    expect(handleClose).toHaveBeenCalled();
  });
  //   it("calls HandlerCloseDrawer and setReusableSnackBar when form is submitted successfully", async () => {
  //     (useRouter as jest.Mock).mockReturnValue({});
  //     const handleClose = jest.fn();
  //     const setReusableSnackBar = jest.fn();
  //     const settabValue = jest.fn();

  //     render(
  //       <CreateDreawer OpenDrawer={true} HandlerCloseDrawer={handleClose} />,
  //       {
  //         wrapper: ClientContext,
  //       }
  //     );

  //     // Mock successful API response
  //     const mockResponse = { status: 201 };
  //     (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

  //     // Simulate form submission
  //     await act(async () => {
  //       fireEvent.submit(screen.getByTestId("create-drawer-form-submission"));
  //     });

  //     // Expect setReusableSnackBar to be called with success message
  //     await waitFor(() => {
  //       // Expect setReusableSnackBar to be called with success message
  //       expect(setReusableSnackBar).toHaveBeenCalledWith({
  //         severity: "success",
  //         message: "Field Created Successfully!",
  //         open: true,
  //       });

  //       // Expect HandlerCloseDrawer to be called
  //       expect(handleClose).toHaveBeenCalled();

  //       // Expect settabValue to be called with "table"
  //       expect(settabValue).toHaveBeenCalledWith("table");
  //     });
  //   });
});
