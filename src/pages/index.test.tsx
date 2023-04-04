import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../pages/index";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

const testCases = [
  {
    premium: 7,
    economy: 5,
  },
  {
    premium: 2,
    economy: 7,
  },
  {
    premium: 7,
    economy: 1,
  },
];

const testResult = [
  {
    premium: {
      count: 6,
      price: 1054,
    },
    economy: {
      count: 4,
      price: 189,
    },
  },
  {
    premium: {
      count: 2,
      price: 583,
    },
    economy: {
      count: 4,
      price: 189,
    },
  },
  {
    premium: {
      count: 7,
      price: 1153,
    },
    economy: {
      count: 1,
      price: 45,
    },
  },
];

describe("test engagement system", () => {
  it("renders default", () => {
    render(<Page />);

    const premiumInput = screen.getByTestId("premium-count");
    const economyInput = screen.getByTestId("economy-count");
    const premiumRooms = screen.getByTestId("premium-rooms");
    const economyRooms = screen.getByTestId("economy-rooms");
    const premiumLabel = screen.getByTestId("premium-label");
    const economyLabel = screen.getByTestId("economy-label");

    expect(premiumInput).toHaveValue(3);
    expect(economyInput).toHaveValue(3);
    expect(premiumRooms.children).toHaveLength(3);
    expect(economyRooms.children).toHaveLength(3);
    expect(premiumLabel).toHaveTextContent("Premium Rooms (0 - EUR 0)");
    expect(economyLabel).toHaveTextContent("Economy Rooms (0 - EUR 0)");
  });

  it("renders with no premium rooms", () => {
    render(<Page />);

    const premiumInput = screen.getByTestId("premium-count");
    const premiumRooms = screen.queryByTestId("premium-rooms");

    fireEvent.change(premiumInput, { target: { value: 0 } });
    expect(premiumRooms).not.toBeInTheDocument();
  });

  it("renders with no economy rooms", () => {
    render(<Page />);

    const economyInput = screen.getByTestId("economy-count");
    const economyRooms = screen.queryByTestId("economy-rooms");

    act(() => {
      fireEvent.change(economyInput, { target: { value: 0 } });
    });
    expect(economyRooms).not.toBeInTheDocument();
  });

  it("renders with default number of rooms", () => {
    render(<Page />);

    const premiumInput = screen.getByTestId("premium-count");
    const economyInput = screen.getByTestId("economy-count");
    const premiumRooms = screen.getByTestId("economy-rooms");
    const economyRooms = screen.getByTestId("economy-rooms");
    const premiumLabel = screen.getByTestId("premium-label");
    const economyLabel = screen.getByTestId("economy-label");
    const engageButton = screen.getByTestId("button-engage");

    expect(premiumInput).toHaveValue(3);
    expect(economyInput).toHaveValue(3);
    expect(premiumRooms.children).toHaveLength(3);
    expect(economyRooms.children).toHaveLength(3);

    act(() => {
      engageButton.click();
    });

    expect(premiumLabel).toHaveTextContent("Premium Rooms (3 - EUR 738)");
    expect(economyLabel).toHaveTextContent("Economy Rooms (3 - EUR 167)");
  });

  it("renders with enough number of rooms", () => {
    render(<Page />);

    const premiumInput = screen.getByTestId("premium-count");
    const economyInput = screen.getByTestId("economy-count");
    const premiumRooms = screen.getByTestId("economy-rooms");
    const economyRooms = screen.getByTestId("economy-rooms");
    const premiumLabel = screen.getByTestId("premium-label");
    const economyLabel = screen.getByTestId("economy-label");
    const engageButton = screen.getByTestId("button-engage");

    expect(premiumInput).toHaveValue(3);
    expect(economyInput).toHaveValue(3);
    expect(premiumRooms.children).toHaveLength(3);
    expect(economyRooms.children).toHaveLength(3);

    act(() => {
      fireEvent.change(premiumInput, {
        target: { value: testCases[0].premium },
      });
      fireEvent.change(economyInput, {
        target: { value: testCases[0].economy },
      });
      engageButton.click();
    });

    expect(premiumLabel).toHaveTextContent(
      `Premium Rooms (${testResult[0].premium.count} - EUR ${testResult[0].premium.price})`
    );
    expect(economyLabel).toHaveTextContent(
      `Economy Rooms (${testResult[0].economy.count} - EUR ${testResult[0].economy.price}`
    );
  });

  it("renders with lack of premium rooms", async () => {
    render(<Page />);

    const premiumInput = screen.getByTestId("premium-count");
    const economyInput = screen.getByTestId("economy-count");
    const premiumRooms = screen.getByTestId("economy-rooms");
    const economyRooms = screen.getByTestId("economy-rooms");
    const premiumLabel = screen.getByTestId("premium-label");
    const economyLabel = screen.getByTestId("economy-label");
    const engageButton = screen.getByTestId("button-engage");

    expect(premiumInput).toHaveValue(3);
    expect(economyInput).toHaveValue(3);
    expect(premiumRooms.children).toHaveLength(3);
    expect(economyRooms.children).toHaveLength(3);

    act(() => {
      fireEvent.change(premiumInput, {
        target: { value: testCases[1].premium },
      });
      fireEvent.change(economyInput, {
        target: { value: testCases[1].economy },
      });
      engageButton.click();
    });

    expect(premiumLabel).toHaveTextContent(
      `Premium Rooms (${testResult[1].premium.count} - EUR ${testResult[1].premium.price})`
    );
    expect(economyLabel).toHaveTextContent(
      `Economy Rooms (${testResult[1].economy.count} - EUR ${testResult[1].economy.price}`
    );
  });

  it("renders with lack of economy rooms", async () => {
    render(<Page />);

    const premiumInput = screen.getByTestId("premium-count");
    const economyInput = screen.getByTestId("economy-count");
    const premiumRooms = screen.getByTestId("economy-rooms");
    const economyRooms = screen.getByTestId("economy-rooms");
    const premiumLabel = screen.getByTestId("premium-label");
    const economyLabel = screen.getByTestId("economy-label");
    const engageButton = screen.getByTestId("button-engage");

    expect(premiumInput).toHaveValue(3);
    expect(economyInput).toHaveValue(3);
    expect(premiumRooms.children).toHaveLength(3);
    expect(economyRooms.children).toHaveLength(3);

    act(() => {
      fireEvent.change(premiumInput, {
        target: { value: testCases[2].premium },
      });
      fireEvent.change(economyInput, {
        target: { value: testCases[2].economy },
      });
      engageButton.click();
    });

    expect(premiumLabel).toHaveTextContent(
      `Premium Rooms (${testResult[2].premium.count} - EUR ${testResult[2].premium.price})`
    );
    expect(economyLabel).toHaveTextContent(
      `Economy Rooms (${testResult[2].economy.count} - EUR ${testResult[2].economy.price}`
    );
  });
});
