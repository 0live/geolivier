import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxMultiInput,
  useComboboxAnchor
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
}: ProjectFiltersProps) {
  const { t } = useTranslation();
  const tagsAnchor = useComboboxAnchor();
  const yearsAnchor = useComboboxAnchor();

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-card/50 p-4 rounded-xl border border-primary/10 shadow-sm backdrop-blur-sm -mx-2 sm:mx-0">
      <div className="flex-1 min-w-[200px]">
        <Combobox
          multiple
          value={selectedTags}
          onValueChange={(val) => setProjectFilters({ tags: val as string[] })}
        >
          <ComboboxMultiInput 
            ref={tagsAnchor}
            values={selectedTags}
            showClear
            placeholder={selectedTags.length > 0 ? "" : t("filters.tags", "Select tags...")} 
          />
          <ComboboxContent anchor={tagsAnchor}>
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
          <ComboboxMultiInput 
            ref={yearsAnchor}
            values={selectedYears.map(String)}
            showClear
            placeholder={selectedYears.length > 0 ? "" : t("filters.years", "Select years...")} 
          />
          <ComboboxContent anchor={yearsAnchor}>
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
    </div>
  );
}
