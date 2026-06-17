
import { Progress } from "./Progress";


interface ProgressbarProps {
  color?: string;
  count: string;
}


const Progressbar = (
  { color = "bg-primary-600", count }: ProgressbarProps
) => {
  return (
    <div className="max-w-2xl space-y-4">
      <Progress
        unstyled
        value={count ? parseInt(count) : 0}
        isActive
        classNames={{
          root: "h-4 bg-gray-150 dark:bg-dark-500",
          bar: "bg-gradient-to-r from-secondary-light to-info",
        }}
      >
        <span className="px-3 text-xs text-white">{count}%</span>
      </Progress>
    </div>
  );
};

export { Progressbar };
