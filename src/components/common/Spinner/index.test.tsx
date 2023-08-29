import { render, screen } from "@testing-library/react";
import Spinner from "./";

describe("Spinner", () => {
    test("renders spinner with visual loading indication", () => {
        render(<Spinner />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});
