const form = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

if (!localStorage.getItem('userLanguage')) {
    localStorage.setItem('userLanguage', JSON.stringify('en'))   
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const middleName = document.getElementById('middle-name').value;
    const lastName = document.getElementById('last-name').value;
    const birthYear = document.getElementById('birth-year').value;
    resultsDiv.innerHTML = '';

    if (!lastName) {
        let errorLang = JSON.parse(localStorage.getItem('userLanguage'))
        Swal.fire({
            title: languagePack[errorLang].error,
            text: languagePack[errorLang].errordesc,
            icon: 'error',
            confirmButtonText: languagePack[errorLang].errorbtn,
        })
        return;
    }

    const langForUrl = {
        ru:'RU',
        ua:'UK',
        en:'EN',
        be:'BY',
        kk:'KZ',
        pl:'PL',
        bg:'BG', 
        ro:'RO',
    }

    const portals = [
        {
            title:{
                ru:'FamilySearch (c 1700)',
                ua:'FamilySearch (з 1700)',
                en:'FamilySearch (since 1700)',
            },
            name: 'FamilySearch',
            url: `https://www.familysearch.org/search/discovery/results?tab=records&page=1&results=12&q.birthLikeDate.from=${encodeURIComponent(birthYear)}&q.surname=${encodeURIComponent(lastName)}&q.givenName=${encodeURIComponent(firstName + ' ' + middleName)}`,
            id:1,
        },
        {
            title:{
                ru:'Первая Мировая Война',
                ua:'Перша Світова Війна',
                en:'World War 1',
            },
            name: '1914.svrt.ru',
            url: `https://1914.svrt.ru/index.php?surname=${encodeURIComponent(lastName)}#report`,
            id:2,
        },
        {
            title:{
                ru:'Вторая Мировая Война',
                ua:'Друга Світова Війна',
                en:'World War 2',
            },
            name: 'pamyat-naroda.ru',
            url: `https://pamyat-naroda.ru/heroes/?adv_search=y&last_name=${encodeURIComponent(lastName)}%20&first_name=${encodeURIComponent(firstName)}&middle_name=${encodeURIComponent(middleName)}&date_birth_from=${encodeURIComponent(birthYear)}&static_hash=b8fd4c8218b95b050123a9ac46de4b7fb3573f3600cdbc1aa8742bd494516397v9&group=all&types=pamyat_commander:nagrady_nagrad_doc:nagrady_uchet_kartoteka:nagrady_ubilein_kartoteka:pdv_kart_in:pdv_kart_in_inostranec:pamyat_voenkomat:potery_vpp:pamyat_zsp_parts:kld_ran:kld_bolezn:kld_polit:kld_upk:kld_vmf:kld_partizan:potery_doneseniya_o_poteryah:potery_gospitali:potery_utochenie_poter:potery_spiski_zahoroneniy:potery_voennoplen:potery_iskluchenie_iz_spiskov:potery_kartoteki:potery_rvk_extra:potery_isp_extra:same_doroga:same_rvk:same_guk:potery_knigi_pamyati&page=1&grouppersons=1`,
            id:3,
        },
        {
            title:{
                ru:'Вторая Мировая Война',
                ua:'Друга Світова Війна',
                en:'World War 2',
            },
            name: 'obd-memorial.ru',
            url: `https://obd-memorial.ru/html/search.htm?f=P~${encodeURIComponent(lastName)}&n=P~${encodeURIComponent(firstName)}&s=P~${encodeURIComponent(middleName)}&bd=P~${encodeURIComponent(birthYear)}&entity=001111111111111&entities=9003,7003,8001,6006,6007,30,32,9,18,26,25,24,28,27,23,34,22,20,21,19`,
            id:4,
        },

        {
            title:{
                ru:'Репрессированные в СССР',
                ua:'Репресовані в СРСР',
                en:'Repressed in USSR',
            },
            name: 'ru.openlist.wiki',
            url: `https://ru.openlist.wiki/Special:OlSearch?olsearch-run=1&olsearch-name-fulltext=${encodeURIComponent(lastName)}%20${encodeURIComponent(firstName)}%20${encodeURIComponent(middleName)}`,
            id:5,
        },
        {
            title:{
                ru:'Репрессированные в Германии',
                ua:'Репресовані в Німеччині',
                en:'Repressed in Germany',
            },
            name: 'Arolsen Archives',
            url: `https://collections.arolsen-archives.org/en/search?s=${encodeURIComponent(lastName)}`,
            id:6,
        },
        {
            title:{
                ru:'База Жителей Украины',
                ua:'База Мешканців України',
                en:'Ukrainian Citizens Database',
            },
            name: 'PRA.IN.UA',
            url: `https://pra.in.ua/uk/search/filter?lastname=${encodeURIComponent(lastName)}&firstname=${encodeURIComponent(firstName)}&page=1`,
            id:7,
        },
        {
            title:{
                ru:'MyHeritage (ограничено)',
                ua:'MyHeritage (обмежено)',
                en:'MyHeritage (limited)',
            },
            name: 'myheritage.com',
            url: `https://www.myheritage.com/research?s=1&formId=master&formMode=1&useTranslation=1&exactSearch=&lang=${langForUrl[JSON.parse(localStorage.getItem('userLanguage'))]}&p=1&action=query&view_mode=card&qname=Name+fn.${encodeURIComponent(firstName)}%2F3${encodeURIComponent(middleName)}+fnmo.1+ln.${encodeURIComponent(lastName)}+lnmsrs.false&tr_id=m_2ws1in5wid_d9l6iw56ff`,
            id:8,
        }
    ];

    portals.forEach(portal => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');
        resultCard.innerHTML = `
            <h3 resultId="${portal.id}">${portal.title[JSON.parse(localStorage.getItem('userLanguage'))]}</h3>
            <p><a href="${portal.url}" target="_blank"><span key="resulttext">View Results on</span> ${portal.name}</a></p>
        `;
        resultsDiv.appendChild(resultCard);
    });
    updateLanguage()
});

function setLanguage(lang){
    localStorage.setItem('userLanguage', JSON.stringify(lang))
    updateLanguage()
}

function upDateResultsLanguage(){
    const resultTitles = document.querySelectorAll('[resultId]')
    resultTitles.forEach(el => {
        el.textContent = portals2[el.getAttribute('resultId')-1].title[JSON.parse(localStorage.getItem('userLanguage'))]
    })
}

function updateLanguage(){
    let language = JSON.parse(localStorage.getItem('userLanguage'))
    const textElements = document.querySelectorAll('[key]')
    textElements.forEach(el => {
        if(el.nodeName == "INPUT"){
            el.placeholder = languagePack[language][el.getAttribute('key')]
        }else if(el.nodeName != "INPUT"){
            el.textContent = languagePack[language][el.getAttribute('key')]   
        }
    });
    upDateResultsLanguage()
}

updateLanguage()