export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <span>
          Syl<span className="text-gradient font-medium">com</span> — sites e apps
          sob medida
        </span>
        <span>© {new Date().getFullYear()} Sylcom. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
