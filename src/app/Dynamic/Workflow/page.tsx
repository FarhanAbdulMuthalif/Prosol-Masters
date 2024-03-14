"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import TextComp from "@/components/TextComp/TextComp";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  Edge,
  MarkerType,
  Node,
  OnConnect,
  Panel,
  ReactFlowInstance,
  ReactFlowProvider,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./(WorkflowComponents)/_CustomNode";
import CustomEdge from "./(WorkflowComponents)/_FloatingEdge";
import "./style.scss";
export default function Workflow() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowContainerRef = useRef<HTMLDivElement | null>(null);
  const [SelectedId, setSelectedId] = useState({ id: "", name: "" });
  const contextDataHub = useContext(UseContextHook);
  const {
    setSelectedNodeData,
    outgoing: outgoingNodes,
    incoming: incomingNodes,
    ThemeColor,
  } = contextDataHub;
  const initialNodes = [
    {
      id: "Start",
      type: "textUpdater",
      position: { x: 50, y: 200 },
      data: {
        label: "Start",
        onDelete: onDeleteNode,
        setNodes: nodeNameCreateHandler,
        editNodes: editNodeNameHandler,
        getData: getDataHandler,
        edges: edges,
      },
    },
    {
      id: "End",
      type: "textUpdater",
      position: { x: 720, y: 200 },
      data: {
        label: "End",
        onDelete: onDeleteNode,
        setNodes: nodeNameCreateHandler,
        editNodes: editNodeNameHandler,
        getData: getDataHandler,
        edges: edges,
      },
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  function getDataHandler(nodeId: string, nodeName: string) {
    setSelectedId({ id: nodeId, name: nodeName });
  }
  useEffect(() => {
    function getSelectHandler() {
      const incomingNodesMap = new Map<string, string[]>();
      const outgoingNodesMap = new Map<string, string[]>();

      edges.forEach((edge) => {
        const { source, target } = edge;
        if (!incomingNodesMap.has(target)) {
          incomingNodesMap.set(target, [source]);
        } else {
          incomingNodesMap.get(target)!.push(source);
        }

        if (!outgoingNodesMap.has(source)) {
          outgoingNodesMap.set(source, [target]);
        } else {
          outgoingNodesMap.get(source)!.push(target);
        }
      });
      const incomingEdge = incomingNodesMap.get(SelectedId.id);
      const outgoingEdge = outgoingNodesMap.get(SelectedId.id);
      console.log("+++++++incoming+++++++");
      console.log(incomingEdge);
      console.log("+++++++outgoing+++++++");
      console.log(outgoingEdge);
      // Create a new array with labels based on the matching id
      const labelsOutgoingArray = outgoingEdge?.map((id) => {
        const node = nodes.find((node) => node.id === id);
        return node ? node.data.label : ""; // Use null if no matching id is found
      });
      const labelsIncoingArray = incomingEdge?.map((id) => {
        const node = nodes.find((node) => node.id === id);
        return node ? node.data.label : ""; // Use null if no matching id is found
      });

      console.log(labelsOutgoingArray);
      console.log(labelsIncoingArray);
      if (setSelectedNodeData) {
        setSelectedNodeData({
          incoming: labelsIncoingArray ?? [],
          outgoing: labelsOutgoingArray ?? [],
        });
      }
    }
    getSelectHandler();
  }, [SelectedId, edges, nodes, setSelectedNodeData]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance?.toObject();
      console.log(flow);
      console.log(rfInstance);
      localStorage.setItem("prosol", JSON.stringify(flow));
    }
  }, [rfInstance]);
  const nodeTypes = useMemo(() => ({ textUpdater: CustomNode }), []);
  const auth = UseAuth();
  if (!auth) {
    return null;
  }
  function onDeleteNode(nodeId: string) {
    console.log(nodes);
    console.log(nodes.filter((node) => node.id !== nodeId));
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      )
    );
  }
  function nodeNameCreateHandler(data: string, id: string) {
    const nodeIndexToUpdate = nodes.findIndex(
      (node: { id: string }) => node.id === id
    );
    console.log("printing...");
    console.log(nodeIndexToUpdate);
    console.log(nodes);
    console.log(id);
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        if (node.id === id) {
          // If the node ID matches the target ID, update its data
          return {
            ...node,
            data: {
              ...node.data,
              label: data,
            },
          };
        }
        return node;
      });
    });
  }
  function editNodeNameHandler(name: string, id: string) {
    console.log("id=" + id);
    console.log("name=" + name);
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        if (node.id === id) {
          // If the node ID matches the target ID, update its data
          return {
            ...node,
            data: {
              ...node.data,
              label: name,
            },
          };
        }
        return node;
      });
    });
  }

  const onRestore = () => {
    const flow = JSON.parse(localStorage.getItem("prosol") ?? "");

    if (flow) {
      if (flow.nodes && flow.edges) {
        // Provide default or placeholder functions for onDelete, setNodes, and editNodes
        const restoredNodes = flow.nodes.map((node: Node) => ({
          ...node,
          data: {
            ...node.data,
            onDelete: onDeleteNode, // Placeholder function
            setNodes: nodeNameCreateHandler, // Placeholder function
            editNodes: editNodeNameHandler, // Placeholder function
            getData: getDataHandler, // Placeholder function

            edges: edges,
            nodes: nodes,
          },
        }));

        setNodes(restoredNodes);
        setEdges(flow.edges);
        rfInstance?.fitView();
      }
    }
  };

  const onConnect: OnConnect = (params) => {
    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: Math.random().toString() || "",
        source: params.source ?? "",
        target: params.target ?? "",
        sourceHandle: params.sourceHandle ?? "default", // provide a default handle
        targetHandle: params.targetHandle ?? "default", // provide a default handle
        type: "textUpdater",
        markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
      },
    ]);

    console.log(
      `Connected from node ${params.source} to node ${params.target}`
    );
  };

  const defaultEdgeOptions = {
    style: { strokeWidth: 1.5, stroke: "black" },
    type: "textUpdater",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "black",
    },
  };
  const edgeTypes = {
    textUpdater: CustomEdge,
  };

  const proOptions = { hideAttribution: true };
  const handleLoad = (reactFlowInstance: ReactFlowInstance) => {
    console.log(edges);
    setRfInstance(reactFlowInstance);
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const x = event.clientX;
    const y = event.clientY;

    if (reactFlowContainerRef.current) {
      const reactFlowBounds =
        reactFlowContainerRef.current.getBoundingClientRect();
      const positionX = x - reactFlowBounds.left;
      const positionY = y - reactFlowBounds.top;

      const newNode = {
        id: Math.random().toString(),
        type: "textUpdater",
        position: { x: positionX, y: positionY },
        data: {
          label: "node",
          onDelete: onDeleteNode,
          setNodes: nodeNameCreateHandler,
          edges: edges,
          nodes: nodes,
          editNodes: editNodeNameHandler,
          getData: getDataHandler,
        },
      };
      setNodes((prev) => [...prev, newNode]);
    }
  };

  const onDragStart = (event: React.DragEvent<HTMLParagraphElement>) => {
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <ReactFlowProvider>
      <main className="worflow-module-wrapper">
        <div className="addModuleWrapper">
          <div
            className="draggbleNode"
            onDragStart={(event) => onDragStart(event)}
            draggable
          >
            <TextComp
              variant="subTitle"
              style={{ color: ThemeColor.primaryColor }}
            >
              ADD NODE +
            </TextComp>
          </div>
          <>
            {SelectedId.id.length > 0 ? (
              <div>
                <div className="SelectedNode">
                  <TextComp
                    variant="bodySmall"
                    style={{
                      alignSelf: "flex-start",
                      color: "#6f6f6f",
                      fontWeight: "600",
                    }}
                  >
                    Selected Node:
                  </TextComp>

                  <TextComp
                    variant="subTitle"
                    style={{ color: ThemeColor.primaryColor }}
                  >
                    {SelectedId.name.toUpperCase()} NODE
                  </TextComp>
                </div>
                <div className="SelectedNode">
                  <TextComp
                    variant="bodySmall"
                    style={{
                      alignSelf: "flex-start",
                      color: "#6f6f6f",
                      fontWeight: "600",
                    }}
                  >
                    Incoming Node:
                  </TextComp>

                  <TextComp
                    variant="subTitle"
                    style={{ color: ThemeColor.primaryColor }}
                  >
                    {incomingNodes.length < 1
                      ? "No Nodes"
                      : incomingNodes.join(" Node, ")}{" "}
                    {incomingNodes.length < 1 ? "" : "Node"}
                  </TextComp>
                </div>
                <div className="SelectedNode">
                  <TextComp
                    variant="bodySmall"
                    style={{
                      alignSelf: "flex-start",
                      color: "#6f6f6f",
                      fontWeight: "600",
                    }}
                  >
                    Outgoing Node:
                  </TextComp>

                  <TextComp
                    variant="subTitle"
                    style={{ color: ThemeColor.primaryColor }}
                  >
                    {outgoingNodes.length < 1
                      ? "No Nodes"
                      : outgoingNodes.join(" Node, ")}
                    {outgoingNodes.length < 1 ? "" : " Node"}
                  </TextComp>
                </div>
              </div>
            ) : (
              <p>no nodes selected</p>
            )}
          </>
        </div>

        <div
          style={{
            height: "100%",

            flexGrow: 1,
            backgroundColor: "#E9E9F7",
            transition: "all 300s ease",
          }}
          id="reactflow-container" // Give it a unique ID
          ref={reactFlowContainerRef}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            proOptions={proOptions}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onInit={handleLoad} //
            fitView
            attributionPosition="top-right"
            connectionMode={ConnectionMode.Loose}
          >
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
            <Controls
              style={{ display: "flex", flexDirection: "column", gap: "1px" }}
            />
            <Panel
              position="top-right"
              style={{ display: "flex", gap: "10px" }}
            >
              <FillButton onClick={onSave}>Save</FillButton>
              <FillButton onClick={onRestore}>Restore</FillButton>
            </Panel>
          </ReactFlow>
        </div>
      </main>
    </ReactFlowProvider>
  );
}
