import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function AboutView() {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>About Feature</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">{t("hello")}</p>
        <p className="text-muted-foreground mt-4">
          This is a demonstration of the vertical slice architecture.
        </p>
      </CardContent>
    </Card>
  );
}
