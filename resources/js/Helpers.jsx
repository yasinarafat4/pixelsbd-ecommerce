/* eslint-disable no-undef */


export function isNullOrEmpty ( value )
{
    if ( value === null || value === '' )
    {
        return true;
    }
    return false;
}

export function toCamel ( string )
{
    return string.replace( /(?:_| |\b)(\w)/g, function ( $1 ) { return $1.toUpperCase().replace( '_', ' ' ); } );
}

export function currencyFormat ( string )
{
    return default_currency_symbol + Number.parseFloat( string ).toFixed( 2 );
}

export function numberFormat ( string )
{
    return Number.parseFloat( string ).toFixed( 2 );
}

export function filesize ( size )
{
    const i = Math.floor( Math.log( size ) / Math.log( 1024 ) );
    return (
        ( size / Math.pow( 1024, i ) ).toFixed( 2 ) * 1 +
        ' ' +
        [ 'B', 'kB', 'MB', 'GB', 'TB' ][ i ]
    );
}


export function asset_url ( image )
{
    return import.meta.env.VITE_APP_URL + image;
}

export function placeholder_user ()
{
    return '/assets/placeholder/user.webp';
}

export function placeholder_shop_banner ()
{

    return '/assets/placeholder/shop-banner-placeholder.jpg';
}

export function placeholder_login ()
{
    return '/assets/placeholder/placeholder-1-1.webp';
}

export function placeholder1_1 ()
{
    return '/assets/placeholder/placeholder-1-1.webp';
}

export function placeholder2_3 ()
{
    return '/assets/placeholder/placeholder-2-3.webp';
}

export function placeholder4_2 ()
{
    return '/assets/placeholder/placeholder-4-2.webp';
}
export function placeholder6_1 ()
{
    return '/assets/placeholder/placeholder-6-1.webp';
}
export function placeholder6_2 ()
{
    return '/assets/placeholder/placeholder-6-2.webp';
}
