import React, { useEffect } from "react";
import PublicViewer from "./PublicViewer";
import Release from "./Release";
import useViewer from "./useViewer";


interface ViewerProps {
  release: Release;
  configuration: {
    [key: string]: string;
  };
  divId?: string;
  viewpoint?: {
    targetX: number;
    targetY: number;
    targetZ: number;
    distance: number;
    yaw: number;
    pitch: number;
    focalLength: number;
    distanceRestrictionEnabled: boolean;
    yawRestrictionEnabled: boolean;
    pitchRestrictionEnabled: boolean;
    smartCameraEnabled: boolean;
    distanceRestrictionMin?: number;
    distanceRestrictionMax?: number;
    yawRestrictionOffset?: number;
    yawRestrictionAngle?: number;
    pitchRestrictionOffset?: number;
    pitchRestrictionAngle?: number;
  };
  renderLoader?(progress: number): React.ReactNode;
  onReady?(viewer: PublicViewer): void;
  onError?(error: Error): void;
}


function Viewer(props: ViewerProps) {

  const {
    release,
    configuration,
    viewpoint,
    divId = "apviz-3d-viewer",
    renderLoader = () => null,
    onReady = () => {},
    onError = () => {}
  } = props;

  const [state] = useViewer(release, divId, onError);

  /**
   * Handles on ready callback.
   */
  useEffect(() => {
    if (state.viewer) {
      onReady(new PublicViewer(state.viewer));
    }
  }, [onReady, state.viewer]);

  /**
   * Handles configuration updates.
   */
  useEffect(() => {
    if (state.viewer) {
      state.viewer.updateConfiguration({ configuration }).catch(onError);
    }
  }, [onError, state.viewer, configuration]);

  /**
   * Handles viewpoint updates.
   */
  useEffect(() => {
    if (state.viewer && viewpoint) {
      state.viewer.setViewpoint({ viewpoint }).catch(onError);
    }
  }, [onError, state.viewer, viewpoint]);

  return (
    <div
      id={divId}
      className="relative h-full w-full bg-gradient-to-br from-watch-bg via-[#0e1219] to-[#121820]"
    >
      {renderLoader(state.progress)}
    </div>
  );
}

export default Viewer;
