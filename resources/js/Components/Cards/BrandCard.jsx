import { placeholder1_1 } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";


export default function BrandCard({ brand }) {
    return (
        <div className="p-2 md:p-3 border hover:shadow-xl hover:border-slate-300 duration-300 cursor-pointer">
            <Link title={brand.name} href={route('brand_page', brand.slug)}>
                <figure className="md:h-[130px] md:w-[130px] mx-auto">
                    <LazyLoadImage
                        threshold={100}
                        effect="blur"
                        src={brand.logo || placeholder1_1()}
                        alt={brand.name}
                        className="w-full h-full"
                    />
                </figure>
                <p className="text-sm text-slate-800 text-center truncate pt-1">{brand.name}</p>
            </Link>
        </div>
    )
}
