import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useId, useState } from "react";
import { ChevronUpDownIcon } from "./ui-icons";

type BaseOption = {
  id: string | number;
};

export type UiMultipleSelectProps<T extends BaseOption> = {
  className?: string;
  options?: T[];
  value?: T[];
  onChange: (value: T[]) => void;
  label?: string;
  error?: string;
  getLabel: (value: T) => string;
  renderPreview?: (value?: T[]) => ReactNode;
  renderOption?: (
    value: T,
    o: { selected?: boolean; active?: boolean },
  ) => ReactNode;
};

export function UiMultipleSelect<T extends BaseOption>({
  onChange,
  value,
  options,
  className,
  label,
  error,
  getLabel,
  renderPreview,
  renderOption = (o) => getLabel(o),
}: UiMultipleSelectProps<T>) {
  const id = useId();
  const [query, setQuery] = useState("");

  const filteredOptions = options?.filter((option) =>
    getLabel(option).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <Combobox value={value} onChange={onChange} multiple>
        <div className="relative rounded border border-slate-300 focus-within:border-teal-600 h-10 outline-none flex items-center ">
          {renderPreview?.(value) ??
            value?.map((v, i) => (
              <div key={i} className="px-2 whitespace-nowrap">
                {getLabel(v)}
              </div>
            ))}
          <Combobox.Input
            className={
              "pl-2 pr-2 h-full w-full outline-none grow bg-transparent"
            }
            id={id}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Combobox.Button>
            <ChevronUpDownIcon
              className="h-5 w-10 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          <Combobox.Options className="absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredOptions?.map((option) => (
              <Combobox.Option
                key={option.id ?? "empty"}
                value={option}
                className={({ active, selected }) =>
                  clsx(
                    "relative flex cursor-default select-none p-4 ",
                    active ? "bg-teal-600 text-white" : "text-slate-900",
                    selected && "bg-teal-500 text-white",
                  )
                }
              >
                {(params) => <>{renderOption(option, params)}</>}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
