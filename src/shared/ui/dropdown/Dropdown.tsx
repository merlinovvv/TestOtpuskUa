import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import clsx from "clsx";
import { X } from "lucide-react";
import { useRef, useState, type FC } from "react";
import { Loader } from "../loader/Loader";
import styles from "./Dropdown.module.scss";

interface DropdownOption {
  [key: string]: any;
}

interface DropdownProps<T extends DropdownOption = DropdownOption> {
  value: string | number;
  onChange: (value: string | number) => void;
  onSearch?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  options?: T[];
  optionLabel?: keyof T;
  optionValue?: keyof T;
  optionIcon?: keyof T;
  loading?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
  value,
  onChange,
  onSearch,
  onOpenChange,
  placeholder,
  options = [],
  optionLabel = "name",
  optionValue = "value",
  optionIcon = "icon",
  loading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "pointerdown" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const selectedItem = options.find((o) => o[optionValue] === value); // обране значення

  const handleSearch = (v: string) => {
    // обробка пошуку
    setSearch(v);
    onSearch?.(v);
    if (!open) handleOpenChange(true); // зберігаємо стан відкритого дропдауну при пошуку
  };

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps({
        onClick: () => inputRef.current?.focus(),
      })}
      className={styles.dropdown}
    >
      {/* лейбл дропдауну */}
      <div className={styles.dropdown__label}>
        {/* обране значення */}
        {selectedItem && (
          <div className={styles.dropdown__selected}>
            <div className={styles.dropdown__selected_info}>
              {selectedItem[optionIcon]}
              <span className={styles.dropdown__selected_text}>
                {selectedItem[optionLabel]}
              </span>
            </div>
            <X
              onClick={() => onChange("")}
              className={styles.dropdown__remove}
            />
          </div>
        )}

        {/* пошук */}
        <input
          onKeyDown={(e) => e.stopPropagation()}
          ref={inputRef}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className={clsx(
            styles.dropdown__input,
            !!selectedItem && styles["dropdown__input--has-value"]
          )}
          placeholder={placeholder}
        />
      </div>

      {/* випадаючий список */}
      {open && (
        <ul
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles.dropdown__menu}
          {...getFloatingProps()}
        >
          {/* стан завантаження */}
          {loading ? (
            <li className={styles["dropdown__menu-loader-wrapper"]}>
              <Loader
                className={styles["dropdown__menu-loader"]}
                size="small"
              />
            </li>
          ) : options.length === 0 ? (
            // повідомлення про відсутність опцій
            <li
              className={clsx(
                styles.dropdown__item,
                styles["dropdown__item--empty"]
              )}
            >
              Список пустий
            </li>
          ) : (
            // список опцій
            options.map((option) => (
              <li
                key={option[optionValue]}
                onClick={() => {
                  onChange(option[optionValue]);
                  handleOpenChange(false);
                  setSearch("");
                }}
                className={clsx(
                  styles.dropdown__item,
                  selectedItem?.[optionValue] === option[optionValue] &&
                    styles["dropdown__item--selected"]
                )}
              >
                {option[optionIcon] && (
                  <span className={styles.dropdown__icon}>
                    {option[optionIcon]}
                  </span>
                )}
                {option[optionLabel]}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
