/**
 * Context value for controlling DataTableDropdown visibility.
 */
export interface DataTableDropdownContextValue {
  /** Whether the dropdown popover is currently visible. */
  visible: boolean;
  /** Updates the dropdown visibility state. */
  setDropdownVisibility: (visible: boolean) => void;
}
