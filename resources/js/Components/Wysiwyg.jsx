import { useQuill } from "@/Components/use-quill";
import 'quill/dist/quill.snow.css';
import { useEffect } from "react";
import { DOMPurify } from "react-sanitizer-parser";

export default function Wysiwyg ( { defaultValue = null, placeholder = null, modules = null, formats = null, onWysiwygChange } )
{
    // Quill module
    if ( modules == null )
    {
        modules = {
            toolbar: [
                [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],
                [ { 'font': [] } ],
                [ { 'align': [] } ],
                [ { 'color': [] }, { 'background': [] } ],
                [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
                [ { list: "ordered" }, { list: "bullet" } ],
                [ { script: "sub" }, { script: "super" } ],
                [ { 'indent': '-1' }, { 'indent': '+1' } ],
                [ 'link', 'image', 'video' ],
                [ 'clean' ]
            ]
        }
    }

    // Quill formats
    if ( formats == null )
    {
        formats = [
            "header",
            "font",
            "bold",
            "italic",
            "underline",
            "strike",
            'blockquote',
            "list",
            "script",
            "align",
            "color",
            "background",
            "indent",
            "link",
            "image",
            "video",
        ]
    }

    const { quill, quillRef } = useQuill( { modules, formats, placeholder } )

    useEffect( () =>
    {
        if ( quill )
        {
            if ( defaultValue )
            {
                quill.clipboard.dangerouslyPasteHTML( DOMPurify.sanitize( defaultValue ) )
            }

            quill.on( 'text-change', ( _delta, _oldDelta, source ) =>
            {
                if ( onWysiwygChange )
                {
                    const rawValue = quill.root.innerHTML
                    const value = rawValue

                    onWysiwygChange( value )
                }
            } )
        }
    }, [ quill ] )

    return (
        <div  className="flex flex-col w-full h-5/6 rounded">
            <div ref={ quillRef } />
        </div>
    )
}
