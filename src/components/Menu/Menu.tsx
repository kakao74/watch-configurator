import React from "react";
import Configuration from "../App/Configuration";
import GetFieldsOutput from "../Viewer/ViewerWrapper/GetFieldsOutput";


function sanitizeText(text: string): string {
  return text.replace("_", " ");
}


interface MenuProps {
  configuration: Configuration
  onConfigurationChange(configuration: Configuration): void;
  fields?: GetFieldsOutput["fields"];
}


function Menu(props: MenuProps) {

  if (!props.fields) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-watch-border border-t-watch-gold" />
        <p className="text-sm text-watch-muted">
          Preparing options…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {props.fields.map(field => (
        <section
          key={field.key}
          className="flex flex-col gap-3"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-watch-muted">
            {sanitizeText(field.key)}
          </h2>
          <div className="flex flex-wrap gap-2">
            {field.values.map(({ value }) => {
              const isSelected = props.configuration[field.key] === value;

              return (
                <button
                  key={value}
                  type="button"
                  className={[
                    "rounded-lg border px-3 py-2 text-xs font-medium capitalize",
                    "transition-all duration-200 focus:outline-none focus-visible:ring-2",
                    "focus-visible:ring-watch-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-watch-panel",
                    isSelected
                      ? "border-watch-gold bg-watch-gold text-watch-bg shadow-gold"
                      : "border-watch-border bg-watch-surface text-stone-300 hover:border-watch-gold/40 hover:text-stone-100"
                  ].join(" ")}
                  onClick={() => props.onConfigurationChange({
                    [field.key] : value
                  })}
                >
                  {sanitizeText(value)}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Menu;
