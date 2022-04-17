import React, { useState } from "react";
import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { ClientStyleContext } from "./context";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function createEmotionCache() {
  return createCache({ key: "css" });
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
