import { Icons } from "@/shared/components/ui/icons";

export const SocialLinks = ({ iconSizeClass = "h-5 w-5" }: { iconSizeClass?: string }) => (
  <>
    <a 
      href="https://github.com/0live" 
      target="_blank" 
      rel="noreferrer" 
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="GitHub"
    >
      <Icons.github className={iconSizeClass} />
    </a>
    <a 
      href="https://linkedin.com/in/olivier-ribiere" 
      target="_blank" 
      rel="noreferrer" 
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="LinkedIn"
    >
      <Icons.linkedin className={iconSizeClass} />
    </a>
    <a 
      href="mailto:olivier.ribiere@protonmail.com" 
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Email"
    >
      <Icons.mail className={iconSizeClass} />
    </a>
  </>
);