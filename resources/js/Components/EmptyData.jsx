
import { TbFaceIdError } from "react-icons/tb";

export default function EmptyData({ title }) {

    return (
        <div className="flex flex-col justify-center items-center h-[75vh]">
            <TbFaceIdError className="text-[100px] text-slate-500" />
            <p className="text-xl font-semibold text-slate-500">{title}</p>
        </div>
    )

}
