const createListTrailers = (parrent, srcList) => { //эта функция берет список и создает обложки
    const trailerslist = document.createElement('ul');
    trailerslist.classList.add('trailers__list');
    parrent.append(trailerslist);

    const trailerWrappers = []
    const trailerFrames = []


    srcList.forEach((src) => {
        const trailersItem = document.createElement('li');
        trailersItem.classList.add('trailers__item');
        trailerslist.append(trailersItem);

        const trailersWrapper = document.createElement('div');
        trailersWrapper.classList.add('trailers__wrapper');
        trailersItem.append(trailersWrapper);
        trailerWrappers.push(trailersWrapper);

        const trailersVideo = document.createElement('iframe');
        trailersVideo.classList.add('trailers__video');
        trailersWrapper.append(trailersVideo);
        trailerFrames.push(trailersVideo);

        const idVideo = src.match(/\/embed\/([^/\?]+)/)[1]

        trailersVideo.srcdoc = `
            <style>
            * {
            padding: 0;
            margin: 0;
            overflow: hidden;
        }
        
        html, body {
            width: 100%;
            height: 100%;
        
        }
        
        img,svg{
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        a {
            cursor: default;
        }
        
        #button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%);
            z-index: 5;
            width: 64px;
            height: 64px;
            background-color: transparent;
            cursor: pointer;
        }
        
        @media(max-width: 900px) {
            #button{
                width: 36px;
                height: 36px;
        }
        }
            </style>
            <a href='https://www.youtube.com/embed/${idVideo}?autoplay=1'>
            <button class="button"></button>
            
            <img src="https://i.ytimg.com/vi/${idVideo}/maxresdefault.jpg">
            <div id="button">
            <svg
                width="64.000000"
                height="64.000000"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs/>
	<circle id="Ellipse 2" cx="32.000000" cy="32.000000" r="32.000000" fill="#FF3D00" fill-opacity="1.000000"/>
	<path
     id="Polygon 1" d="M42.5 31.134L27.5 22.4737C26.8334 22.0888 26 22.5699 26 23.3397L26 40.6603C26 41.4301 26.8334 41.9112 27.5 41.5263L42.5 32.866C43.1666 32.4811 43.1666 31.5189 42.5 31.134Z" fill="#FFFFFF" fill-opacity="1.000000" fill-rule="evenodd"/>
            </svg>
        </div>
    </a>
        `;
    })

    return { trailerWrappers, trailerFrames };
};
const controlTrailer = (trailerWrappers, trailerFrames, i = 0, j = 0) => {
    if (i !== j) {
        trailerWrappers[i].style.display = 'none';
        trailerFrames[i].srcdoc = '';
    } else {
        trailerWrappers[i].style.display = 'block';
        trailerFrames[i].srcdoc = trailerFrames[i].dataset.srcdoc;
    }
}

const init = () => {
    const trailersContainer = document.querySelector('.trailers__container');
    const trailersButtons = document.querySelectorAll('.trailers__button');

    const srcList = [];

    trailersButtons.forEach((btn) => {
        srcList.push(btn.dataset.src);
    })

    const { trailerWrappers, trailerFrames } = createListTrailers(trailersContainer, srcList)

    trailersButtons.forEach((btn, j) => {
        trailerFrames[j].dataset.srcdoc = trailerFrames[j].srcdoc;
        btn.addEventListener('click', () => {
            trailersButtons.forEach((tBtn, i) => {
                if (tBtn === btn) {
                    tBtn.classList.add('trailers__button-active');
                } else {
                    tBtn.classList.remove('trailers__button-active');
                }
                controlTrailer(trailerWrappers, trailerFrames, i, j)
            })
        });
    });
    controlTrailer(trailerWrappers, trailerFrames);
};


init();

