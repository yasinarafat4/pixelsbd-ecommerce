import { asset_url, placeholder_user, toCamel } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { ImDownload2 } from "react-icons/im";

export default function TicketDetails() {
    const { ticket_details } = usePage().props;
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        ticket_id: ticket_details.id,
        subject: ticket_details.subject,
        replay: "",
        files: [],
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('ticket_replay.store'), {
            onSuccess: () => reset()
        })
    }

    // Image handler
    function handleFileChange(e) {
        const value = e.target.files;
        setData('files', value);
    }

    return (
        <UserDashboardLayout>
            <Head title="Ticket Details" />
            <div  className='p-0 md:p-4'>
                <div  className="space-y-6 mb-10">
                    {/* Replay Form */}
                    <div>
                        <div  className="flex flex-col items-start border-b pb-3 gap-3">
                            <div  className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-3">
                                <p  className="text-lg md:text-xl font-medium">{ticket_details.subject}</p>
                                <p  className="text-lg md:text-xl font-medium">#{ticket_details.code}</p>
                            </div>
                            <div  className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4">
                                <h2  className="text-sm font-medium">{ticket_details.user.name}</h2>
                                <p  className="text-xs">{moment().format('ll')}</p>
                                <div  className="badge badge-ghost font-bold bg-slate-100 text-slate-500 text-xs">{toCamel(ticket_details.status)}</div>
                            </div>
                        </div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div  className='grid grid-cols-1 items-center gap-2 py-6'>
                                {/* Subject & Customer */}

                                <div  className="w-full">
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="subject">{t('Subject')}</label>
                                    <input onChange={e => setData('subject', e.target.value)} value={data.subject} name='subject' id='subject' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" readOnly />
                                </div>

                                {/* Replay */}
                                <div  className='w-full'>
                                    <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="replay">{t('Replay')}</label>
                                    <textarea
                                        onChange={e => setData('replay', e.target.value)}
                                        value={data.replay}
                                        name='replay'
                                        id='replay'
                                        type="text"
                                        placeholder={t('Write Your Replay')}
                                        rows="6"
                                         className="textarea p-3 block w-full border-[1px] border-slate-300 rounded-lg text-sm focus:outline-none bg-white"
                                    />
                                    {errors.replay && <div  className="text-red-500 text-sm mt-1">{errors.replay}</div>}
                                </div>
                                {/* Ticket file */}
                                <div  className='flex flex-col justify-start rounded-lg gap-1 text-slate-600'>
                                    <div  className='flex flex-col'>
                                        <label  className='label-text text-slate-600 text-sm font-medium mb-1' htmlFor="files">
                                            {t('Ticket Files')}<span  className="text-[12px] ms-1 text_primary">(Aspect ratio should be 1:1)</span>
                                        </label>
                                        <input
                                            onChange={e => handleFileChange(e)}
                                            multiple
                                            id="files"
                                            type="file"
                                             className="file-input file-input-bordered border-slate-300 w-full rounded-md bg-white text-slate-600"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div  className="flex justify-end">
                                <button  className="bg_secondary py-2 px-4 rounded-md text-white">{t('Replay')}</button>
                            </div>
                        </form>
                    </div>

                    {/* Ticket*/}
                    <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 max-w-5xl mx-auto'>
                        {/* Head */}
                        <div  className="flex justify-between px-4 items-center border-b border-slate-200">
                            <div  className="py-2 flex items-center gap-2">
                                <img  className="w-9 h-9 rounded-full" src={asset_url(ticket_details.user.image || placeholder_user())} alt={ticket_details.user.name} />
                                <div  className="text-slate-600">
                                    <h2  className="text-base font-semibold">{ticket_details.user.name}</h2>
                                    <p  className="text-xs">{moment(ticket_details.created_at).format('lll')}</p>
                                </div>
                            </div>
                        </div>
                        <div  className="p-2 md:p-4 space-y-2">
                            {/* Details */}
                            <div  className="text-sm">
                                {ticket_details.details}
                            </div>
                            {/* File */}
                            {
                                ticket_details.files.split(',').map((file, i) => {
                                    return <div key={i}  className="flex flex-col badge bg-[#DAE0E5] text-slate-600 text-[11px] rounded">
                                        <a  className="flex items-center gap-2" target="_blank" href={'/storage/uploads/ticket_images/' + file} rel="noreferrer"><ImDownload2  className="text-sm" />{file.slice(-30)}</a>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    {/* Replay */}
                    {

                        ticket_details.ticket_replay.map((replay, i) => {

                            return <div key={i}>
                                {
                                    ticket_details.user.id == replay.user.id ?

                                        <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 max-w-5xl mx-auto'>
                                            {/* Head */}
                                            <div  className="flex justify-between px-4 items-center border-b border-slate-200">
                                                <div  className="py-2 flex items-center gap-2">
                                                    <img  className="w-9 h-9 rounded-full" src={asset_url(replay.user.image || placeholder_user())} alt={replay.user.name} />
                                                    <div>
                                                        <h2  className="text-base font-semibold">{replay.user.name}</h2>
                                                        <p  className="text-xs">{moment(replay.created_at).format('lll')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div  className="p-4 space-y-2">
                                                {/* Details */}
                                                <div  className="text-sm">
                                                    {replay.replay}
                                                </div>
                                                {/* File */}
                                                {
                                                    replay.files && replay.files.split(',').map((file, i) => {
                                                        return <div key={i}  className="flex flex-col badge bg-[#DAE0E5] text-slate-600 text-[11px] rounded">
                                                            <a  className="flex items-center gap-2" target="_blank" href={'/storage/uploads/ticket_images/' + file} rel="noreferrer"><ImDownload2  className="text-sm" />{file.slice(-30)}</a>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>

                                        :

                                        <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 max-w-5xl mx-auto'>
                                            {/* Head */}
                                            <div  className="flex justify-end px-4 items-center border-b border-slate-200">
                                                <div  className="py-2 flex items-center gap-2">
                                                    <div  className="text-end">
                                                        <h2  className="text-base font-semibold">{replay.user.name}</h2>
                                                        <p  className="text-xs">{moment(replay.created_at).format('lll')}</p>
                                                    </div>
                                                    <img  className="w-9 h-9 rounded-full" src={asset_url(replay.user.image || placeholder_user())} alt={replay.user.name} />
                                                </div>
                                            </div>
                                            <div  className="p-4 space-y-2">
                                                {/* Details */}
                                                <div  className="text-sm">{replay.replay}</div>
                                                {/* File */}
                                                {
                                                    replay.files && replay.files.split(',').map((file, i) => {
                                                        return <div key={i}  className="flex flex-col badge bg-[#DAE0E5] text-slate-600 text-[11px] rounded">
                                                            <a  className="flex items-center gap-2" target="_blank" href={'/storage/uploads/ticket_images/' + file} rel="noreferrer"><ImDownload2  className="text-sm" />{file.slice(-30)}</a>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                }
                            </div>

                        })
                    }
                </div>

            </div>
        </UserDashboardLayout>
    )

}

