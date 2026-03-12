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
  selectedTags: string[];
  setProjectFilters: (filters: { tags?: string[] }) => void;
  clearProjectFilters: () => void;
}

export function ProjectFilters({
  availableTags,
  selectedTags,
  setProjectFilters,
}: ProjectFiltersProps) {
  const { t } = useTranslation();
  const tagsAnchor = useComboboxAnchor();

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
    </div>
  );
}
