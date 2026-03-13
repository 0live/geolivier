import { useTranslation } from "react-i18next";
import Timeline from "./Timeline";

export function AboutView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full max-w-4xl">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
      <Timeline />
    </div>
  );
}
