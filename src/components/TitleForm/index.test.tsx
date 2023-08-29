import { render, screen } from "@testing-library/react";
import TitleForm from "./";

describe("TitleForm", () => {
    test("renders the provided title", () => {
        render(<TitleForm title="Sign Up" />);

        expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
});
