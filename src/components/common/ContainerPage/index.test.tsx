import { render, screen } from "@testing-library/react";
import ContainerPage from "./"; // Update this path accordingly

describe("ContainerPage", () => {
    test("renders children inside the container", () => {
        render(
            <ContainerPage>
                <div data-testid="child-div">Child Content</div>
            </ContainerPage>
        );

        expect(screen.getByTestId("child-div")).toBeInTheDocument();
    });
});
