export function Footer() {
  return (
    <footer className="flex border-t bg-card py-6 items-center justify-center mt-auto">
      <div className="container px-4 text-center text-sm text-muted-foreground md:px-6">
        © {new Date().getFullYear()} geolivier. All rights reserved.
      </div>
    </footer>
  );
}
