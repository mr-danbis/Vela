let changeMenuHeight = () => {
    let menu = document.querySelector('.menu');
    let itemsList = document.querySelectorAll('.menu__item--withList');

    itemsList.forEach(item => {
        item.addEventListener('mouseenter', function () {
            menu.style.height = `${item.querySelector('.level2').clientHeight + 55}px`;
        });

        item.addEventListener('mouseleave', function () {
            menu.style.height = 'unset';
        });
    });
}

let openAndCloseMenu = () => {
    let menu = document.querySelector('.menu');
    let btn = document.querySelector('.header__btn');
    let isMenuVisible = false;

    btn.addEventListener('click', ()=> {
        event.stopPropagation();
        isMenuVisible = !isMenuVisible;
        menu.style.display = isMenuVisible ? 'block' : 'none';
    });

    document.addEventListener('click', () => {
        isMenuVisible = false;
        menu.style.display = 'none';
    });

    menu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

let changedHeaderByScroll = () => {
    let header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.classList.add('header--scroll');
    } else {
        header.classList.remove('header--scroll');
    }
}

let fixMenu = () => {
    let menu = document.querySelector('.menu');
    let header = document.querySelector('.header');

    if (window.scrollY > 0) {
        menu.style.top = `${header.clientHeight}px`;
    } else {
        menu.style.top = `${182}px`;
    }

}

let openSidebarLevel = () => {
    let tile = document.querySelector('.header__tile--withList');

    tile.addEventListener('click', () => {
        document.querySelector('.sidebar__top').style.display = 'none';
        document.querySelector('.sidebar .header__tiles').style.display = 'none';
        document.querySelector('.sidebar .header__router-btn').style.display = 'none';
        document.querySelector('.sidebar .header__right').style.display = 'none';
        document.querySelector('.sidebar__menu').style.display = 'block';
        document.querySelector('.sidebar__info').style.display = 'flex';

    })
}

let hideItems = (item) => {
    let sidebar = document.querySelector('.sidebar');
    let sidebarMenuItems = sidebar.querySelectorAll('.menu__item');

    sidebarMenuItems.forEach(item => {
        if (!item.classList.contains('clicked')){
            item.style.display = 'none';
        }
    });
}

let openNewSidebarLevel = () => {
    let sidebar = document.querySelector('.sidebar');
    let sidebarMenuItems = sidebar.querySelectorAll('.menu__item--withList');

    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            item.querySelector('.level2').style.display = 'block';
            item.classList.add('clicked');
            hideItems(item);
            sidebar.querySelector('.sidebar__info-title').textContent = item.querySelector('menu__item-title').textContent;
        })
    });
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', function () {
        changedHeaderByScroll();
        fixMenu();
    });

    changeMenuHeight();
    openAndCloseMenu();
    openSidebarLevel();
    openNewSidebarLevel();
});