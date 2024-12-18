import React, { useEffect, useRef } from "react";
import Quill from "quill";
import BetterTable from "quill-better-table";

// Import Quill and plugin styles
import "quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";

// Register the BetterTable module
Quill.register( {
    "modules/better-table": BetterTable,
}, true );

const QuillEditor = () =>
{
    const quillRef = useRef( null );

    useEffect( () =>
    {
        // Initialize Quill
        const quill = new Quill( quillRef.current, {
            theme: "snow",
            modules: {
                toolbar: [
                    [ "bold", "italic", "underline" ], // Text styles
                    [ { list: "ordered" }, { list: "bullet" } ], // Lists
                    [ "table" ], // Add table button
                ],
                "better-table": {
                    operationMenu: {
                        items: {
                            insertColumnRight: { text: "Insert column to the right" },
                            insertColumnLeft: { text: "Insert column to the left" },
                            insertRowUp: { text: "Insert row above" },
                            insertRowDown: { text: "Insert row below" },
                            deleteColumn: { text: "Delete column" },
                            deleteRow: { text: "Delete row" },
                            deleteTable: { text: "Delete table" },
                        },
                    },
                },
                keyboard: {
                    bindings: BetterTable.keyboardBindings,
                },
            },
        } );

        // Example: Adding a table programmatically
        quill.getModule( "better-table" ).insertTable( 3, 3 ); // 3x3 table
    }, [] );

    return <div ref={ quillRef } style={ { height: "400px" } } />;
};

export default QuillEditor;
