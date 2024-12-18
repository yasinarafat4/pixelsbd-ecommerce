import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from 'react-use-cart';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp( {
    title: ( title ) => `${ title } - ${ appName }`,
    resolve: ( name ) => resolvePageComponent( `./Pages/${ name }.jsx`, import.meta.glob( './Pages/**/*.jsx' ) ),
    setup ( { el, App, props } )
    {
        const active_locale = props.initialPage.props.active_locale
        const root = createRoot( el );
        root.render(
            <LaravelReactI18nProvider
                locale={ active_locale }
                fallbackLocale={ 'en' }
                files={ import.meta.glob( '/lang/*.json' ) }
            >
                <QueryClientProvider client={ queryClient }>
                    <CartProvider>
                        <App { ...props } />
                    </CartProvider>
                    <ReactQueryDevtools initialIsOpen={ false } />
                </QueryClientProvider>
            </LaravelReactI18nProvider>
        );
    },
    progress: {
        color: '#4B5563'
    },
} );
