import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function FlashDealTimer ( { flashDeal } )
{
    const { t } = useLaravelReactI18n();

    let timerWidth = 85;
    let timerStrokeWidth = 4;

    if ( window.innerWidth <= 320 )
    {
        timerWidth = 65;
        timerStrokeWidth = 3;
    }
    else if ( window.innerWidth <= 480 )
    {
        timerWidth = 75;
        timerStrokeWidth = 3;
    }
    else if ( window.innerWidth <= 768 )
    {
        timerWidth = 66;
        timerStrokeWidth = 3;
    }
    else if ( window.innerWidth <= 1024 )
    {
        timerWidth = 65;
        timerStrokeWidth = 3;
    }




    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const daySeconds = 86400;

    const timerProps = {
        isPlaying: true,
        size: timerWidth,
        strokeWidth: timerStrokeWidth,

    };

    const renderTime = ( dimension, time ) =>
    {
        return (
            <>
                <div  className="text-center text-sm lg:text-base xl:text-lg">{ time }</div>
                <div  className="text-[10px] xl:text-xs">{ dimension }</div>
            </>
        );
    };

    const getTimeSeconds = ( time ) => ( minuteSeconds - time ) | 0;
    const getTimeMinutes = ( time ) => ( ( time % hourSeconds ) / minuteSeconds ) | 0;
    const getTimeHours = ( time ) => ( ( time % daySeconds ) / hourSeconds ) | 0;
    const getTimeDays = ( time ) => ( time / daySeconds ) | 0;

    const currentTime = new moment();
    const timeToEnd = new moment( flashDeal.date );
    const milliseconds = moment.duration( timeToEnd.diff( currentTime ) ).asMilliseconds();

    const stratTime = Date.now() / 1000;
    const endTime = stratTime + ( milliseconds / 1000 );

    const remainingTime = endTime - stratTime;
    const days = Math.ceil( remainingTime / daySeconds );
    const daysDuration = days * daySeconds;

    return (

        <Link href={ route( 'flash_deal_details', flashDeal.slug ) } >
            <div  className="bg-cover bg-center p-1 lg:p-2 xl:p-4 h-[280px] md:h-[390px] w-full" style={ { backgroundImage: `url(${ flashDeal.banner })` } }>

                <div
                     className="bg-white w-full p-2 md:py-1 md:mx-auto lg:mx-0 md:p-0 lg:p-2 flex justify-center items-center gap-2"
                >
                    <CountdownCircleTimer
                        { ...timerProps }
                        colors="#7E2E84"
                        duration={ daysDuration }
                        initialRemainingTime={ remainingTime }
                    >
                        { ( { elapsedTime, color } ) => (
                            <span style={ { color } }>
                                { renderTime( t( "days" ), getTimeDays( daysDuration - elapsedTime ) ) }
                            </span>
                        ) }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        { ...timerProps }
                        colors="#D14081"
                        duration={ daySeconds }
                        initialRemainingTime={ remainingTime % daySeconds }
                        onComplete={ ( totalElapsedTime ) => ( {
                            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
                        } ) }
                    >
                        { ( { elapsedTime, color } ) => (
                            <span style={ { color } }>
                                { renderTime( t( "hours" ), getTimeHours( daySeconds - elapsedTime ) ) }
                            </span>
                        ) }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        { ...timerProps }
                        colors="#EF798A"
                        duration={ hourSeconds }
                        initialRemainingTime={ remainingTime % hourSeconds }
                        onComplete={ ( totalElapsedTime ) => ( {
                            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                        } ) }
                    >
                        { ( { elapsedTime, color } ) => (
                            <span style={ { color } }>
                                { renderTime( t( "minutes" ), getTimeMinutes( hourSeconds - elapsedTime ) ) }
                            </span>
                        ) }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        { ...timerProps }
                        colors="#218380"
                        duration={ minuteSeconds }
                        initialRemainingTime={ remainingTime % minuteSeconds }
                        onComplete={ ( totalElapsedTime ) => ( {
                            shouldRepeat: remainingTime - totalElapsedTime > 0
                        } ) }
                    >
                        { ( { elapsedTime, color } ) => (
                            <span style={ { color } }>
                                { renderTime( t( "seconds" ), getTimeSeconds( elapsedTime ) ) }
                            </span>
                        ) }
                    </CountdownCircleTimer>
                </div>
            </div>
        </Link>

    )
}
