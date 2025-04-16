import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SortableItemHandle } from "./SortableItemHandle";
import { useSortableItemContext } from "../SortableItem/SortableItemContext";

// Mock the context hook
jest.mock("../SortableItem/SortableItemContext", () => ({
  useSortableItemContext: jest.fn(),
}));

const mockContextValue = {
  setActivatorNodeRef: jest.fn(),
  attributes: { "aria-label": "drag handle" },
  listeners: { onMouseDown: jest.fn() },
};

describe("GIVEN <SortableItemHandle />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSortableItemContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      render(
        <SortableItemHandle>
          <div data-testid="test-child">Handle Content</div>
        </SortableItemHandle>
      );

      expect(screen.getByTestId("test-child")).toBeInTheDocument();
      expect(screen.getByText("Handle Content")).toBeInTheDocument();
    });

    it("SHOULD use context values correctly", () => {
      render(
        <SortableItemHandle>
          <div>Handle Content</div>
        </SortableItemHandle>
      );

      const handle = screen.getByText("Handle Content").parentElement;
      expect(handle).toHaveAttribute("aria-label", "drag handle");
      expect(handle).toHaveClass("nimbus-box_cursor-grab-xs__cklfii119");
    });

    it("SHOULD set proper ref from context", () => {
      render(
        <SortableItemHandle>
          <div>Handle Content</div>
        </SortableItemHandle>
      );

      expect(mockContextValue.setActivatorNodeRef).toHaveBeenCalled();
    });
  });

  describe("WHEN context is not provided", () => {
    it("SHOULD throw error", () => {
      // Mock console.error to avoid React error logging
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      (useSortableItemContext as jest.Mock).mockImplementation(() => {
        throw new Error("Context not found");
      });

      expect(() =>
        render(
          <SortableItemHandle>
            <div>Handle Content</div>
          </SortableItemHandle>
        )
      ).toThrow("Context not found");

      consoleSpy.mockRestore();
    });
  });

  describe("WHEN checking component properties", () => {
    it("SHOULD have correct displayName", () => {
      expect(SortableItemHandle.displayName).toBe("SortableItemHandle");
    });
  });
}); 