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
changeMenuHeight();


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
openAndCloseMenu()