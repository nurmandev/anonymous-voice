import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DURATION_OPTIONS, PlanFieldProps } from "@/types/booking";

export const PlanField = ({
  label,
  value,
  hasDropdown = false,
  onDurationChange,
}: PlanFieldProps) => {
  if (hasDropdown) {
    return (
      <div className="space-y-2 text-sm">
        <label className="block text-soft-paste font-semibold">{label}</label>
        <Select onValueChange={onDurationChange} defaultValue="10">
          <SelectTrigger className="border-soft-paste-light-active">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {DURATION_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      <label className="block text-soft-paste font-semibold">{label}</label>
      <div className="relative">
        <div className="flex items-center justify-between gap-2 px-4 py-2 border border-soft-paste-light-active rounded-lg">
          <span className="text-soft-paste-darker">{value}</span>
        </div>
      </div>
    </div>
  );
};
