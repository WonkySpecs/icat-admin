import style from "./style.module.css";
import {ReactNode} from "preact/compat";

type Props = {
    x: number
    y: number
    content: ReactNode
}

export const Tooltip = (
    {
        x, y, content
    }: Props) =>
    <div
        class={style.tooltip}
        style={{
            top: y, left: x
        }}>
        {content}
    </div>