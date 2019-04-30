import { Schema } from "amis/lib/types";
import AMisRenderer from "../components/AMisRenderer";
import React = require("react");

export default function(schema:Schema) {
    return (props:any) => {
        return (
            <AMisRenderer schema={schema} {...props} />
        )
    }
}