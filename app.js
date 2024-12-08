let H_flag = true;

const H_class = {
    'mangabuff.ru': '.reader__header',
};

const displayAdvertisement = (site, funcPref = undefined) => {
    console.log('-------------------------------------------');
    console.log('|                 EXManga                 |');
    console.log('-------------------------------------------');
    
    console.log('🖇 window.location.href: ');
    console.log(site);

    if (funcPref === 'app') {
        let message = '👻 Changes applied!';
        createAlert(message);
        message = '|' + message + ' '.repeat(43 - message.length - 2) + '|';
        console.log(message);
    }
    if (funcPref === 'header') {
        let message = '🌵 Changes applied!';
        createAlert(message);
        message = '|' + message + ' '.repeat(43 - message.length - 2) + '|';
        console.log(message);
    }
    console.log('-------------------------------------------');
};

const siteName = (site) => {
    if (site.includes('mangabuff.ru')) return 'mangabuff.ru';
    else return undefined;
};


const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css;
const ToggleHeader = () => {
    const site = window.location.href;
    const name = siteName(site);
    const headerClass = H_class[name];

    if (H_flag) document.querySelector(headerClass).style.display = 'none';
    else document.querySelector(headerClass).style.display = 'flex';

    H_flag = !H_flag;

    displayAdvertisement(site, 'header');
};

const createAlertHtml = () => {
    const parent = document.querySelector('body');
    const label = document.createElement('label');
    label.className = 'alert-EXMANGA';
    Add_Custom_Style(`
        label.alert-EXMANGA {
            display: none;
            position: fixed;
            right: 20px;
            bottom: 20px;
            transition: all 0.5s;
        }
    `);
    parent.appendChild(label);
};

const createAlert = (message) => {
    const alert = document.querySelector('label.alert-EXMANGA');
    alert.innerHTML = message;
    alert.style.display = 'flex';

    setTimeout(() => {
        alert.innerHTML = '';
        alert.style.display = 'none';
    }, 1000)
} 


function APP () {
    const site = window.location.href

    displayAdvertisement(site, 'app');

    if (site.includes('vk.com/@')) {
        Add_Custom_Style(`
            figure {
                margin: 0!important;
            }
            figcaption {
                margin: 0!important;
            }
            .article_layer__content_footer {
                visibility: 'hidden'!important;
            }
            .article>figure img {
                width: 100%!important;
            }
        `)
        document.querySelectorAll('.article_figure_content').forEach((item) => item.style = undefined)
    }

    if (site.includes('teletype.in')) {
        Add_Custom_Style(`
            .m_original {
                margin: 0 auto 0!important;
            }
            .contents {
                margin: 0 auto 0!important;
            }
            .menu {
                display: none!important;
            }
            ::-webkit-scrollbar-thumb
            {
                background-color: #AAA;
                border-radius: 10px;
                background-image: -webkit-linear-gradient(90deg,
                rgba(0, 0, 0, .2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(0, 0, 0, .2) 50%,
                rgba(0, 0, 0, .2) 75%,
                transparent 75%,
                transparent)
            }
            ::-webkit-scrollbar
            {
                width: 10px;
                background-color: #424242;
            }
            }
            ::-webkit-scrollbar-track
            {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                background-color: #F5F5F5;
                border-radius: 10px;
            }
        `)
    }

    if (site.includes('telegra.ph')) {
        Add_Custom_Style(`
            * {
                color: white!important;
            }
        
            .tl_article .tl_article_content .figure_wrapper img {
                max-height: none!important;
            }
            .tl_article .tl_article_content, .tl_article .tl_article_content .ql-editor * {
                padding: 0!important;
                margin-bottom: 0!important;
                margin-top: 0!important;
            }
            
            .tl_page_wrap {
                background: #111;
            }
            .tl_footer_button {
                background: #111;
            }

            p[dir="auto"] {
                height: 0!important;
            }
            
            ::-webkit-scrollbar-thumb
            {
                background-color: #AAA;
                border-radius: 10px;
                background-image: -webkit-linear-gradient(90deg,
                rgba(0, 0, 0, .2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(0, 0, 0, .2) 50%,
                rgba(0, 0, 0, .2) 75%,
                transparent 75%,
                transparent)
            }
            ::-webkit-scrollbar
            {
                width: 10px;
                background-color: #424242;
            }
            }
            ::-webkit-scrollbar-track
            {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                background-color: #F5F5F5;
                border-radius: 10px;
            }
        `)
    }

    if (site.includes('mangabuff.ru')) {
        document.querySelectorAll('.rek.rek--mt').forEach((item) => item.style.display = 'none')
    }
}

function runOnKeys(func, ...codes) {
    let pressed = new Set();
    document.addEventListener('keydown', function(event) {
        pressed.add(event.code);
        for (let code of codes) { // все ли клавиши из набора нажаты?
            if (!pressed.has(code)) {
                return;
            }
        }
        pressed.clear();
        func();
    });

    document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
    });

}

runOnKeys(
    () => APP(),
    "KeyQ",
    "ControlLeft"
);

runOnKeys(
    () => ToggleHeader(),
    "KeyH"
);

createAlertHtml();