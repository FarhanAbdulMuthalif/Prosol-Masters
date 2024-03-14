import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";

export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export default function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  const [path] = getBezierPath(edgePathParams);

  return (
    <BaseEdge
      path={path}
      markerEnd={markerEnd}
      style={{ strokeWidth: 1.5, stroke: "black" }}
    />
  );
}
