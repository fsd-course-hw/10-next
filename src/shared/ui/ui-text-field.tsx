import clsx from "clsx";
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  PropsWithRef,
  useId,
} from "react";

export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
  textAreaProps?: PropsWithRef<TextareaHTMLAttributes<HTMLTextAreaElement>>;
  multiline?: boolean;
};

export function UiTextField({
  className,
  error,
  label,
  inputProps,
  multiline,
  textAreaProps,
}: UiTextFieldProps) {
  const id = useId();
  const inputClassName = clsx(
    multiline ? textAreaProps?.className : inputProps?.className,
    !multiline ? "h-10" : "py-2",
    "rounded border border-slate-300 focus:border-teal-600 px-2  outline-none",
    "dark:border-slate-700 dark:bg-slate-800 dark:focus:border-teal-600",
  );
  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea {...textAreaProps} id={id} className={inputClassName} />
      ) : (
        <input {...inputProps} id={id} className={inputClassName} />
      )}
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
