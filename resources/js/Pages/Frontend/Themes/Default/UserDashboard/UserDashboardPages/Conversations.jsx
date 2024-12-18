import NothingFound from "@/Components/NothingFound";
import { asset_url, placeholder_user } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Conversations({ conversations }) {
    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props;

    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Conversations" />
            <div>
                <h1 className="text-lg md:text-xl lg:text-[22px] font-bold py-2">{t('Conversations')}</h1>
                <hr />
                <div className="space-y-2 lg:space-y-4 mt-4">
                    {conversations.data.length > 0 ? <div className="space-y-2 lg:space-y-4  p-4">
                        {
                            conversations.data.map((conversation, i) => (
                                <div className="border grid grid-cols-1 lg:grid-cols-12 items-center" key={i}>
                                    <div className="lg:col-span-4 flex items-center gap-2 md:gap-4 p-2 md:p-4">
                                        <img className="h-14 w-14" src={asset_url(conversation.receiver.image || placeholder_user())} alt={conversation.name} />
                                        <div>
                                            <h2 className="text-base font-semibold mb-1">{conversation.receiver.name}</h2>
                                            <p className="text-xs">{conversation.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-8 p-2 md:p-4">
                                        <div className="flex items-center gap-1">
                                            <Link href={route('conversations_details', window.btoa(conversation.id))}><h2 className="text-base font-semibold mb-1">{conversation.title}</h2></Link>
                                            {
                                                (conversation.sender_viewed == 0) && <span className="text-[11px] rounded bg_secondary text-white py-[1px] px-[3px]">new</span>
                                            }
                                        </div>
                                        <p className="text-sm">{conversation.last_message.length > 100 ? conversation.last_message.slice(0, 100) + '\u2026' : conversation.last_message}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                        <NothingFound title={"Nothing Found!"} />}
                </div></div>
        </UserDashboardLayout>
    )

}
