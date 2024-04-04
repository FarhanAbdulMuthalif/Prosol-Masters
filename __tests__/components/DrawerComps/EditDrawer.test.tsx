import ClientContext from "@/Provides/WholeWrapper/ClientContext";
import EditDreawer from "@/components/DynamicFields/Drawer/EditDrawer/EditDrawer";
import { initialDynamicStateField } from "@/utils/DynamicFields/DynamicFieldsData";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
jest.mock("next/navigation");
jest.mock("@/components/api");
describe("EditDrawer Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Renders EditDrawer Page", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(
      <EditDreawer
        SelectedValue={initialDynamicStateField}
        OpenDrawer={true}
        HandlerCloseDrawer={() => {}}
      />,
      {
        wrapper: ClientContext,
      }
    );
  });
  it("Header Text Check", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(
      <EditDreawer
        SelectedValue={initialDynamicStateField}
        OpenDrawer={true}
        HandlerCloseDrawer={() => {}}
      />,
      {
        wrapper: ClientContext,
      }
    );
    const heading = screen.getByText(/Edit Field \(.*\)/i);
    expect(heading).toBeInTheDocument();
  });
  it("Render Dropdown, Button", () => {
    (useRouter as jest.Mock).mockReturnValue({});
    render(
      <EditDreawer
        SelectedValue={initialDynamicStateField}
        OpenDrawer={true}
        HandlerCloseDrawer={() => {}}
      />,
      {
        wrapper: ClientContext,
      }
    );
    // Check if the select field type dropdown is rendered
    expect(screen.getByLabelText("Select Field")).toBeInTheDocument();

    // Check if the cancel and save buttons are rendered
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
  it("calls HandlerCloseDrawer when Cancel button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <EditDreawer
        SelectedValue={initialDynamicStateField}
        OpenDrawer={true}
        HandlerCloseDrawer={handleClose}
      />,
      {
        wrapper: ClientContext,
      }
    );

    // Click on the Cancel button
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    // Expect that the HandlerCloseDrawer function is called
    expect(handleClose).toHaveBeenCalled();
  });
});
