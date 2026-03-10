import { Button } from "@/shared/components/ui/button";
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/shared/components/ui/combobox";
import { useTranslation } from "react-i18next";

interface ProjectFiltersProps {
  availableTags: string[];
  availableYears: number[];
  selectedTags: string[];
  selectedYears: number[];
  setProjectFilters: (filters: { tags?: string[]; years?: number[] }) => void;
  clearProjectFilters: () => void;
}

export function ProjectFilters({
  availableTags,
  availableYears,
  selectedTags,
  selectedYears,
  setProjectFilters,
  clearProjectFilters,
}: ProjectFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-card/50 p-4 rounded-xl border border-primary/10 shadow-sm backdrop-blur-sm -mx-2 sm:mx-0">
      <div className="flex-1 min-w-[200px]">
        <Combobox
          multiple
          value={selectedTags}
          onValueChange={(val) => setProjectFilters({ tags: val as string[] })}
        >
          <ComboboxInput placeholder={t("filters.tags", "Select tags...")} />
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
      <div className="flex-1 min-w-[200px]">
        <Combobox
          multiple
          value={selectedYears.map(String)}
          onValueChange={(val) => setProjectFilters({ years: val.map(Number) })}
        >
          <ComboboxInput placeholder={t("filters.years", "Select years...")} />
          <ComboboxContent>
            <ComboboxList>
              {availableYears.map((year) => (
                <ComboboxItem key={year} value={String(year)}>
                  {year}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      {(selectedTags.length > 0 || selectedYears.length > 0) && (
        <Button variant="ghost" onClick={clearProjectFilters} className="sm:self-end">
          {t("filters.clear", "Clear")}
        </Button>
      )}
    </div>
  );
}
