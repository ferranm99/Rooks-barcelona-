import { renderHook, act } from "@testing-library/react-hooks";
import { useMultiSelectableList } from "@/hooks/useMultiSelectableList";

jest.spyOn(console, "warn").mockImplementation(jest.fn);

describe("useMultiSelectableList", () => {
  afterEach(() => {
    (console.warn as jest.Mock).mockReset();
  });

  const { result } = renderHook(() => useMultiSelectableList([1, 2, 3]));

  describe("matchSelection", () => {
    it("console.warn", () => {
      expect.hasAssertions();
      act(() => {
        result.current[1].matchSelection({ index: 1, value: 2 });
      });
      expect(console.warn).toHaveBeenNthCalledWith(
        1,
        "matchSelection. Expected either index or value to be provided. However all were provided"
      );
      act(() => {
        result.current[1].matchSelection({});
      });
      expect(console.warn).toHaveBeenNthCalledWith(
        2,
        "matchSelection. index , value are all undefined."
      );
    });

    it("match index", () => {
      expect.hasAssertions();
      const { result: internalResult } = renderHook(() =>
        useMultiSelectableList([1, 2, 3], [0, 1], true)
      );
      expect(internalResult.current[1].matchSelection({ index: 0 })).toBe(true);
      expect(internalResult.current[1].matchSelection({ index: 2 })).toBe(
        false
      );
    });

    it("match value", () => {
      expect.hasAssertions();
      const { result: internalResult } = renderHook(() =>
        useMultiSelectableList([1, 2, 3], [0, 1], true)
      );
      expect(internalResult.current[1].matchSelection({ value: 1 })).toBe(true);
      expect(internalResult.current[1].matchSelection({ value: 3 })).toBe(
        false
      );
    });
  });

  describe("updateSelections", () => {
    it("set by index", () => {
      expect.hasAssertions();
      const { result: internalResult } = renderHook(() =>
        useMultiSelectableList([1, 2, 3], [0], true)
      );

      act(() => {
        internalResult.current[1].updateSelections({ indices: [1, 2] })();
      });
      const [currentIndices, currentValues] = internalResult.current[0];
      expect(currentIndices).toEqual([1, 2]);
      expect(currentValues).toEqual([2, 3]);
    });
    it("set by value", () => {
      expect.hasAssertions();
      const { result: internalResult } = renderHook(() =>
        useMultiSelectableList([1, 2, 3], [0], true)
      );

      act(() => {
        internalResult.current[1].updateSelections({ values: [2, 3] })();
      });
      const [currentIndices, currentValues] = internalResult.current[0];
      expect(currentIndices).toEqual([1, 2]);
      expect(currentValues).toEqual([2, 3]);
    });

    it("set by value fail", () => {
      expect.hasAssertions();
      const [beforeIndices, beforeValue] = result.current[0];
      act(() => {
        result.current[1].updateSelections({ values: [22] })();
      });
      const [afterIndices, afterValue] = result.current[0];
      expect(console.warn).toHaveBeenNthCalledWith(
        1,
        "updateSelections failed. Do the values exist in the list?"
      );
      (console.warn as jest.Mock).mockReset();

      // default
      expect(beforeIndices).toEqual(afterIndices);
      expect(beforeValue).toEqual(afterValue);
    });

    it("console.warn", () => {
      expect.hasAssertions();
      act(() => {
        result.current[1].updateSelections({ indices: [1], values: [2] })();
      });
      expect(console.warn).toHaveBeenNthCalledWith(
        1,
        "updateSelections. Expected either indices or values to be provided. However all were provided"
      );
      act(() => {
        result.current[1].updateSelections({})();
      });
      expect(console.warn).toHaveBeenNthCalledWith(
        2,
        "updateSelections. indices , values are all undefined."
      );
    });
  });

  describe("toggleSelection", () => {
    it("should toggle selected index", () => {
      expect.hasAssertions();
      const { result: internalResult } = renderHook(() =>
        useMultiSelectableList([1, 2, 3], [0], true)
      );
      act(() => {
        internalResult.current[1].toggleSelection({ index: 0 })();
      });
      const [currentIndices, currentValues] = internalResult.current[0];
      expect(currentIndices).toEqual([]);
      expect(currentValues).toEqual([]);
    });

    it("shouldn't toggle selected index when allowUnselected = false", () => {
      expect.hasAssertions();
      const { result: internalResult } = renderHook(() =>
        useMultiSelectableList([1, 2, 3], [0], false)
      );
      const [beforeIndices, beforeValues] = internalResult.current[0];
      act(() => {
        internalResult.current[1].toggleSelection({ index: 0 })();
      });
      const [afterIndex, afterValue] = internalResult.current[0];

      // default
      expect(beforeIndices).toBe(afterIndex);
      expect(beforeValues).toBe(afterValue);
      expect(console.warn).toHaveBeenNthCalledWith(
        1,
        "toggleSelection failed. Do the values exist in the list?"
      );
      (console.warn as jest.Mock).mockReset();
    });
    it("should toggle selected value", () => {
      expect.hasAssertions();
      const { result: internalResult } = renderHook(() =>
        useMultiSelectableList([1, 2, 3], [0], true)
      );
      act(() => {
        internalResult.current[1].toggleSelection({ value: 1 })();
      });

      const [currentIndices, currentValues] = internalResult.current[0];

      expect(currentIndices).toEqual([]);
      expect(currentValues).toEqual([]);
    });

    it("console.warn", () => {
      expect.hasAssertions();
      act(() => {
        result.current[1].toggleSelection({ index: 1, value: 2 })();
      });
      expect(console.warn).toHaveBeenNthCalledWith(
        1,
        "toggleSelection. Expected either index or value to be provided. However all were provided"
      );
      act(() => {
        result.current[1].toggleSelection({})();
      });
      expect(console.warn).toHaveBeenNthCalledWith(
        2,
        "toggleSelection. index , value are all undefined."
      );
    });
  });
});
