/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';

window.url = getValueFromId( 'base_url' );
window.app_path = getValueFromId( 'app_path' );

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo( {
    // authEndpoint: 'https://pixelsbd-ecommerce.test/broadcasting/auth',
    broadcaster: 'pusher',
    key: 'f54e1ebc1d00c6689fd7',
    cluster: 'ap2',
    forceTLS: true,
    auth: {
        headers: {
            'X-CSRF-TOKEN': document.querySelector( 'meta[name="csrf-token"]' ).getAttribute( 'content' )
        }
    }
} );


function getValueFromId ( id )
{
    let value = '';
    let input_box = document.getElementById( id );

    if ( input_box )
    {
        value = input_box.value;
    }
    return value;
}
