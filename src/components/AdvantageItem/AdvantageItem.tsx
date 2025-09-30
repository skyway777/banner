import type { PropsWithChildren } from "react";
import checkmark from "@/assets/check-solid.svg";
import "./AdvantageItem.css";

export const AdvantageItem = ({children}: PropsWithChildren) => {
    return <div className="advantage">
        <img className="advantage__img" src={checkmark} />
        <span>{children}</span>
    </div>
}