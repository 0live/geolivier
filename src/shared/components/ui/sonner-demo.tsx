import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function SonnerDemo() {
  const {t} = useTranslation();
  return (
    <Button
      variant="outline"
      onClick={() =>{
        toast.info(t("demo.toast.title"), {
          description: t("demo.toast.description"),
          style: {
            background: "#faebccff",
            color: "#422006",
            border: "1px solid #fde047",
          },
          classNames: {
            description: "!text-[#422006]",
          },
          action: {
            label: t("demo.toast.undo"),
            onClick: () => console.log("Undo"),
          },
        })}
      }
    >
      {t("demo.showToast")}
    </Button>
  );
}