"use client";
// CustomNode.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { Menu, MenuItem } from "@mui/material";
import { KeyboardEvent, useContext, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./CustomNode.scss";
import FlowConfigDialog from "./_FlowConfigDialog";

const CustomNode = (props: NodeProps) => {
  const contextDataHub = useContext(UseContextHook);
  const { ThemeColor } = contextDataHub;
  const [NodeText, setNodeText] = useState("");
  const [ConfigDialogShow, setConfigDialogShow] = useState(false);
  const [editNodeNameDisplay, seteditNodeNameDisplay] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.id === "Start" || props.id === "End") return;
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemStyleTwo = {
    color: "#924E4E",
    fontSize: "12px",
    display: "flex",
    gap: "5px",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (editNodeNameDisplay) {
        props.data.editNodes(NodeText, props.id);
        seteditNodeNameDisplay(false);
      } else {
        props.data.setNodes(NodeText, props.id);
        setNodeText(""); // Clear the input field after setting the node name
      }
    }
  };

  return (
    <div
      className={
        props.data?.label === "Start" || props.data?.label === "End"
          ? "node-radius-circle"
          : "node-radius-box"
      }
      style={
        props.data?.label === "Start" || props.data?.label === "End"
          ? { backgroundColor: ThemeColor.primaryColor }
          : {}
      }
      onContextMenu={handleClick}
      onClick={() => {
        props.data.getData(props.id, props.data.label);
      }}
    >
      {props.data?.label !== "Start" ? (
        <Handle
          type="source"
          position={Position.Left}
          id="recieve"
          style={{ background: "#555" }}
          onConnect={(params) => {
            console.log(params.source);
            console.log(params);
          }}
        />
      ) : (
        ""
      )}
      {props.data.label === "node" || editNodeNameDisplay ? (
        <OutlineTextField
          type="text"
          className="node-input"
          sx={{ border: "none", outline: "none" }}
          value={NodeText}
          onChange={(e) => {
            setNodeText(e.target.value);
          }}
          onBlur={() => seteditNodeNameDisplay(false)}
          onKeyDown={onEnterHandler}
          placeholder="Enter name"
        />
      ) : (
        <p>{props.data.label}</p>
      )}
      {props.data?.label !== "End" ? (
        <Handle
          type="source"
          position={Position.Right}
          id="set"
          style={{ background: "#555" }}
          onConnect={(params) => {
            console.log(params.target);
            console.log(params);
          }}
        />
      ) : (
        ""
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            seteditNodeNameDisplay(true);
            setNodeText(props.data.label);
          }}
          sx={menuItemStyleTwo}
        >
          Edit Name
        </MenuItem>
        <MenuItem
          onClick={() => {
            setConfigDialogShow(!ConfigDialogShow);
            handleClose();
          }}
          sx={menuItemStyleTwo}
        >
          Create Rules
        </MenuItem>
        <MenuItem onClick={handleClose} sx={menuItemStyleTwo}>
          Copy Rules
        </MenuItem>
        <MenuItem onClick={handleClose} sx={menuItemStyleTwo}>
          Paste Rules
        </MenuItem>
        <MenuItem onClick={handleClose} sx={menuItemStyleTwo}>
          Edit Rules
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log(props.data);
            console.log(props.id);
            props.data.onDelete(props.id);
          }}
          sx={menuItemStyleTwo}
        >
          Delete Rules
        </MenuItem>
      </Menu>
      <FlowConfigDialog
        open={ConfigDialogShow}
        handleClose={() => {
          setConfigDialogShow(!ConfigDialogShow);
        }}
        content={props.data.label}
        handleOk={() => {
          setConfigDialogShow(!ConfigDialogShow);
        }}
      />
    </div>
  );
};

export default CustomNode;
