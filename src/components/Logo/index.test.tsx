import { render, screen } from "@testing-library/react";
import Logo from "./";

describe("Logo", () => {
    test("renders logo image with correct alt text", () => {
        render(<Logo />);

        const img = screen.getByAltText("logo");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src");
        expect(img).toHaveAttribute("width", "40");
        expect(img).toHaveAttribute("height", "40");
    });
});
