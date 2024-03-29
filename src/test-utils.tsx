import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import ClientContext from "./Provides/WholeWrapper/ClientContext";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ClientContext, ...options });

export * from "@testing-library/react";
export { customRender as render };
