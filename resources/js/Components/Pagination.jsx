import { Link } from "@inertiajs/react";


export default function Pagination ( { links } )
{

    function getClassName ( active )
    {
        if ( active )
        {
            return "mr-1 mb-1 px-2 py-[5px] text-sm leading-2 border rounded hover:bg-[#3048AC] bg-[#3048AC] text-slate-300";
        } else
        {
            return "mr-1 mb-1 px-2 py-[5px] text-sm leading-2 border rounded hover:bg-[#3048AC] hover:text-slate-300 duration-300 text-slate-600";
        }
    }

    return (
        links.length > 3 && (
            <div  className="mb-4">
                <div  className="flex flex-wrap mt-8">
                    { links.map( ( link, key ) => (
                        link.url == null ?
                            ( <div key={ key }
                                 className="mr-1 mb-1 px-2 py-[5px] text-sm leading-2 text-slate-300 cursor-not-allowed border rounded"
                                dangerouslySetInnerHTML={ { __html: link.label } }
                            ></div> ) :

                            ( <Link key={ key }
                                 className={ getClassName( link.active ) }
                                href={ link.url }
                                dangerouslySetInnerHTML={ { __html: link.label } }
                            ></Link> )
                    ) ) }
                </div>
            </div>
        )
    );
}
