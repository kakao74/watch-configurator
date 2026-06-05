import React, { useCallback, useState } from "react";
import Menu from "../Menu";
import Viewer from "../Viewer";
import PublicViewer from "../Viewer/PublicViewer";
import GetFieldsOutput from "../Viewer/ViewerWrapper/GetFieldsOutput";
import Configuration from "./Configuration";


interface AppProps {
  integrationUrl: string;
  defaultConfiguration: Configuration;
}


function App(props: AppProps) {

  const [configuration, setConfiguration] = useState<Configuration>(props.defaultConfiguration);
  const [fields, setFields] = useState<GetFieldsOutput["fields"]>();

  const onReady = useCallback(async (viewer: PublicViewer) => {
    // eslint-disable-next-line no-console
    console.log("viewer", viewer);
    setFields((await viewer.getFields()).fields);
  }, []);

  const onError = useCallback((error: Error) => {
    // eslint-disable-next-line no-console
    console.log("error", error);
  }, []);

  const handleConfigurationChange = (newConfiguration: Configuration) => {
    setConfiguration(currentConfiguration => ({
      ...currentConfiguration,
      ...newConfiguration
    }));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-watch-bg">
      <Viewer
        release={{
          integrationUrl : props.integrationUrl,
          isPublic : true
        }}
        configuration={configuration}
        renderLoader={progress => progress < 100 && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-watch-bg/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-5">
              <div className="relative h-16 w-16">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="#2a3444"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="#c9a962"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 1.76} 176`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-watch-gold">
                  {progress}
                  %
                </span>
              </div>
              <p className="font-display text-lg tracking-wide text-stone-300">
                Loading timepiece
              </p>
            </div>
          </div>
        )}
        onReady={onReady}
        onError={onError}
      />

      <aside className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-full max-w-sm flex-col p-4 sm:p-6">
        <div className="pointer-events-auto flex h-full flex-col overflow-hidden rounded-2xl border border-watch-border/60 bg-watch-panel/90 shadow-panel backdrop-blur-md">
          <header className="border-b border-watch-border/50 px-5 py-5 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-watch-gold">
              Atelier
            </p>
            <h1 className="font-display text-2xl font-light tracking-wide text-stone-100 sm:text-3xl">
              Watch Configurator
            </h1>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            <Menu
              fields={fields}
              configuration={configuration}
              onConfigurationChange={handleConfigurationChange}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
