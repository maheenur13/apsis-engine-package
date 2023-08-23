
import { Button as AntdButton } from "antd";
import type { ButtonProps } from "antd";



export const Button = (props:ButtonProps) => {
  return <AntdButton {...props}>{props.children || "Button"}</AntdButton>;
}
