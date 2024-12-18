import { useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function OrderPlacement() {
    const { t } = useLaravelReactI18n();
    const { order_placement } = usePage().props;

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        identifier: order_placement.identifier,
        sms_body: order_placement.sms_body,
        template_id: order_placement.template_id ?? '',
        status: order_placement.status,
    })

    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.otp.sms_templates_update'))
    }

    return (
        <div  className='m-4'>
            <form onSubmit={e => handleSubmit(e)}  className=' space-y-4'>
                <div  className='flex flex-col'>
                    <label  className='label-text text-slate-600 text-sm font-medium mb-1' htmlFor="sms_body">{t('Activation')}</label>
                    <input onChange={e => setData('status', e.target.checked)} checked={data.status} type="checkbox"  className="toggle toggle-sm toggle-success" />
                </div>
                {/* SMS Body */}
                <div  className='w-full'>
                    <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="sms_body">{t('SMS Body')}</label>
                    <textarea
                        onChange={e => setData('sms_body', e.target.value)}
                        value={data.sms_body}
                        name='sms_body'
                        id='sms_body'
                        type="text"
                        placeholder={t('Type...')}
                        rows="4"
                         className="textarea p-3 block w-full border-[1px] border-slate-300 bg-white focus:border-blue-600 rounded text-sm focus:outline-none"
                    />
                    <p  className='text-[12px] text_secondary mt-1'>**N.B : Do Not Change The Variables Like [[ ____ ]].**</p>
                </div>
                {/* Template ID */}
                <div  className="w-full">
                    <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="template_id">{t('Template ID')}</label>
                    <input
                        onChange={e => setData('template_id', e.target.value)}
                        value={data.template_id}
                        name='template_id'
                        id='template_id'
                        type="text"
                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm"
                        placeholder={t('Template ID')}
                    />
                    <p  className='text-[12px] text_secondary mt-1'>**N.B : Template ID is Required Only for Fast2SMS DLT Manual**</p>
                </div>
                <div  className="flex justify-end">
                    <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 text-sm rounded text-white">{t('Update Settings')}</button>
                </div>
            </form>
        </div>
    );
};
