import Mermaid from "@theme/Mermaid";
import { useState, Fragment, useMemo } from "react";

const decodeDiagrams = (diagram: string) => {
    const lines = diagram.split("\n");
    const start = lines.findIndex(
        (oneLine) => !(oneLine.includes("participant") || oneLine.includes("sequenceDiagram"))
    );
    const data = lines.slice(start);
    const base = lines.slice(0, start).join("\n");
    const diagrams = data.map((a, index) => {
        return (
            base +
            "\n" +
            data
                .slice(0, index + 1)
                .filter((a, indexCurrent) => !a.includes("Note over") || (a.includes("Note") && indexCurrent === index))
                .join("\n")
        );
    });
    return [base, ...diagrams];
};

const buttonStyle = { flex: 0.4, padding: "20px", margin: "10px" };
const buttonStyleMinus = { flex: 0.1, padding: "20px", margin: "10px" };

export const Displayer = ({ value, name }) => {
    const diagrams = useMemo(() => {
        return decodeDiagrams(value);
    }, [value]);
    const [index, setIndex] = useState<number>(0);

    if (!diagrams.length) {
        return null;
    }

    return (
        <Fragment>
            <h3>{name}</h3>
            <div style={{ display: "flex" }}>
                <button
                    style={buttonStyleMinus}
                    onClick={() => {
                        setIndex(0);
                    }}
                    disabled={index === 0}
                >
                    ⏮️
                </button>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        setIndex((i) => --i);
                    }}
                    disabled={index === 0}
                >
                    ◀️
                </button>

                <button
                    style={buttonStyle}
                    onClick={() => {
                        setIndex((i) => ++i);
                    }}
                    disabled={index >= diagrams.length - 1}
                >
                    ▶️
                </button>
                <button
                    style={buttonStyleMinus}
                    onClick={() => {
                        setIndex(diagrams.length - 1);
                    }}
                    disabled={index >= diagrams.length - 1}
                >
                    ⏭️
                </button>
            </div>
            <Mermaid value={diagrams[index]} />
        </Fragment>
    );
};

export default Displayer;
