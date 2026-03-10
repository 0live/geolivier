import { Button } from "@/shared/components/ui/button";
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/shared/components/ui/combobox";
import { Slider } from "@/shared/components/ui/slider";
import { useTranslation } from "react-i18next";

interface BlogFiltersProps {
  availableTags: string[];
  selectedTags: string[];
  minTimestamp: number;
  maxTimestamp: number;
  dateRange: [number, number] | null;
  setBlogFilters: (filters: { tags?: string[]; dateRange?: [number, number] | null }) => void;
  clearBlogFilters: () => void;
}

export function BlogFilters({
  availableTags,
  selectedTags,
  minTimestamp,
  maxTimestamp,
  dateRange,
  setBlogFilters,
  clearBlogFilters,
}: BlogFiltersProps) {
  const { t } = useTranslation();
  const isFiltered = selectedTags.length > 0 || dateRange !== null;

  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-card/50 p-5 rounded-xl border border-primary/10 shadow-sm backdrop-blur-sm -mx-2 sm:mx-0 items-start sm:items-center">
      <div className="flex-1 min-w-[240px] w-full">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          {t("filters.tags", "Tags")}
        </p>
        <Combobox
          multiple
          value={selectedTags}
          onValueChange={(val) => setBlogFilters({ tags: val as string[] })}
        >
          <ComboboxInput placeholder={t("filters.tags_placeholder", "Select tags...")} />
          <ComboboxContent>
            <ComboboxList>
              {availableTags.map((tag) => (
                <ComboboxItem key={tag} value={tag}>
                  {tag}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      <div className="flex-1 min-w-[240px] px-2 w-full">
        <p className="text-sm font-medium text-muted-foreground mb-4">
          {t("filters.date", "Date Range")}
          {dateRange && (
            <span className="ml-2 text-xs text-primary font-normal">
              {new Date(dateRange[0]).toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              })}{" "}
              -{" "}
              {new Date(dateRange[1]).toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </p>
        <Slider
          min={minTimestamp}
          max={maxTimestamp}
          step={86400000 * 30} // roughly 1 month step
          value={dateRange || [minTimestamp, maxTimestamp]}
          onValueChange={(val) => setBlogFilters({ dateRange: val as [number, number] })}
          className="w-full"
        />
      </div>

      {isFiltered && (
        <Button variant="ghost" onClick={clearBlogFilters} className="sm:mt-6 w-full sm:w-auto">
          {t("filters.clear", "Clear")}
        </Button>
      )}
    </div>
  );
}
