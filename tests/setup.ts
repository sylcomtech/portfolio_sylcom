import "@testing-library/jest-dom/vitest";

// jsdom não implementa ResizeObserver/IntersectionObserver/matchMedia,
// mas o Framer Motion (whileInView, layout animations) usados pelos
// componentes do site (Footer, Projects, Hero, etc.) dependem deles.
// Sem esses mocks os testes de componentes que usam `whileInView` ou
// `layout` quebram com "ReferenceError: IntersectionObserver is not defined".

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof window !== "undefined") {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver =
      IntersectionObserverMock as unknown as typeof IntersectionObserver;
  }

  if (!window.matchMedia) {
    window.matchMedia = (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;
  }
}
