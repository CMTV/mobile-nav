/**
 * Mobile navigation library. jQuery required!
 *
 * @author CMTV
 */
{
    let nav_items = [], pages = [];

    let selected_nav_item;
    let selected_page;

    let site_pages_inner;

    $(() => {
        init();

        nav_items.forEach((nav_item, i) => {
            $(nav_item).click((e) => {
                let nav_item = e.target;

                if($(nav_item).hasClass('selected')) return;

                nav_items.forEach((nav_item) => $(nav_item).removeClass('selected'));

                $(nav_item).addClass('selected');
                selected_nav_item = selected_page = i;

                site_pages_inner.css({'left': `calc(-100% * ${selected_page})`});
            });
        });
    });

    let init = () => {
        site_pages_inner = $('.site-pages .inner');

        $('.site-pages').height(site_pages_inner.height());

        $('nav .nav-item').each((i, nav_item) => {
            nav_items.push(nav_item);
        });

        nav_items.forEach((nav_item, i) => {
            pages[i] = $('.site-pages').find(`[data-page='${$(nav_item).data('page')}']`).get(0);

            if($(nav_item).hasClass('selected')) {
                selected_nav_item = i;
                selected_page = i;

                $(pages[selected_page]).addClass('showing');
            }
        });

        site_pages_inner.css({'width': `calc(100% * ${pages.length})`, 'left': `calc(-100% * ${selected_page})`});
    };
}