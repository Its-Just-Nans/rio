import Mermaid from "@theme/Mermaid";
import { useState, Fragment } from "react";

const useDecodeDiagrams = (diagram: string) => {
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
                .filter((a, indexCurrent) => !a.includes("Note") || (a.includes("Note") && indexCurrent === index))
                .join("\n")
        );
    });
    return [base, ...diagrams];
};

const buttonStyle = { flex: 1, padding: "20px", margin: "10px" };

export const Displayer = ({ value, name }) => {
    const diagrams = useDecodeDiagrams(value);
    const [index, setIndex] = useState<number>(0);

    if (!diagrams.length) {
        return null;
    }

    console.log(diagrams[index]);
    return (
        <Fragment>
            <h3>{name}</h3>
            <div style={{ display: "flex" }}>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        setIndex((i) => --i);
                    }}
                    disabled={index === 0}
                >
                    Previous
                </button>

                <button
                    style={buttonStyle}
                    onClick={() => {
                        setIndex((i) => ++i);
                    }}
                    disabled={index >= diagrams.length - 1}
                >
                    Next
                </button>
            </div>
            <Mermaid value={diagrams[index]} />
        </Fragment>
    );
};

export default Displayer;
