import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function FAQs() {

    const faqsData = [
        {
            id: 1,
            question: "Is it important for me to educate the customer before placing an order?",
            answer: "Yes, it is essential that you first educate your customer and tell them how to place the order, how to change the order, and how to return it as well. You have to guide them properly because the better you guide and convince them, the greater is the chance of them making a purchase from PixelsStore."
        },
        {
            id: 2,
            question: "What payment methods are accepted?",
            answer: "We accept a variety of payment methods including credit/debit cards, PayPal, and other online payment gateways. We ensure all transactions are secure and encrypted for your protection."
        },
        {
            id: 3,
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive an email with a tracking number. You can use this number on the PixelsStore website to track the status of your order in real-time."
        },
        {
            id: 4,
            question: "What is your return policy?",
            answer: "PixelsStore offers a 30-day return policy for most items. If you are not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Please ensure the items are in their original condition."
        },
        {
            id: 5,
            question: "Do you offer international shipping?",
            answer: "Yes, PixelsStore offers international shipping to many countries. Shipping costs and delivery times vary depending on the destination. Please refer to our shipping policy page for more details."
        },
        {
            id: 6,
            question: "How can I contact customer service?",
            answer: "You can contact the PixelsStore customer service team via email at support@pixelsstore.com or call us at (123) 456-7890. Our support team is available Monday to Friday from 9 AM to 5 PM (EST)."
        }
    ];


    // toggle state and function
    const [isOpen, setIsOpen] = useState(null);
    const handleToggle = (idx) => setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    return (
        <DefaultThemeLayout>
            <Head title="FAQs" />
            <h2  className="my-4 text-2xl text-center font-semibold">Frequently Asked Question</h2>
            <div  className="text-base mb-4 bg-white border border-[#b3d5fa] shadow p-4 md:p-6 rounded-lg">
                <div  className="flex justify-center">
                    <div  className="max-w-[550px] md:max-w-[850px] rounded-lg py-20 space-y-6 cursor-pointer">
                        {/* maping each accordion  */}
                        {faqsData.map((faq, idx) => (
                            <div key={idx} onClick={() => handleToggle(idx)}  className="flex items-center">
                                {/* the index div  */}
                                <div  className="w-12 md:w-16 h-12 md:h-16 bg_secondary flex justify-center items-center text-white text-base lg:text-xl font-semibold rounded-xl font-sans">
                                    <span>0{idx + 1}</span>
                                </div>
                                <div  className="w-10 h-[2px] bg_secondary relative">
                                    <span  className="w-3 h-3 bg-white absolute -left-2 -top-[5px] z-40 rounded-full border-2 border-primary"></span>
                                    <span  className="bg_secondary w-10 h-1"></span>
                                </div>
                                {/* main accordion div  */}
                                <div>
                                    <div  className="max-w-[300px] md:max-w-[850px] bg-blue-100 shadow-md border-t-[12px] p-3 border-primary relative">
                                        <span  className="h-0 w-0 border-b-[40px] border-b-transparent border-r-[40px] border-r-[#3F00E7] absolute top-0 right-0"></span>
                                        <h1  className="text-[#355E72] text-[15px] md:text-[18px] font-medium text-center">{faq.question}</h1>
                                    </div>
                                    <div
                                         className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600  ${isOpen === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                    >
                                        <div  className="overflow-hidden">
                                            <div  className="max-w-[300px] md:max-w-[850px] rounded-br-xl rounded-bl-xl bg_secondary text-white p-4 text-center text-[13px] md:text-[16px]">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DefaultThemeLayout>
    )

}
