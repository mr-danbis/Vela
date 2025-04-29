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

let openSidebarLevel = (tileID, listID) => {
    let sidebar = document.querySelector('.sidebar');
    let tile = document.getElementById(tileID);
    let list = document.getElementById(listID);

    tile.addEventListener('click', () => {
        document.querySelector('.sidebar__top').style.display = 'none';
        document.querySelector('.sidebar .header__tiles').style.display = 'none';
        document.querySelector('.sidebar .header__router-btn').style.display = 'none';
        document.querySelector('.sidebar .header__right').style.display = 'none';
        document.querySelector('.sidebar__info').style.display = 'flex';
        list.style.display = 'block';
        sidebar.querySelector('.sidebar__info-title').textContent = tile.querySelector('.header__tile-title').textContent;
    })

}

let hideItems = (item) => {
    let sidebar = document.querySelector('.sidebar');
    let sidebarMenuItems = sidebar.querySelectorAll('.menu__item');

    sidebarMenuItems.forEach(item => {
        if (!item.classList.contains('clicked')) {
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
            sidebar.querySelector('.sidebar__info-title').textContent = item.querySelector('.menu__item-title').textContent;
        })
    });
}

let openCloseSidebar = () => {
    let sidebar = document.querySelector('.sidebar');
    let btn = document.querySelector('.header__btn--mobile');
    let isSidebarVisible = false;

    btn.addEventListener('click', () => {
        isSidebarVisible = !isSidebarVisible;
        sidebar.style.left = isSidebarVisible ? '0' : '-150%';
        if (isSidebarVisible) {
            btn.classList.add('open');
            sidebar.classList.add('open');
        } else {
            btn.classList.remove('open');
            sidebar.classList.remove('open');
        }
    });
}

let settingSidebarHeight = () => {
    let sidebar = document.querySelector('.sidebar');
    let header = document.querySelector('.header');

    sidebar.style.height = `${100 - (header.clientHeight / window.innerHeight * 100)}vh`;
}

let openModal = (idTile, idMoodal) => {
    let tile = document.getElementById(idTile);
    let modal = document.getElementById(idMoodal);
    let isMenuVisible = false;

    tile.addEventListener('click', () => {
        event.stopPropagation();
        isMenuVisible = !isMenuVisible;
        modal.style.display = isMenuVisible ? 'block' : 'none';
    });

    document.addEventListener('click', () => {
        isMenuVisible = false;
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    settingSidebarHeight();

    window.addEventListener('scroll', function () {
        changedHeaderByScroll();
        fixMenu();
        settingSidebarHeight();
    });

    changeMenuHeight();
    openNewSidebarLevel();
    openCloseSidebar();
    openModal('catalogBTN', 'catalog');
    openModal('tileGiftsSets', 'giftsSets');
    openModal('tileEvents', 'events');
    openSidebarLevel('tileCatalogBTN', 'sidebarMenuCatalog');
    openSidebarLevel('tileGiftsSetsBTN', 'sidebarMenuGiftsSets');
    openSidebarLevel('tileEventsBTN', 'sidebarMenuEvents');
});