import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/logo-mark.svg"
            alt="Sylcom"
            width={103}
            height={30}
            className="h-6 w-auto"
          />
          <span>— sites e apps sob medida</span>
        </div>
        <span>© {new Date().getFullYear()} Sylcom. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
