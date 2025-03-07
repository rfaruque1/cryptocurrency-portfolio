import { useState } from "react";
import { Input } from "../../UI/Input/Input";
import clsx from "clsx";

import styles from "./AutoComplete.module.scss";
import { AutoCompleteProps } from "./types";

export const AutoComplete = ({
  suggestions,
  onItemSelect,
  inputValue,
  suggestionsToRemove,
  placeholder,
  suggestionValid,
}: AutoCompleteProps) => {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [value, setValue] = useState(inputValue || "");

  const suggestionsToRemoveIds = new Set(
    suggestionsToRemove?.map((item) => item.id)
  );

  const filteredSuggestions = suggestions
    .filter((suggestion) => !suggestionsToRemoveIds.has(suggestion.id))
    .filter((suggestion) =>
      suggestion.name.toLowerCase().includes(value.toLowerCase())
    );

  const handleBlur = () => {
    if (filteredSuggestions.length <= 0) {
      suggestionValid?.(false);
    } else {
      suggestionValid?.(true);
    }

    setTimeout(() => setOpenSuggestions(false), 100);
  };
  const handleFocus = () => setOpenSuggestions(true);

  const handleItemClick = (name: string, id: string) => {
    setValue(name);
    onItemSelect({ id, name });
    suggestionValid?.(true);
  };

  return (
    <div className={styles.container}>
      <Input
        classNames={styles.input}
        onChange={(value) => setValue(value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
        placeholder={placeholder}
      />
      {openSuggestions && (
        <ul
          className={clsx(styles.listContainer, {
            [styles.emptyList]: filteredSuggestions.length <= 0,
          })}
        >
          {filteredSuggestions.map(({ name, id }) => (
            <li
              key={id}
              onClick={() => handleItemClick(name, id)}
              className={styles.listItem}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
