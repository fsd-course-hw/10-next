import clsx from "clsx";
import Image from "next/image";

export function UiImageSelect<T>({
  className,
  onChange,
  value,
  getSrc,
  label,
  images,
  error,
}: {
  className?: string;
  label?: string;
  error?: string;
  value?: T;
  onChange?: (value: T) => void;
  images: T[];
  getSrc: (value: T) => string;
}) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div className="text-md">{label}</div>
      <div className="flex gap-2">
        {images.map((image, i) => (
          <button
            className={clsx(image === value && "ring-2 ring-teal-600")}
            key={i}
            type="button"
            onClick={() => onChange?.(image)}
          >
            <Image className="w-12 h-12" alt="" src={getSrc(image)} />
          </button>
        ))}
      </div>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
